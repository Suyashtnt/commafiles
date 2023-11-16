{pkgs, ...}: let
  cat-gtk = pkgs.catppuccin-gtk.override {
    variant = "mocha";
    accents = ["lavender"];
  };

  cat-folders = pkgs.catppuccin-papirus-folders.override {
    flavor = "mocha";
    accent = "lavender";
  };

  # TODO: figure out how this works
  cat-kvantum = pkgs.catppuccin-kvantum.override {
    variant = "Mocha";
    accent = "Lavender";
  };
in {
  gtk = {
    enable = true;
    theme = {
      name = "Catppuccin-Mocha-Standard-Lavender-Dark";
      package = cat-gtk;
    };
    iconTheme = {
      package = cat-folders;
      name = "Papirus-Dark";
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
    package = pkgs.catppuccin-cursors.mochaLavender;
    name = "Catppuccin-Mocha-Lavender-Cursors";
    size = 16;
  };

  home.pointerCursor.gtk.enable = true;
  home.packages = [
    cat-kvantum
  ];

  qt = {
    enable = true;
    platformTheme = "gtk";
    style.name = "kvantum";
    style.package = with pkgs; [
      libsForQt5.qtstyleplugin-kvantum
      qt6Packages.qtstyleplugin-kvantum
    ];
  };

  xdg.configFile."Kvantum/kvantum.kvconfig".text = ''
    [General]
    theme=Catppuccin-Mocha-Lavender
  '';

  xdg.configFile."Kvantum/Catppuccin-Mocha-Lavender".source = "${cat-kvantum}/share/Kvantum/Catppuccin-Mocha-Lavender";

  xdg.configFile."gtk-4.0/assets".source = "${cat-gtk}/share/themes/Catppuccin-Mocha-Standard-Lavender-Dark/gtk-4.0/assets";
  xdg.configFile."gtk-4.0/gtk.css".source = "${cat-gtk}/share/themes/Catppuccin-Mocha-Standard-Lavender-Dark/gtk-4.0/gtk.css";
  xdg.configFile."gtk-4.0/gtk-dark.css".source = "${cat-gtk}/share/themes/Catppuccin-Mocha-Standard-Lavender-Dark/gtk-4.0/gtk-dark.css";
}
