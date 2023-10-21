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

  # ags service for after desktop login (TODO: figure out why its broken)
  # systemd.user.services.ags = {
  #   Unit = {
  #     Description = "ags";
  #     After = [ "graphical-session.target" ];
  #   };
  #
  #   Service = {
  #     Type = "simple";
  #     ExecStart = "${ags}/bin/ags";
  #     Restart = "always";
  #     RestartSec = 5;
  #   };
  #
  #   Install = {
  #     WantedBy = [ "graphical-session.target" ];
  #   };
  # };

  xdg.configFile.ags = {
    source = pkgs.stdenv.mkDerivation rec {
      name = "ags-config";
      src = ./.;
      nativeBuildInputs = [pkgs.deno pkgs.nodejs];

      uno-comp = pkgs.deno2nix.mkExecutable {
        pname = "ags-uno-compiler";
        version = "0.1.0";

        src = ./.;
        bin = "uno-comp";

        entrypoint = "./createUnoFile.js";
        lockfile = "./deno.lock";
        config = "./deno.json";

        additionalDenoFlags = "-A";
      };

      installPhase = ''
        mkdir $out
        ls ${uno-comp}/bin
        ${uno-comp}/bin/uno-comp
        cp -r ./config/* $out
      '';
    };
  };
}
