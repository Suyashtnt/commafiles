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

    spotify-player-src = {
      url = "github:aome510/spotify-player";
      flake = false;
    };

    swww-src = {
      url = "github:Horus645/swww";
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

  outputs = { ... } @ inputs:
    let
      system = "x86_64-linux";

      pkgs = import inputs.nixpkgs {
        inherit system;
      };
    in
    {
      nixosConfigurations = import ./systems inputs;

      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nil # nix LSP
          yaml-language-server # yaml LSP
          alejandra # uncomprimising nix formatter
          fnlfmt # fennel formatter
        ];
      };

      packages.${system} = {
        catppuccin-folders = pkgs.callPackage ./pkgs/catppuccin-folders.nix { };
        catppuccin-gtk = pkgs.callPackage ./pkgs/catppuccin-gtk.nix { };
        catppuccin-cursors = pkgs.callPackage ./pkgs/catppuccin-cursors.nix { };
      };
    };
}
