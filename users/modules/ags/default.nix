{
  inputs,
  pkgs,
  system,
  ...
}: let
  commashell = pkgs.stdenvNoCC.mkDerivation rec {
    name = "commashell";
    src = pkgs.stdenv.mkDerivation {
      name = "ags-config";
      src = ./.;
      nativeBuildInputs = [pkgs.deno pkgs.nodejs];

      patchPhase = ''
        echo '${builtins.toJSON inputs.kleur.themes.${pkgs.system}.dark.base16}' > kleur-dark.json
      '';

      installPhase = ''
        mkdir $out
        deno run -A uno.js
        cp -r ./config/* $out
      '';
    };

    nativeBuildInputs = [
      inputs.ags.packages.${pkgs.system}.default
      pkgs.wrapGAppsHook
      pkgs.gobject-introspection
    ];

    buildInputs = with inputs.astal.${pkgs.system}; [
      pkgs.vte
      astal3
      io
    ];

    installPhase = ''
      mkdir -p $out/bin
      ags bundle app.ts $out/bin/${name}
    '';
  };
in {
  imports = [inputs.ags.homeManagerModules.default];

  home.packages = [
    pkgs.sptlrx
    commashell
  ];
}
