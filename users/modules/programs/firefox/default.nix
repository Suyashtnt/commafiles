{pkgs, ...}: {
  home.file.".mozilla/firefox/tntman/chrome/img" = {
    source = ./images;
    recursive = true;
  };

  programs.firefox = {
    enable = true;
    package = pkgs.firefox;
    profiles = {
      tntman = {
        id = 0;
        settings = {
          "general.smoothScroll" = true;
        };
        userChrome =
          import ./userChrome.nix {};
        extraConfig = ''
          user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
          user_pref("full-screen-api.ignore-widgets", true);
          user_pref("media.ffmpeg.vaapi.enabled", true);
          user_pref("media.rdd-vpx.enabled", true);
        '';
      };
    };
  };
}
