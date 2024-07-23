{ inputs
, pkgs
, ...
}: {
  imports = [ inputs.ags.homeManagerModules.default ];

  home.packages = [
    pkgs.sptlrx
  ];

  programs.ags = {
    enable = true;

    extraPackages = [ pkgs.vte ];

    configDir = pkgs.stdenv.mkDerivation {
      name = "ags-config";
      src = ./.;
      nativeBuildInputs = [ pkgs.deno pkgs.nodejs ];

      patchPhase = ''
        echo '${builtins.toJSON inputs.kleur.themes.${pkgs.system}.dark.base16}' > kleur-dark.json
      '';

      installPhase = ''
        mkdir $out
        deno run -A uno.js
        cp -r ./config/* $out
      '';
    };
  };
}
