{
  inputs,
  ezModules,
  pkgs,
  ...
}: {
  imports = [
    inputs.nix-index-database.hmModules.nix-index

    ezModules.git
    ezModules.kitty
    ezModules.neofetch
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
      moonlight-qt
    ];
  };

  programs = {
    home-manager.enable = true;
    nix-index-database.comma.enable = true;
  };
}
