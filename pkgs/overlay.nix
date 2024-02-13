{inputs, ...}: {
  imports = [
    inputs.flake-parts.flakeModules.easyOverlay
  ];
  perSystem = { config, pkgs, final, ... }: {
    overlayAttrs = {
      inherit (config.packages) fennel-ls cavalier firefox-pwa;
    };
  };
}
