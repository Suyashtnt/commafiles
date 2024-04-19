# Theme options
{
  lib,
  config,
  wallpapers,
  pkgs,
  ...
}: let
  theme = config.tntman.theme;
  monoFont = config.tntman.monospaceFont;
in {
  options.tntman = {
    theme = lib.mkOption {
      type = lib.types.attrs;
      description = "Theme options";
    };

    monospaceFont = lib.mkOption {
      type = lib.types.str;
      default = "ComicCodeLigatures Nerd Font";
      description = "Monospace font";
    };
  };

  config.stylix = {
    polarity = "dark";
    base16Scheme = theme.base16;

    fonts = {
      serif = {
        package = pkgs.stix-two;
        name = "Stix Two Text";
      };

      sansSerif = {
        package = pkgs.inter;
        name = "Inter";
      };

      monospace = {
        package = pkgs.nerdfonts.override {fonts = ["JetBrainsMono"];};
        name = monoFont;
      };

      emoji = {
        package = pkgs.noto-fonts-emoji;
        name = "Noto Color Emoji";
      };

      sizes = {
        applications = 13;
        desktop = 12;
      };
    };

    # opacity = {
    #   desktop = 0.6;
    #   terminal = 0.6;
    #   applications = 0.6;
    # };

    targets = {
      plymouth.logo = ./nix.png;
    };

    image = "${wallpapers}/Orbit.png";

    cursor = {
      package = pkgs.catppuccin-cursors.mochaLavender;
      name = "Catppuccin-Mocha-Lavender-Cursors";
      size = 16;
    };
  };
}
