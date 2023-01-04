{
  lib,
  stdenv,
  fetchzip,
  pkgs,
  ...
}:
stdenv.mkDerivation rec {
  pname = "cattpuccin-gtk";
  version = "0.4.0";

  src = fetchzip {
    url = "https://github.com/catppuccin/gtk/releases/download/v0.4.0/Catppuccin-Mocha-Standard-Lavender-Dark.zip";
    sha256 = "81Antym5Cfjw7c0gNJLZN6qyorsdjfGz/qyLGCEfyNM=";
    stripRoot = false;
  };

  propagatedUserEnvPkgs = with pkgs; [
    gnome.gnome-themes-extra
    gtk-engine-murrine
  ];

  installPhase = ''
    mkdir -p $out/share/themes/
    cp -r Catppuccin-Mocha-Standard-Lavender-Dark $out/share/themes
  '';

  meta = {
    description = "Soothing pastel theme for GTK3";
    homepage = "https://github.com/catppuccin/gtk";
    license = lib.licenses.gpl3;
    platforms = lib.platforms.unix;
  };
}
