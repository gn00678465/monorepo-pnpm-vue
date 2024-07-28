import type { PluginOption } from 'vite';
import fs from 'fs';
import { resolve, extname } from 'path';

interface IconReplacePluginOptions {
  path: string;
  include?: string[];
  exclude?: string[];
}

export default function iconReplacerPlugin(
  options: IconReplacePluginOptions
): PluginOption {
  const {
    path,
    include = ['.vue', '.js', '.ts', '.jsx', '.tsx'],
    exclude = []
  } = options;

  let iconMap: Record<string, string> = {};

  return {
    name: 'icon-replacer',
    configResolved(config) {
      // 從 JSON 文件加載配置
      const jsonPath = resolve(process.cwd(), path);
      const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
      iconMap = JSON.parse(jsonContent);
    },
    transform(code, id) {
      const ext = extname(id);
      // 檢查是否應該處理這個文件
      const shouldProcess =
        include.includes(ext) &&
        !exclude.some((excluded) => id.includes(excluded));

      // 如果不應該處理，或者文件在 node_modules 中，則直接返回
      if (!shouldProcess || id.includes('node_modules')) {
        return;
      }

      Object.entries(iconMap).forEach(([key, iconName]) => {
        code = code.replace(new RegExp(key, 'g'), iconName);
      });

      return code;
    }
  };
}
