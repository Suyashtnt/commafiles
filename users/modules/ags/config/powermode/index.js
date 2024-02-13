import { ShowPowerMode } from "./variables.js";
import { Top } from "./top.js";
import { Bottom } from "./bottom.js";
import { Left } from "./left.js";
import { Right } from "./right.js";
import { Widget, Box, Gtk, Revealer, toCSS } from "../imports.js";

/**
 * @template {typeof Gtk.Widget} T
 * @param {T} Widget
 */
function createCtor(Widget) {
  return (
    /** @type {ConstructorParameters<T>} */ ...props
  ) => /** @type {InstanceType<T>} */ (new Widget(...props));
}

/**
 * @typedef {number | 'max'} GtkSize
 */

/**
 * @typedef  {import("types/widgets/widget.js").BaseProps<ForceSizedClass, Gtk.Bin.ConstructorProperties & { width?: GtkSize, height?: GtkSize }>} ForceSizedProps
 */

class ForceSizedClass extends Gtk.Bin {
  static {
    Widget.register(this, {
      typename: "ForceSized",
      cssName: "force-sized",
      properties: {
        "width": ["int", "rw"],
        "height": ["int", "rw"],
      },
    });
  }

  /** @returns {GtkSize} */
  get height() {
    return this._get("height");
  }
  /** @param {GtkSize} v */
  set height(v) {
    if (v === "max") {
      this.vexpand = true;
    } else {
      this._set("height", v);
    }
  }

  /** @returns {GtkSize} */
  get width() {
    return this._get("width");
  }
  /** @param {GtkSize} v */
  set width(v) {
    if (v === "max") {
      this.hexpand = true;
    } else {
      this._set("width", v);
    }
  }

  constructor(/** @type ForceSizedProps */ props = {}) {
    super(/** @type Gtk.Bin.ConstructorProperties */ (props));

    if (props.width === "max") {
      this.hexpand = true;
    }

    if (props.height === "max") {
      this.vexpand = true;
    }
  }

  vfunc_get_preferred_height() {
    return /** @type {[number, number]} */ ([this.height, this.height]);
  }

  vfunc_get_preferred_width() {
    return /** @type {[number, number]} */ ([this.width, this.width]);
  }
}

export const ForceSized = createCtor(ForceSizedClass);

export const SetupRevealer = (
  /** @type {NonNullable<Parameters<typeof Revealer>[0]>['transition']} */ transition,
  /** @type {Gtk.Widget} */ content,
  /** @type {{width: GtkSize, height: GtkSize}} */ sizing,
  isMusic = false,
) =>
  Box({
    css: toCSS({
      padding: "1px",
    }),
    child: Revealer({
      reveal_child: false,
      transition,
      child: ForceSized({
        width: sizing.width,
        height: sizing.height,
        child: content,
      }),
    })
    .hook(
      ShowPowerMode,
      (revealer) => {
        if (isMusic) {
          revealer.reveal_child = ShowPowerMode.value.powerMode ||
            ShowPowerMode.value.musicOnly;
        } else {
          revealer.reveal_child = ShowPowerMode.value.powerMode;
        }

        revealer.class_name = revealer.reveal_child ? "bg-mantle/100" : "";
      }
    ),
  });

export const SetupPowerMode = () => {
  globalThis.togglePowerMode = () => {
    ShowPowerMode.value = {
      powerMode: !ShowPowerMode.value.powerMode,
      musicOnly: ShowPowerMode.value.musicOnly,
    };

    return ShowPowerMode.value;
  };

  globalThis.toggleMusicOnly = () => {
    ShowPowerMode.value = {
      powerMode: ShowPowerMode.value.powerMode,
      musicOnly: !ShowPowerMode.value.musicOnly,
    };

    return ShowPowerMode.value;
  };

  return [
    Top(),
    Bottom(),
    Left(),
    Right(),
  ];
};
