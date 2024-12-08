{pkgs, ...}: {
  fonts = {
    enableDefaultPackages = true;
    packages = with pkgs; [
      nerd-fonts.jetbrains-mono
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
        sansSerif = ["Recursive Sans Linear" "Inter"];
        emoji = ["Noto Color Emoji"];
        monospace = ["ComicCodeLigatures Nerd Font" "JetBrainsMono Nerd Font"];
      };
    };
  };
}
