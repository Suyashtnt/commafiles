{ inputs, pkgs, ... }: {
  nixpkgs.overlays = [ inputs.niri.overlays.niri ];
  imports = [ inputs.niri.nixosModules.niri ];

  programs.niri = {
    enable = true;
    package = pkgs.niri-unstable;
  };
}
