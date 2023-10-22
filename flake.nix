{
  description = "Suyashtnt's (maybe) good dotfiles";

  inputs = {
    ags.url = "github:Suyashtnt/ags/feat/typescript-typegen";

    btop-theme = {
      url = "github:catppuccin/btop";
      flake = false;
    };

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
      inputs.flake-utils.follows = "flake-utils";
    };

    emacs-overlay = {
      url = "github:nix-community/emacs-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.flake-utils.follows = "flake-utils";
    };

    eww = {
      url = "github:elkowar/eww";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.rust-overlay.follows = "rust-overlay";
    };

    flake-utils.url = "github:numtide/flake-utils";

    grub-theme = {
      url = "github:catppuccin/grub";
      flake = false;
    };

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
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

    nixpkgs.url = "nixpkgs/nixos-unstable";

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

  outputs = {...} @ inputs:
    inputs.flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import inputs.nixpkgs {
        inherit system;
      };
    in rec {
      devShells.default = pkgs.mkShell {
        packages = with pkgs; [
          nil # nix LSP
          yaml-language-server # yaml LSP
          alejandra # uncomprimising nix formatter
          fnlfmt # fennel formatter
          fennel # fennel compiler
          packages.fennel-ls
          marksman # markdown LSP
          deno # deno LSP for ags transpiler
          nodePackages.typescript-language-server # typescript LSP for ags autocomplete
        ];
      };

      packages = let
        getPackage = pname: (pkgs.callPackage ./_sources/generated.nix {}).${pname};
      in {
        fennel-ls = let
          package = getPackage "fennel-ls";
        in
          pkgs.callPackage ./pkgs/fennel-ls {
            inherit (package) src version;
          };
        cavalier = let
          package = getPackage "cavalier";
        in
          pkgs.callPackage ./pkgs/cavalier
          {
            inherit (package) src version;
          };
      };
    })
    // {
      nixosConfigurations = import ./systems inputs;
      images = import ./systems/images.nix inputs;
    };
}
