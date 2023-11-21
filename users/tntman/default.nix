{
  pkgs,
  ezModules,
  inputs,
  ...
}: {
  imports = [
    inputs.nix-index-database.hmModules.nix-index

    ezModules.electron
    ezModules.gammastep
    ezModules.git
    ezModules.gtk
    ezModules.hyprland
    ezModules.openrgb
    ezModules.playerctl
    ezModules.swaylock
    ezModules.syncthing
    ezModules.xdg
    ezModules.ags
    ezModules.neofetch
    ezModules.neovim
    ezModules.obs
    ezModules.spotify
    ezModules.vscode
    ezModules.webcord

    ezModules.shell
    ezModules.nushell

    ezModules.terminal
    ezModules.kitty

    ezModules.theme
  ];

  home = {
    username = "tntman";
    homeDirectory = "/home/tntman";

    stateVersion = "22.05";

    packages = with pkgs; [
      vivaldi # chrome but better
      obsidian # notes
      wofi # launcher
      authy # 2fa
      gnome.nautilus # file manager
      kooha # for screen recording

      blender # 3D modeling go brrr
      prismlauncher # minecraft go brrr
      temurin-jre-bin-17 # java go brrr
      inputs.camillemndn.packages.${pkgs.system}.zotero # reference manager go brrr
      jetbrains-toolbox # jetbran go brrr
      bitwarden # password manager go brrr

      # CLI utils
      btop # monitoring stuff
      unzip # unzipping stuff
      ripgrep # searching stuff
      cachix # caching stuff
      bitwarden-cli # password manager stuff
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
