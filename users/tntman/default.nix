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
    ezModules.git
    ezModules.gtk
    ezModules.niri
    ezModules.openrgb
    ezModules.playerctl
    ezModules.kleur
    ezModules.syncthing
    ezModules.xdg
    ezModules.ags
    ezModules.neofetch
    ezModules.obs
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
      anki # cards (obsidian spaced reptition has failed me again)

      nautilus # file manager
      loupe # image viewer
      fragments # for torrenting... :cluelesser:
      kicad # PCB gaming

      pkgs.cavalier # le music vis
      sptlrx # funni lyrics

      # inputs.zotero-nix.packages.${pkgs.system}.zotero # reference manager go brrr
      fractal # matrix go brrr
      libreoffice # presentations and stuff go brrr
      feishin # music go brrr

      # CLI utils
      btop # monitoring stuff
      ripgrep # searching stuff
      cachix # caching stuff
      cloudflared # ssh tunnel stuff
      nix-output-monitor # building stuff
      lutris
      protonup-qt
      cartridges
    ];
  };

  home.sessionVariables = {
    FLAKE = "/home/tntman/commafiles";
  };

  programs = {
    home-manager.enable = true;
    nix-index-database.comma.enable = true;
  };

  services.easyeffects.enable = true;
}
