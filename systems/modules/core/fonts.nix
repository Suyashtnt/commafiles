{pkgs, ...}: {
  fonts = {
    enableDefaultFonts = true;
    fonts = with pkgs; [
      (nerdfonts.override {fonts = ["JetBrainsMono"];})
      font-awesome
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
