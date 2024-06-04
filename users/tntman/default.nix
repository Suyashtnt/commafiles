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
    ezModules.swaylock
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

      gnome.nautilus # file manager
      loupe # image viewer
      kooha # for screen recording
      thunderbird # email go brrr
      fragments # for torrenting... :cluelesser:

      (pkgs.cavalier.overrideAttrs (old: rec {
        runtimeDeps = old.runtimeDeps ++ [
          pkgs.libGL
          pkgs.mesa_drivers
        ];

        nativeBuildInputs = old.nativeBuildInputs ++ [
          pkgs.makeWrapper
        ];

        postFixup = ''
          wrapProgram $out/bin/NickvisionCavalier.GNOME \
            --prefix LD_LIBRARY_PATH : ${lib.makeLibraryPath runtimeDeps}
        '';
      })) # le music vis
      cava # le dep for le music vis
      sptlrx # funni lyrics

      inputs.zotero-nix.packages.${pkgs.system}.zotero # reference manager go brrr
      jetbrains-toolbox # jetbran go brrr
      bitwarden # password manager go brrr
      fractal # matrix go brrr
      krita # drawing go brrr
      inkscape # drawing vectors go brrr
      strawberry-qt6 # music go brrr
      libreoffice # presentations and stuff go brrr

      # CLI utils
      btop # monitoring stuff
      ripgrep # searching stuff
      cachix # caching stuff
      bitwarden-cli # password manager stuff
      cloudflared # ssh tunnel stuff
      nix-output-monitor # building stuff
    ];
  };

  home.sessionVariables = {
    FLAKE = "/home/tntman/commafiles";
  };

  programs = {
    home-manager.enable = true;
    nix-index-database.comma.enable = true;
  };
}
