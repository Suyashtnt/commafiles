{
  description = "Suyashtnt's (maybe) good dotfiles";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    nur.url = "github:nix-community/NUR";
    nixpkgs-f2k.url = "github:fortuneteller2k/nixpkgs-f2k";
    flake-utils.url = "github:numtide/flake-utils";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland = {
      url = "github:hyprwm/Hyprland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    xdg-desktop-portal-hyprland = {
      url = "github:hyprwm/xdg-desktop-portal-hyprland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nixpkgs-wayland = {
      url = "github:nix-community/nixpkgs-wayland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    crane = {
      url = "github:ipetkov/crane";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    xresources = {
      url = "github:catppuccin/xresources";
      flake = false;
    };

    btop-theme = {
      url = "github:catppuccin/btop";
      flake = false;
    };

    grub-theme = {
      url = "github:catppuccin/grub";
      flake = false;
    };

    swww-src = {
      url = "github:Horus645/swww";
      flake = false;
    };

    nyoom-src = {
      url = "github:nyoom-engineering/nyoom.nvim";
      flake = false;
    };
  };

  outputs = { self, ... } @ inputs:
    let
      system = "x86_64-linux";

      pkgs = import inputs.nixpkgs {
        inherit system;
      };
    in
    {
      nixosConfigurations = import ./systems inputs;

      devShells.x86_64-linux.default = pkgs.mkShell {
        packages = with pkgs; [
          rnix-lsp # nix LSP
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
