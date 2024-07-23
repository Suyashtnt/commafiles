{inputs, pkgs, lib, ...}: let
  path = inputs.kleur.themes.${pkgs.system}.dark;
in {
  xdg.configFile = {
    "gtk-3.0/gtk.css".source = lib.mkForce "${path.build}/gtk-3.css";
    "gtk-4.0/gtk.css".source = lib.mkForce "${path.build}/gtk-4.css";
    "zed/themes/kleur.json".source = inputs.kleur.themes.${pkgs.system}.zed;
    "helix/themes/kleur.toml".source = "${path.build}/helix.toml";
  };
}
