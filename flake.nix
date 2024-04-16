{
  description = "Suyashtnt's (maybe) good dotfiles";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    home-manager = {
        url = "github:nix-community/home-manager";
        inputs.nixpkgs.follows = "nixpkgs";
    };

    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };

    flake-compat = {
      url = "github:inclyc/flake-compat";
      flake = false;
    };

    ags = {
     url = "github:Aylur/ags";
     inputs.nixpkgs.follows = "nixpkgs";
    };

    copilot-mode-src = {
      url = "github:zerolfx/copilot.el";
      flake = false;
    };

    crane = {
      url = "github:ipetkov/crane";
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
      };
    };

    helix = {
      url = "github:helix-editor/helix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland = {
      url = "github:hyprwm/Hyprland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    kleur = {
      url = "github:suyashtnt/kleur";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    neovide-src = {
      url = "github:neovide/neovide";
      flake = false;
    };

    neovim-nightly-overlay.url = "github:nix-community/neovim-nightly-overlay";

    doom-emacs = {
      url = "github:doomemacs/doomemacs";
      flake = false;
    };

    nixd = {
      url = "github:nix-community/nixd";
      inputs = {
        nixpkgs.follows = "nixpkgs";
        flake-parts.follows = "flake-parts";
      };
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

    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    sops-nix = {
      url = "github:Mic92/sops-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    spotify-player-src = {
      url = "github:aome510/spotify-player";
      flake = false;
    };

    stylix = {
      url = "github:bluskript/stylix";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.home-manager.follows = "home-manager";
    };

    typst-mode-src = {
      url = "github:Ziqi-Yang/typst-mode.el";
      flake = false;
    };

    xdg-desktop-portal-hyprland = {
      url = "github:hyprwm/xdg-desktop-portal-hyprland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    zotero-nix = {
      url = "github:camillemndn/zotero-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ {self, ...}:
    inputs.flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "aarch64-linux"];

      debug = true;
      
      imports = [
        inputs.ez-configs.flakeModule
        ./devshell.nix
        ./pkgs
        ./pkgs/overlay.nix
        ./systems
        ./users
      ];

      ezConfigs = {
        root = ./.;

        globalArgs = {
          inherit inputs;
          inherit (self) packages;
          wallpapers = ./wallpapers;
          secrets = ./secrets;
          flakeOverlays = self.overlays;
        };
      };
    };
}
