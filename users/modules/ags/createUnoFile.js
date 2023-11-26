import unocssConfig from "./uno.config.js";
import { createGenerator } from "@unocss/core";
import { walk } from "https://deno.land/std@0.203.0/fs/walk.ts";

const codeFiles = [];

// read all in ./config/**/*.js
const dir = Deno.cwd() + "/config";
for await (const walkEntry of walk(dir)) {
  if (walkEntry.isFile && walkEntry.path.endsWith(".js")) {
    const fileContents = await Deno.readTextFile(walkEntry.path);
    codeFiles.push(fileContents);
  }
}

const code = codeFiles.join("\n");

const generator = createGenerator(unocssConfig);
const { css } = await generator.generate(code, {
  preflights: false,
});

const propertiesToYeet = [
  "line-height",
];

const classesToYeet = [
  ".text-shadow",
  ".visible",
  ".static",
  ".truncate"
]

const propertyRegex = new RegExp(
  `(${propertiesToYeet.join("|")})\\s*:\\s*([^;]+);`,
  "g",
);

const classesRegex = new RegExp(
  `(${classesToYeet.join("|")})\\s*{[^}]+}`,
  "g",
);

const newCss = css.replaceAll(propertyRegex, "").replaceAll(classesRegex, "");

const outputCssLocation = Deno.cwd() + "/config/uno.css";
await Deno.writeTextFile(outputCssLocation, newCss);
