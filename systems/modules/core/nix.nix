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
    inputs.nixpkgs-f2k.overlays.terminal-emulators
    inputs.xdg-desktop-portal-hyprland.overlays.default
    inputs.neovim-nightly-overlay.overlay
    inputs.rust-overlay.overlays.default
    inputs.emacs-overlay.overlays.default
    inputs.eww.overlays.default
    inputs.helix.overlays.default
    (final: super: rec {
      makeModulesClosure = x:
        super.makeModulesClosure (x // {allowMissing = true;});

      craneLib = inputs.crane.lib.${pkgs.system};

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
        "fortuneteller2k.cachix.org-1:kXXNkMV5yheEQwT0I4XYh1MaCSz+qg72k8XAi2PthJI="
        "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
        "niri.cachix.org-1:Wv0OmO7PsuocRKzfDoJ3mulSl7Z6oezYhGhR+3W2964="
        "helix.cachix.org-1:ejp9KQpR1FBI2onstMQ34yogDm4OgU2ru6lIwPvuCVs="
      ];
      substituters = [
        "https://cache.nixos.org?priority=10"
        "https://fortuneteller2k.cachix.org"
        "https://nix-community.cachix.org"
        "https://niri.cachix.org"
        "https://helix.cachix.org"
      ];
    };
  };

  documentation = {
    enable = true;
    man.enable = true;
  };

  # recompile nixos
  programs.nh = {
    enable = true;
    clean.enable = true;
  };

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It‘s perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = pkgs.lib.mkDefault "22.05"; # Did you read the comment? If not, TLDR don't change this
}
