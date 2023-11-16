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
    ezModules.shell
    ezModules.syncthing
    ezModules.xdg
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
