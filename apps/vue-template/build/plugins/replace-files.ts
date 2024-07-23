// https://github.com/elwin013/vite-plugin-replace-files/tree/master
import type { PluginOption } from 'vite';
import path from 'path';

interface Replacement {
  file: string;
  replacement: string;
}

const replaceFiles = (replacements?: Replacement[]): PluginOption => {
  const projectRoot = process.cwd();
  replacements = replacements?.map(
    (x) =>
      <Replacement>{
        file: path.join(projectRoot, x.file),
        replacement: path.join(projectRoot, x.replacement)
      }
  );

  return {
    name: 'vite-plugin-replace-files',
    enforce: 'pre',
    // apply(config, { command }) {
    //   return command === 'build' && !config.build?.ssr
    // },
    async resolveId(
      source: string,
      importer: string | undefined,
      options: any
    ) {
      const resolvedFile = await this.resolve(source, importer, {
        ...options,
        ...{ skipSelf: true }
      });

      const foundReplacementFile = replacements?.find(
        (replacement) => replacement.file == resolvedFile?.id
      );

      if (foundReplacementFile) {
        return {
          id: foundReplacementFile.replacement
        };
      }
      return null;
    }
  };
};

export default replaceFiles;
