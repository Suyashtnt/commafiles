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
    ];
  };

  programs = {
    home-manager.enable = true;
    nix-index-database.comma.enable = true;
  };

  xresources.extraConfig = builtins.readFile (
    inputs.xresources + "/mocha.Xresources"
  );
}
