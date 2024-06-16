import * as esbuild from 'esbuild';
import { copyFile } from "node:fs/promises";

await esbuild.build({
    entryPoints: ['src/config.ts'],
    outdir: '../../.config/ags',
    bundle: true,
    external: ['resource://*', 'gi://*'],
    format: "esm"
});

await copyFile('./src/styles.css', '../../.config/ags/styles.css')