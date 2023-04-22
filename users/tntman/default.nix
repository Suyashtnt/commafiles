{
  lib,
  pkgs,
  inputs,
  ...
}: {
  imports = [
    ../modules/dunst
    ../modules/electron
    ../modules/eww
    ../modules/git
    ../modules/gtk
    ../modules/hyprland
    ../modules/playerctl
    ../modules/programs/firefox
    ../modules/programs/kitty
    ../modules/programs/neofetch
    ../modules/programs/neovim
    ../modules/programs/vscode # when neovim simply isn't enough
    ../modules/shell
    ../modules/spotify
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
      btop # system monitor

      prismlauncher # minecraft go brrr
      temurin-jre-bin-17 # java go brrr
      zotero # reference manager go brrr
      jetbrains-toolbox # jetbran go brrr

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
