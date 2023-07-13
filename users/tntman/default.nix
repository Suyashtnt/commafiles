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
    ../modules/gammastep
    ../modules/git
    ../modules/gtk
    ../modules/hyprland
    ../modules/openrgb
    ../modules/playerctl
    ../modules/programs/emacs
    ../modules/programs/firefox
    ../modules/programs/kitty
    ../modules/programs/neofetch
    ../modules/programs/neovim
    ../modules/programs/spotify
    ../modules/programs/vscode # when neovim simply isn't enough
    ../modules/shell
    ../modules/swaylock
    ../modules/xdg

    inputs.hyprland.homeManagerModules.default
    inputs.nix-doom-emacs.hmModule
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
      postman # api testing
      insomnia # api testing 2: sleepless boogaloo

      prismlauncher # minecraft go brrr
      temurin-jre-bin-17 # java go brrr
      zotero # reference manager go brrr
      jetbrains-toolbox # jetbran go brrr
      webcord # discord go brrr

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
