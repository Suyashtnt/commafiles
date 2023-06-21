{
  description = "Suyashtnt's (maybe) good dotfiles";

  inputs = {
    btop-theme = {
      url = "github:catppuccin/btop";
      flake = false;
    };

    crane = {
      url = "github:ipetkov/crane";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    emacs-overlay = {
      # https://github.com/nix-community/nix-doom-emacs/issues/409
      url = "github:nix-community/emacs-overlay/c16be6de78ea878aedd0292aa5d4a1ee0a5da501";
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

    nix-doom-emacs = {
      url = "github:nix-community/nix-doom-emacs";
      inputs.emacs-overlay.follows = "emacs-overlay";
    };

    nixpkgs.url = "nixpkgs/nixos-unstable";

    nixpkgs-f2k.url = "github:fortuneteller2k/nixpkgs-f2k";

    nixpkgs-wayland = {
      url = "github:nix-community/nixpkgs-wayland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nur.url = "github:nix-community/NUR";

    nyoom-src = {
      url = "github:nyoom-engineering/nyoom.nvim";
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

    fennel-lsp = {
      url = "sourcehut:~xerool/fennel-ls";
      flake = false;
    };
  };

  outputs = {...} @ inputs: let
    system = "x86_64-linux";

    pkgs = import inputs.nixpkgs {
      inherit system;
    };

    fennel-ls = pkgs.stdenv.mkDerivation {
      pname = "fennel-ls";
      version = "git-unstable";
      src = inputs.fennel-lsp;

      nativeBuildInputs = with pkgs; [
        luajit
        fennel
      ];

      installPhase = ''
        DESTDIR=$out PREFIX=$out make install
        install -Dm755 fennel-ls $out/bin/fennel-ls
      '';
    };
  in {
    nixosConfigurations = import ./systems inputs;

    devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [
        nil # nix LSP
        yaml-language-server # yaml LSP
        alejandra # uncomprimising nix formatter
        fnlfmt # fennel formatter
        fennel # fennel compiler
        fennel-ls # fennel LSP
        lua-language-server
      ];
    };

    packages.${system} = {
      catppuccin-folders = pkgs.callPackage ./pkgs/catppuccin-folders.nix {};
      catppuccin-gtk = pkgs.callPackage ./pkgs/catppuccin-gtk.nix {};
      catppuccin-cursors = pkgs.callPackage ./pkgs/catppuccin-cursors.nix {};
      fennel-ls = fennel-ls;
    };
  };
}
