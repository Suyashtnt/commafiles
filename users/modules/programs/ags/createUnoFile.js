import unocssConfig from "./uno.config.js"
import { createGenerator } from 'https://esm.sh/unocss@0.55.3?target=deno'
import { walk } from "https://deno.land/std@0.200.0/fs/walk.ts";

const codeFiles = []

// read all in ./config/**/*.js
const dir = Deno.cwd() + '/config';
for await (const walkEntry of walk(dir)) {
  const type = walkEntry.isSymlink
    ? "symlink"
    : walkEntry.isFile
    ? "file"
    : "directory";

  if (type === "file" && walkEntry.path.endsWith(".js")) {
    const fileContents = await Deno.readTextFile(walkEntry.path);
    codeFiles.push(fileContents);
  }
}

const code = codeFiles.join('\n');

const generator = createGenerator(unocssConfig)
const { css } = await generator.generate(code, {
  preflights: false
})

const propertiesToYeet = [
    'line-height'
]
// make a regex that matches all the properties:<value>; that we want to yeet
const regex = new RegExp(`(${propertiesToYeet.join('|')})\\s*:\\s*([^;]+);`, 'g');
const newCss = css.replaceAll(regex, '');

const outputCssLocation = Deno.cwd() + '/config/uno.css'
await Deno.writeTextFile(outputCssLocation, newCss);
