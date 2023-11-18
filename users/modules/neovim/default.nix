{
  inputs,
  pkgs,
  lib,
  ...
}: let
  custom-neovide-name = pkgs.craneLib.crateNameFromCargoToml {
    cargoToml = "${inputs.neovide-src}/Cargo.toml";
  };

  SKIA_SOURCE_DIR = let
    repo = pkgs.fetchFromGitHub {
      owner = "rust-skia";
      repo = "skia";
      # see rust-skia:skia-bindings/Cargo.toml#package.metadata.skia when updating
      rev = "m119-0.67.3";
      sha256 = "sha256-U75NuJnQa5+SNlOrsBmdlvflGdjo3el63EeIsbnE7ms=";
    };
    # The externals for skia are taken from skia/DEPS
    externals = pkgs.linkFarm "skia-externals" (lib.mapAttrsToList
      (name: value: {
        inherit name;
        path = pkgs.fetchgit value;
      })
      (lib.importJSON ./skia-externals.json));
  in
    pkgs.runCommand "source" {} ''
      cp -R ${repo} $out
      chmod -R +w $out
      ln -s ${externals} $out/third_party/externals
    '';

  custom-neovide-deps = pkgs.craneLib.vendorCargoDeps {
    stdenv = pkgs.clangStdenv;
    src = inputs.neovide-src;

    cargoExtraArgs = "--locked";

    inherit SKIA_SOURCE_DIR;
    SKIA_GN_COMMAND = "${pkgs.gn}/bin/gn";
    SKIA_NINJA_COMMAND = "${pkgs.ninja}/bin/ninja";

    buildInputs = with pkgs;
      [
        SDL2
        fontconfig
        rustPlatform.bindgenHook
      ]
      ++ lib.optionals stdenv.isDarwin [
        darwin.apple_sdk.frameworks.AppKit
      ];
  };

  custom-neovide = pkgs.clangStdenv.mkDerivation (rec {
      stdenv = pkgs.clangStdenv;
      src = inputs.neovide-src;

      nativeBuildInputs = with pkgs;
        [
          makeWrapper
          pkg-config
          python3 # skia
          removeReferencesTo
          cargo
          rustc
        ]
        ++ lib.optionals stdenv.isDarwin [xcbuild];

      inherit SKIA_SOURCE_DIR;
      SKIA_GN_COMMAND = "${pkgs.gn}/bin/gn";
      SKIA_NINJA_COMMAND = "${pkgs.ninja}/bin/ninja";

      buildInputs = with pkgs;
        [
          SDL2
          fontconfig
          rustPlatform.bindgenHook
        ]
        ++ lib.optionals stdenv.isDarwin [
          darwin.apple_sdk.frameworks.AppKit
        ];

      buildPhase = ''
        mkdir -p .cargo
        cp ${custom-neovide-deps}/config.toml .cargo/config.toml
        cargo build --release --locked
      '';

      installPhase = ''
        mkdir -p $out/bin
        cp target/release/neovide $out/bin/neovide
      '';

      postFixup = let
        libPath = lib.makeLibraryPath (with pkgs; [
          libglvnd
          libxkbcommon
          xorg.libXcursor
          xorg.libXext
          xorg.libXrandr
          xorg.libXi
          wayland
        ]);
      in ''
        # library skia embeds the path to its sources
        remove-references-to -t "$SKIA_SOURCE_DIR" \
          $out/bin/neovide

        wrapProgram $out/bin/neovide \
          --prefix LD_LIBRARY_PATH : ${libPath}
      '';

      postInstall = ''
        for n in 16x16 32x32 48x48 256x256; do
          install -m444 -D "assets/neovide-$n.png" \
            "$out/share/icons/hicolor/$n/apps/neovide.png"
        done
        install -m444 -Dt $out/share/icons/hicolor/scalable/apps assets/neovide.svg
        install -m444 -Dt $out/share/applications assets/neovide.desktop
      '';

      disallowedReferences = [SKIA_SOURCE_DIR];
    }
    // custom-neovide-name);
in {
  home.packages = with pkgs; [zig fzf custom-neovide]; # zig for treesitter, fzf for telescope

  programs.neovim = {
    enable = true;
    package = pkgs.neovim-nightly;
    extraPackages = with pkgs; [tree-sitter nodejs ripgrep fd unzip];
  };

  xdg.configFile.nvim = {
    source = ./config;

    recursive = true;
  };
}
