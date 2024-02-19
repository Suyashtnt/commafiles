{inputs, pkgs, ...}: let
  dark = inputs.kleur.themes.${pkgs.system}.dark.base16 // {
    base0A = inputs.kleur.themes.${pkgs.system}.dark.base16.base07;
    base07 = inputs.kleur.themes.${pkgs.system}.dark.base16.base0A;
  };
in {
  tntman.theme.base16 = dark;
}
