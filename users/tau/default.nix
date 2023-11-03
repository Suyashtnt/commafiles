{
  pkgs,
  inputs,
  ...
}: {
  imports = [
    inputs.nix-index-database.hmModules.nix-index
    ../modules/git
    ../modules/shell
    ../modules/xdg
    ../modules/syncthing
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
