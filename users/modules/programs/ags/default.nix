{
  inputs,
  pkgs,
  ...
}: let
  ags = inputs.ags.packages.${pkgs.system}.default;
in {
  home.packages = [
    ags
  ];

  # ags service for after desktop login
  systemd.user.services.ags = {
    Unit = {
      Description = "ags";
      After = [ "graphical-session-pre.target" ];
      PartOf = [ "graphical-session.target" ];
    };

    Service = {
      Type = "simple";
      ExecStart = "${ags}/ags";
      Restart = "always";
      RestartSec = 5;
    };

    Install = {
      WantedBy = [ "graphical-session.target" ];
    };
  };

  xdg.configFile.ags = {
    source = pkgs.stdenv.mkDerivation rec {
      name = "ags-config";
      src = ./.;
      nativeBuildInputs = [pkgs.deno pkgs.nodejs];

      deno-cache = pkgs.stdenv.mkDerivation {
        name = "ags-config-deno-cache";
        src = ./.;
        nativeBuildInputs = with pkgs; [deno];

        buildPhase = ''
          export DENO_DIR=.deno;
          mkdir -p $DENO_DIR/deps; mkdir -p $DENO_DIR/npm
          deno cache ./createUnoFile.js --lock=deno.lock
        '';

        installPhase = ''
          mkdir $out
          cp -r $DENO_DIR/deps $out
          cp -r $DENO_DIR/npm $out
        '';

        outputHashMode = "recursive";
        outputHash = "sha256-SAmwQNGBglO/o+mJjxCuhuajZwI2uQ+30kB1PqNWjkM=";
      };

      configurePhase = ''
        export DENO_DIR=.deno; mkdir $DENO_DIR
        ln -s ${deno-cache}/deps $DENO_DIR/deps
        ln -s ${deno-cache}/npm $DENO_DIR/npm
      '';

      installPhase = ''
        mkdir $out
        deno run -A --cached-only --lock deno.lock ./createUnoFile.js
        cp -r ./config/* $out
      '';
    };
  };
}
