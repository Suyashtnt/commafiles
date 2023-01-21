{ lib
, pkgs
, inputs
, ...
}: {
  imports = [
    ../modules/direnv
    ../modules/electron
    ../modules/git
    ../modules/gtk
    ../modules/hyprland
    ../modules/programs/dunst
    ../modules/programs/eww
    ../modules/programs/firefox
    ../modules/programs/kitty
    ../modules/programs/neofetch
    ../modules/programs/neovim
    ../modules/programs/vscode # when neovim simply isn't enough
    ../modules/programs/spotify
    ../modules/swaylock
    ../modules/xdg

    inputs.hyprland.homeManagerModules.default
  ];
  manual.manpages.enable = false;

  home = {
    username = "tntman";
    homeDirectory = "/home/tntman";

    stateVersion = "22.05";

    packages = with pkgs; [
      chromium # js debugging and lighthoouse
      obsidian # notes
      wofi # launcher
      authy # 2fa
      gnome.nautilus # file manager
      kooha # for screen recording

      prismlauncher # minecraft go brrr
      temurin-jre-bin-17 # prism go brrr

      kitty # temporary until kitty is setup

      # CLI utils
      unzip # unzipping stuff
      ripgrep # searching stuff
      cachix # caching stuff
      docker-compose # docker-ing stuff
    ];
  };

  programs = {
    home-manager.enable = true;
  };

  xresources.extraConfig = builtins.readFile (
    inputs.xresources + "/mocha.Xresources"
  );
}
