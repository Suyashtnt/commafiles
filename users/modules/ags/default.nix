{
  inputs,
  pkgs,
  ...
}: {
  imports = [ inputs.ags.homeManagerModules.default ];

  programs.ags = {
    enable = true;

    configDir = pkgs.stdenv.mkDerivation rec {
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
