{pkgs, inputs, ...}: let
  emc = pkgs.writeShellScriptBin "em" ''
    #!/bin/sh
    emacsclient -nc $@
  '';
in {
  home.packages = with pkgs; [emacs-all-the-icons-fonts ispell emc];

  programs.doom-emacs = rec {
    enable = true;
    doomPrivateDir = ./doom.d;
    emacsPackage = pkgs.emacsPgtk;


    # Only init/packages so we only rebuild when those change.
    doomPackageDir = let
      filteredPath = builtins.path {
        path = doomPrivateDir;
        name = "doom-private-dir-filtered";
        filter = path: type:
          builtins.elem (baseNameOf path) ["init.el" "packages.el"];
      };
    in
      pkgs.linkFarm "doom-packages-dir" [
        {
          name = "init.el";
          path = "${filteredPath}/init.el";
        }
        {
          name = "packages.el";
          path = "${filteredPath}/packages.el";
        }
        {
          name = "config.el";
          path = pkgs.emptyFile;
        }
      ];

    emacsPackagesOverlay = self: super: {
      typst-mode = self.trivialBuild {
        pname = "typst-mode";
        ename = "typst-mode";
        version = "unstable-2023-04-25";
        buildInputs = [ self.polymode ];
        src = inputs.typst-mode-src;
      };
    };
  };

  services.emacs.enable = true;
}
