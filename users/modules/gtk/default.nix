{ self
, pkgs
, lib
, config
, packages
, inputs
, ...
}:
{
  gtk = {
    enable = true;
    theme = {
      name = "Catppuccin-Mocha-Standard-Sapphire-Dark";
      package = packages.catppuccin-gtk;
    };
    iconTheme = {
      package = packages.catppuccin-folders;
      name = "Papirus";
    };
    font = {
      name = "Inter";
      size = 13;
    };
    gtk4.extraConfig = {
      gtk-xft-antialias = 1;
      gtk-xft-hinting = 1;
      gtk-xft-hintstyle = "hintslight";
      gtk-xft-rgba = "rgb";
    };
    gtk3.extraConfig = {
      gtk-xft-antialias = 1;
      gtk-xft-hinting = 1;
      gtk-xft-hintstyle = "hintslight";
      gtk-xft-rgba = "rgb";
    };
    gtk2.extraConfig = ''
      gtk-xft-antialias=1
      gtk-xft-hinting=1
      gtk-xft-hintstyle="hintslight"
      gtk-xft-rgba="rgb"
    '';
  };

  # cursor theme
  home.pointerCursor = {
    package = packages.catppuccin-cursors;
    name = "Catppuccin-Mocha-Lavendar";
    size = 16;
  };
  home.pointerCursor.gtk.enable = true;

  # credits: bruhvko
  # catppuccin theme for qt-apps
  home.packages = with pkgs; [ libsForQt5.qtstyleplugin-kvantum ];

  xdg.configFile."Kvantum/catppuccin/catppuccin.kvconfig".source = builtins.fetchurl {
    url = "https://raw.githubusercontent.com/catppuccin/Kvantum/main/src/Catppuccin-Mocha-Sapphire/Catppuccin-Mocha-Sapphire.kvconfig";
    sha256 = "0n9f5hysr4k1sf9fd3sgd9fvqwrxrpcvj6vajqmb5c5ji8nv2w3c";
  };

  xdg.configFile."Kvantum/catppuccin/catppuccin.svg".source = builtins.fetchurl {
    url = "https://raw.githubusercontent.com/catppuccin/Kvantum/main/src/Catppuccin-Mocha-Sapphire/Catppuccin-Mocha-Sapphire.svg";
    sha256 = "1hq9h34178h0d288hgwb0ngqnixz24m9lk0ahc4dahwqn77fndwf";
  };

  xdg.configFile."Kvantum/kvantum.kvconfig".text = ''
    [General]
    theme=catppuccin

    [Applications]
    catppuccin=Dolphin, dolphin, Nextcloud, nextcloud, qt5ct, org.kde.dolphin, org.kde.kalendar, kalendar, Kalendar, qbittorrent, org.qbittorrent.qBittorrent
  '';

  xdg.configFile."gtk-4.0/assets" = {
    source = "${packages.catppuccin-gtk}/share/themes/Catppuccin-Mocha-Standard-Sapphire-Dark/gtk-4.0/assets";
    recursive = true;
  };
  xdg.configFile."gtk-4.0/gtk.css".source = "${packages.catppuccin-gtk}/share/themes/Catppuccin-Mocha-Standard-Sapphire-Dark/gtk-4.0/gtk.css";
  xdg.configFile."gtk-4.0/gtk-dark.css".source = "${packages.catppuccin-gtk}/share/themes/Catppuccin-Mocha-Standard-Sapphire-Dark/gtk-4.0/gtk-dark.css";
}
