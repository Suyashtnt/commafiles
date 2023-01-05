{ lib
, stdenv
, fetchzip
, ...
}:
stdenv.mkDerivation rec {
  pname = "cattpuccin-cursors";
  version = "0.2.0";

  src = fetchzip {
    url = "https://github.com/catppuccin/cursors/releases/download/v0.2.0/Catppuccin-Mocha-Lavender-Cursors.zip";
    sha256 = "sha256-j9G/4FX8yh4LC8cPpHfDozS68bal4w/VhPgGw2wbW4Q=";
  };

  installPhase = ''
    mkdir -p $out/share/icons/Catppuccin-Mocha-Lavendar
    cp -va index.theme cursors $out/share/icons/Catppuccin-Mocha-Lavendar
  '';

  meta = {
    description = "Soothing pastel mouse cursors";
    homepage = "https://github.com/catppuccin/cursors";
    license = lib.licenses.gpl3;
    platforms = lib.platforms.unix;
  };
}
