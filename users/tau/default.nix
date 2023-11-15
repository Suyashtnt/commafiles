{
  self,
  inputs,
  pkgs,
  ...
}: {
  imports = [
    self.homeModules.common
    self.homeModules.linux

    inputs.nix-index-database.hmModules.nix-index
    self.homeModules.git
    self.homeModules.kitty
    self.homeModules.neofetch
    self.homeModules.shell
    self.homeModules.syncthing
    self.homeModules.xdg
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
