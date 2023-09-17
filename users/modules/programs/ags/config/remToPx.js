const remRE = /(-?[\.\d]+)rem/g;

export default function remToPxPreset(options = {}) {
  const {
    baseFontSize = 16,
  } = options;

  return {
    name: "@unocss/preset-rem-to-px",
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1];
        if (typeof value === "string" && remRE.test(value)) {
          i[1] = value.replace(remRE, (_, p1) => `${p1 * baseFontSize}px`);
        }
      });
    },
  };
}
