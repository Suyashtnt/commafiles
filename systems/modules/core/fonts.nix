{pkgs, ...}: {
  fonts = {
    enableDefaultFonts = true;
    fonts = with pkgs; [
      (nerdfonts.override {fonts = ["JetBrainsMono"];})
      font-awesome
      emacs-all-the-icons-fonts
      inter
    ];

    fontconfig = {
      defaultFonts = {
        sansSerif = ["Inter"];
        monospace = ["ComicCodeLigatures Nerd Font" "JetBrainsMono Nerd Font"];
      };
    };
  };
}
