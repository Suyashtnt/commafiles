{
  pkgs,
  ezModules,
  inputs,
  ...
}: {
  imports = [
    inputs.nix-index-database.hmModules.nix-index

    ezModules.electron
    ezModules.firefox
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
    ezModules.yazi
    ezModules.zellij

    ezModules.shell
    ezModules.nushell

    ezModules.terminal
    ezModules.wezterm

    ezModules.editor
    ezModules.helix

    ezModules.theme
  ];

  home = {
    username = "tntman";
    homeDirectory = "/home/tntman";

    stateVersion = "22.05";

    packages = with pkgs; [
      (pkgs.obsidian.override {
        electron = pkgs.electron_24;
      }) # notes

      gnome.nautilus # file manager
      kooha # for screen recording
      thunderbird # email go brrr
      fragments # for torrenting... :cluelesser:
      loupe

      temurin-jre-bin-17 # java go brrr
      inputs.zotero-nix.packages.${pkgs.system}.zotero # reference manager go brrr
      jetbrains-toolbox # jetbran go brrr
      bitwarden # password manager go brrr
      fractal # matrix go brrr

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
