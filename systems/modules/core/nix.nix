{
  pkgs,
  inputs,
  packages,
  ...
}: {
  environment.defaultPackages = [];

  nixpkgs.config.allowUnfree = true;
  nixpkgs.config.allowBroken = false;

  nixpkgs.config.permittedInsecurePackages = [
     "electron-24.8.6" # Obsidian Wayland, above does not work 
  ];

  nixpkgs.overlays = [
    inputs.nixpkgs-f2k.overlays.default
    inputs.xdg-desktop-portal-hyprland.overlays.default
    inputs.neovim-nightly-overlay.overlay
    inputs.rust-overlay.overlays.default
    inputs.emacs-overlay.overlays.default
    inputs.eww.overlays.default
    inputs.deno2nix.overlays.default
    inputs.helix.overlays.default
    (final: super: rec {
      makeModulesClosure = x:
        super.makeModulesClosure (x // {allowMissing = true;});

      craneLib = inputs.crane.lib.${pkgs.system};

      swww = craneLib.buildPackage {
        src = craneLib.cleanCargoSource inputs.swww-src;
        nativeBuildInputs = with pkgs; [pkg-config libxkbcommon];
        doCheck = false; # breaks on nixOS
      };

      inherit (packages.${pkgs.system}) fennel-ls cavalier firefox-pwa;
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
      trusted-users = ["@wheel"];
      auto-optimise-store = true;
      trusted-public-keys = [
        "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
        "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
      ];
      substituters = [
        "https://cache.nixos.org?priority=10"
        "https://nix-community.cachix.org"
      ];
    };
  };

  documentation = {
    enable = true;
    man.enable = true;
  };

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It‘s perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = pkgs.lib.mkDefault "22.05"; # Did you read the comment? If not, TLDR don't change this
}
