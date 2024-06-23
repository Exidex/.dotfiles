import * as esbuild from 'esbuild';
import * as sass from 'sass';
import { pathToFileURL } from 'node:url';
import { readdir, writeFile } from 'node:fs/promises';

await esbuild.build({
    entryPoints: ['./src/config.ts'],
    outdir: '../../.config/ags',
    bundle: true,
    external: ['resource://*', 'gi://*'],
    format: "esm"
});

const filesWithTypes = await readdir('./style', { recursive: true, withFileTypes: true });

const files = filesWithTypes
    .filter(entry => entry.isFile())
    .map(entry => `${entry.parentPath}/${entry.name}`)

const imports = files.map(f => `@import '${f}';`).join("\n")

const compileResult = await sass.compileStringAsync(
    imports,
    {
        importer: {
            findFileUrl(url) {
                return pathToFileURL(url)
            }
        }
    }
);

await writeFile('../../.config/ags/style.css', compileResult.css)
