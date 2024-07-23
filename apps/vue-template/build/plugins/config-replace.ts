// https://github.com/elwin013/vite-plugin-replace-files/tree/master
import type { PluginOption } from 'vite';
import fs from 'fs';
import path from 'path';

interface Replacement {
  target: string;
  replacement: string;
}

export default function configReplace(
  replacements: Replacement[]
): PluginOption {
  const projectRoot = process.cwd();

  const _replacements = replacements?.map(
    (x) =>
      <Replacement>{
        target: path.join(projectRoot, x.target),
        replacement: path.join(projectRoot, x.replacement)
      }
  );

  return {
    name: 'config-replace',
    enforce: 'post',
    async closeBundle() {
      for (const { target, replacement } of _replacements) {
        if (!fs.existsSync(target)) {
          console.error(`Target file not found: ${target}`);
          continue;
        }

        if (!fs.existsSync(replacement)) {
          console.error(`Replacement file not found: ${replacement}`);
          continue;
        }

        try {
          await fs.promises.copyFile(replacement, target);
          console.log(`Replaced ${target} with ${replacement}`);
        } catch (error) {
          console.error(`Error replacing ${target}:`, error);
        }
      }
    }
  };
}
