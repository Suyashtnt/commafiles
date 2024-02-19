import presetUno from "@unocss/preset-uno";

const darkTheme = JSON.parse(await Deno.readTextFile("./kleur-dark.json"));

const flattenTheme = (
  /** @type {typeof darkTheme} */
  theme
) => {
  /** @type {Record<string, string>} */
	const flattenedTheme = {};

	for (const [key, value] of Object.entries(theme)) {
		if (typeof value === 'string') {
			flattenedTheme[key] = value;
		} else {
			for (const [number, color] of Object.entries(value)) {
				flattenedTheme[`${key}_${number}`] = color;
			}
		}
	}

	return flattenedTheme;
};


export default {
  presets: [
    presetUno({
      preflight: false,
    }),
  ],
  theme: {
    colors: flattenTheme(darkTheme),
  },
  preflights: false,
};
