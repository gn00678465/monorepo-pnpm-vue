import type { Plugin, ResolvedConfig } from 'vite';
import { compileTemplate } from 'vue/compiler-sfc';
import { basename } from 'path';
import { readFileSync } from 'fs';

export interface Options {
  path: string;
}

export default function (options: Options): Plugin {
  const { path } = options;

  const virtualModuleId = 'virtual:svg-to-sfc';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  async function compileSvg(source: string, path: string) {
    let { code } = compileTemplate({
      id: path,
      filename: basename(path),
      transformAssetUrls: false,
      source: source
    });

    code = code.replace('export function render', 'function render');
    code += '\nconst VueComponent = { render };';
    code += `
        VueComponent.name = "icon-${basename(path.replace('.svg', ''))}";
        export default VueComponent;
    `;

    return code;
  }

  async function compileFileToJS(src: string) {
    let contents = readFileSync(src).toString();

    return await compileSvg(contents, src);
  }

  return {
    name: 'svg-to-sfc',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const code = await compileFileToJS(path);
        return {
          code,
          map: { version: 3, mappings: '', sources: [] } as any
        };
      }
    }
  };
}
