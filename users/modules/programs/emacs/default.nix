{
  pkgs,
  inputs,
  config,
  lib,
  ...
}: let
  emc = pkgs.writeShellScriptBin "em" ''
    #!/bin/sh
    emacsclient -nc $@
  '';
in {
  home = {
    packages = [
      emc
      pkgs.fd
      pkgs.emacs-all-the-icons-fonts
    ];

    sessionPath = ["${config.xdg.configHome}/emacs/bin"];
    sessionVariables = {
      DOOMDIR = "${config.xdg.configHome}/.doom.d";
      DOOMLOCALDIR = "${config.xdg.configHome}/doom-local";
    };

    activation.syncDoomEmacs = lib.hm.dag.entryAfter ["installPackages"] ''
      queryEmacsVersion() {
        local emacs="$1"
        "$emacs" --batch --eval '(princ (format "%d\n" emacs-major-version))'
      }

      syncDoomEmacs() {
        local oldEmacs newEmacs
        oldEmacs="$(readlink -m "$oldGenPath/home-path/bin/emacs")"
        newEmacs="$(readlink -m "$newGenPath/home-path/bin/emacs")"

        export DOOMDIR="${config.home.sessionVariables.DOOMDIR}"
        export DOOMLOCALDIR="${config.home.sessionVariables.DOOMLOCALDIR}"

        if [[ -x "${config.xdg.configHome}/emacs/bin/doom" ]]; then
          noteEcho 'This may take a while...'

          local maxfiles
          maxfiles="$(ulimit -n)"
          ulimit -n hard

          PATH="$newGenPath/home-path/bin:${pkgs.git}/bin:$PATH" \
            $DRY_RUN_CMD "${config.xdg.configHome}/emacs/bin/doom" \
              ''${VERBOSE:+-d} sync -e

          oldVersion="$(queryEmacsVersion "$oldEmacs")"
          newVersion="$(queryEmacsVersion "$newEmacs")"
          if (( oldVersion != newVersion )); then
            PATH="$newGenPath/home-path/bin:$PATH" \
              $DRY_RUN_CMD "${config.xdg.configHome}/emacs/bin/doom" \
                ''${VERBOSE:+-d} build
          fi

          ulimit -n "$maxfiles"
        fi
      }

      syncDoomEmacs
      systemctl --user restart emacs.service
    '';
  };

  programs.emacs = {
    enable = true;
    package = pkgs.emacs-unstable-pgtk;
    extraConfig = ''
      (setq dired-use-ls-dired t
            insert-directory-program "${pkgs.coreutils}/bin/ls"
            treemacs-python-executable "${pkgs.python3}/bin/python")

      (setq copilot-node-executable "${pkgs.nodejs}")
    '';
    extraPackages = epkgs:
      with epkgs; [
        # include Doom Emacs dependencies that tries to build native C code
        emacsql
        emacsql-sqlite
        pdf-tools
        vterm
      ];
  };

  xdg.configFile.".doom.d".source = ./doom.d;
  xdg.configFile."emacs".source = inputs.doom-emacs;

  services.emacs.enable = true;
}
