{inputs, pkgs, ...}: let
  path = inputs.kleur.themes.${pkgs.system}.dark;
in {
  tntman.theme.base16 = path.base16;
}
