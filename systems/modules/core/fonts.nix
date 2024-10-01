{pkgs, ...}: {
  fonts = {
    enableDefaultPackages = true;
    packages = with pkgs; [
      (nerdfonts.override {fonts = ["JetBrainsMono"];})
      font-awesome
      noto-fonts
      noto-fonts-color-emoji
      noto-fonts-lgc-plus
      noto-fonts-cjk-sans
      inter
      emacs-all-the-icons-fonts
      hack-font
      recursive
      open-sans
    ];

    fontconfig = {
      defaultFonts = {
        sansSerif = ["Inter" "Noto Sans"];
        emoji = ["Noto Color Emoji"];
        monospace = ["ComicCodeLigatures Nerd Font" "JetBrainsMono Nerd Font"];
      };
    };
  };
}
