{
  description = "Suyashtnt's (maybe) good dotfiles";

  inputs = {
    # Principle inputs (updated by `nix run .#update`)
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    nix-darwin.url = "github:lnl7/nix-darwin/master";
    nix-darwin.inputs.nixpkgs.follows = "nixpkgs";
    home-manager.url = "github:nix-community/home-manager";
    home-manager.inputs.nixpkgs.follows = "nixpkgs";

    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };

    ags.url = "github:Suyashtnt/ags/feat/typescript-typegen";

    btop-theme = {
      url = "github:catppuccin/btop";
      flake = false;
    };

    camillemndn.url = "github:camillemndn/nixos-config";

    copilot-mode-src = {
      url = "github:zerolfx/copilot.el";
      flake = false;
    };

    crane = {
      url = "github:ipetkov/crane";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    deno2nix = {
      url = "github:SnO2WMaN/deno2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    emacs-overlay = {
      url = "github:nix-community/emacs-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    eww = {
      url = "github:elkowar/eww";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.rust-overlay.follows = "rust-overlay";
    };

    ez-configs = {
      url = "github:ehllie/ez-configs";

      inputs = {
        nixpkgs.follows = "nixpkgs";
        flake-parts.follows = "flake-parts";
        home-manager.follows = "home-manager";
      };
    };

    grub-theme = {
      url = "github:catppuccin/grub";
      flake = false;
    };

    hyprland = {
      url = "github:hyprwm/Hyprland/2df0d034bc4a18fafb3524401eeeceaa6b23e753";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    neovide-src = {
      url = "github:fredizzimo/neovide/fsundvik/improve-render-loop";
      flake = false;
    };

    neovim-nightly-overlay.url = "github:nix-community/neovim-nightly-overlay";

    doom-emacs = {
      url = "github:doomemacs/doomemacs";
      flake = false;
    };

    nixos-hardware.url = "github:NixOS/nixos-hardware";

    nixpkgs-f2k = {
      url = "github:fortuneteller2k/nixpkgs-f2k";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nix-index-database = {
      url = "github:nix-community/nix-index-database";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nyoom-src = {
      url = "github:nyoom-engineering/nyoom.nvim";
      flake = false;
    };

    plymouth-theme = {
      url = "github:catppuccin/plymouth";
      flake = false;
    };

    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    spotify-player-src = {
      url = "github:aome510/spotify-player";
      flake = false;
    };

    swww-src = {
      url = "github:Horus645/swww";
      flake = false;
    };

    typst-mode-src = {
      url = "github:Ziqi-Yang/typst-mode.el";
      flake = false;
    };

    xdg-desktop-portal-hyprland = {
      url = "github:hyprwm/xdg-desktop-portal-hyprland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    xresources = {
      url = "github:catppuccin/xresources";
      flake = false;
    };
  };

  outputs = inputs @ {self, ...}:
    inputs.flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "aarch64-darwin" "x86_64-darwin" "aarch64-linux"];

      imports = [
        inputs.ez-configs.flakeModule
        ./devshell.nix
        ./pkgs
        ./systems
        ./users
      ];

      ezConfigs = {
        root = ./..;

        globalArgs = {
          inherit inputs;
          inherit (self) packages;
        };
      };
    };
}
