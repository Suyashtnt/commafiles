import { variants } from "./pallete.js";
import {
  defineConfig,
  presetUno,
} from "https://esm.sh/unocss@0.55.7?target=deno";

const createTheme = (colors) => {
  const values = Object.fromEntries(
    Object.entries(colors).map(([key, value]) => [key, value.hex]),
  );
  const vals = Object.entries(values);

  const finalTheme = {};

  for (const [key, value] of vals) {
    const keyContainsNumber = /\d/.test(key);
    if (keyContainsNumber) {
      const [name, number] = key.split(
        /(?<=\D)(?=\d)|(?<=\d)(?=\D)/,
      );

      const hasNameAlready = finalTheme[name] !== undefined;
      if (!hasNameAlready) {
        finalTheme[name] = {};
      }

      const objectToAddValueTo = finalTheme[name];

      if (typeof objectToAddValueTo === "string") {
        throw new Error(
          `Theme key ${name.toString()} is already a string`,
        );
      }

      objectToAddValueTo[number] = value;
    } else {
      finalTheme[key] = value;
    }
  }

  return finalTheme;
};

export default defineConfig({
  presets: [
    presetUno({
      preflight: false,
    }),
  ],
  theme: {
    colors: createTheme(variants.mocha),
  },
  preflights: false,
});
