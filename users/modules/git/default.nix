{pkgs, ...}: {
  home.packages = with pkgs; [
    openssl
    pinentry-qt
    gitui
    ghq
  ];

  programs.git = {
    enable = true;
    userName = "Suyashtnt";
    userEmail = "suyashtnt@gmail.com";
    extraConfig = {
      init = {defaultBranch = "main";};
      delta = {
        syntax-theme = "Nord";
        line-numbers = true;
      };
    };
    lfs.enable = true;
    delta.enable = true;
  };

  programs.gh = {
    enable = true;
  };

  programs.gpg.enable = true;

  services = {
    gpg-agent = {
      enable = true;
      pinentryFlavor = "qt";
    };
  };
}
