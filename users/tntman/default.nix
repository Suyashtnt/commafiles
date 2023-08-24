{
  lib,
  pkgs,
  inputs,
  ...
}: {
  imports = [
    ../modules/programs/ags
    ../modules/dunst
    ../modules/electron
    ../modules/eww
    ../modules/gammastep
    ../modules/git
    ../modules/gtk
    ../modules/hyprland
    ../modules/openrgb
    ../modules/playerctl
    ../modules/programs/kitty
    ../modules/programs/neofetch
    ../modules/programs/neovim
    ../modules/programs/spotify
    ../modules/programs/vscode
    ../modules/programs/webcord
    ../modules/shell
    ../modules/swaylock
    ../modules/xdg

    inputs.nix-doom-emacs.hmModule
  ];
  manual.manpages.enable = false;

  home = {
    username = "tntman";
    homeDirectory = "/home/tntman";

    stateVersion = "22.05";

    packages = with pkgs; [
      vivaldi # chrome but better
      obsidian # notes
      obs-studio # fullscreen sharing. Basically run obs in fullscreen preview and share that. It's goofy as hell
      wofi # launcher
      authy # 2fa
      gnome.nautilus # file manager
      kooha # for screen recording
      btop # system monitor

      prismlauncher # minecraft go brrr
      temurin-jre-bin-17 # java go brrr
      zotero # reference manager go brrr
      jetbrains-toolbox # jetbran go brrr

      # CLI utils
      unzip # unzipping stuff
      ripgrep # searching stuff
      cachix # caching stuff
    ];
  };

  programs = {
    home-manager.enable = true;
  };

  xresources.extraConfig = builtins.readFile (
    inputs.xresources + "/mocha.Xresources"
  );
}
