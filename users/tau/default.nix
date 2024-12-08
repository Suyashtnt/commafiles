{
  inputs,
  ezModules,
  pkgs,
  config,
  ...
}: {
  imports = [
    inputs.nix-index-database.hmModules.nix-index

    ezModules.git
    ezModules.wezterm
    ezModules.nushell
    ezModules.syncthing
    ezModules.xdg

    ezModules.terminal
    ezModules.shell
  ];

  home = {
    username = "tau";
    homeDirectory = "/home/tau";

    stateVersion = "23.11";

    packages = with pkgs; [
      cachix # caching stuff
      rsync
      zellij
      (openocd.override { extraHardwareSupport = ["bcm2835gpio"]; })
    ];
  };

  programs = {
    home-manager.enable = true;
    nix-index-database.comma.enable = true;
  };
}
