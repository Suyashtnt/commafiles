{
  pkgs,
  inputs,
  ...
}: let
  craneLib = inputs.crane.lib.${pkgs.system};

  swww = craneLib.buildPackage {
    src = craneLib.cleanCargoSource inputs.swww-src;
    nativeBuildInputs = with pkgs; [pkg-config libxkbcommon];
    doCheck = false; # breaks on nixOS
  };

  hyprland-nvidia = inputs.hyprland.packages.${pkgs.system}.default.override {
    nvidiaPatches = true;
    wlroots = inputs.hyprland.packages.${pkgs.system}.wlroots-hyprland;
  };

  hyprland = inputs.hyprland.packages.${pkgs.system}.default;
in {
  environment.defaultPackages = [];
  nixpkgs.config.allowUnfree = true;
  nixpkgs.config.allowBroken = false;

  nixpkgs.overlays = [
    inputs.nixpkgs-f2k.overlays.default
    inputs.xdg-desktop-portal-hyprland.overlays.default
    inputs.emacs-overlay.overlays.default
    (final: super: {
      makeModulesClosure = x:
        super.makeModulesClosure (x // {allowMissing = true;});

      spotifyd = super.spotifyd.override {
        withMpris = true;
      };

      nushell = super.nushell.override (old: {
        additionalFeatures = features: features ++ ["dataframe"];
      });

      inherit swww hyprland-nvidia hyprland craneLib;
    })
  ];

  nix = {
    package = pkgs.nixStable;
    gc = {
      automatic = true;
      dates = "weekly";
    };
    extraOptions = ''
      experimental-features = nix-command flakes
    '';
    settings = {
      trusted-users = ["root" "tntman"];
      auto-optimise-store = true;
      trusted-public-keys = [
        "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
        "fortuneteller2k.cachix.org-1:kXXNkMV5yheEQwT0I4XYh1MaCSz+qg72k8XAi2PthJI="
        "hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="
        "webcord.cachix.org-1:l555jqOZGHd2C9+vS8ccdh8FhqnGe8L78QrHNn+EFEs="
        "nixpkgs-wayland.cachix.org-1:3lwxaILxMRkVhehr5StQprHdEo4IrE8sRho9R9HOLYA="
        "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
      ];
      substituters = [
        "https://cache.nixos.org?priority=10"
        "https://fortuneteller2k.cachix.org"
        "https://hyprland.cachix.org"
        "https://webcord.cachix.org"
        "https://nixpkgs-wayland.cachix.org"
        "https://nix-community.cachix.org"
      ];
    };
  };

  # who needs documentation anyways
  documentation = {
    enable = false;
    doc.enable = false;
    man.enable = true;
    dev.enable = false;
  };

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It‘s perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "22.05"; # Did you read the comment? If not, TLDR don't change this
}
