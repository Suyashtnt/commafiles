{
  lib,
  pkgs,
  inputs,
  ...
}: {
  imports = [
    ../modules/git
    ../modules/gtk
    ../modules/hyprland
    ../modules/programs/dunst
    ../modules/programs/eww
    ../modules/programs/firefox
    ../modules/programs/kitty
    ../modules/programs/neofetch
    ../modules/programs/neovim
    ../modules/programs/spotify
    ../modules/swaylock
    ../modules/direnv
    ../modules/xdg

    inputs.hyprland.homeManagerModules.default
  ];
  manual.manpages.enable = false;

  home = {
    username = "tntman";
    homeDirectory = "/home/tntman";

    stateVersion = "22.05";

    packages = with pkgs; [
      chromium #for js debugging and lighthoouse
      wofi
      authy
      dolphin

      kitty # temporary until kitty is setup

      # CLI utils
      xorg.xhost
      unzip
      ripgrep
      cachix
      docker-compose
    ];
  };

  programs = {
    home-manager.enable = true;
  };

  xresources.extraConfig = builtins.readFile (
    inputs.xresources + "/mocha.Xresources"
  );
}
