{
  inputs,
  pkgs,
  ...
}: let
  nur = import inputs.nur {
    nurpkgs = pkgs;
    inherit pkgs;
  };
in {
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
        extensions = with nur.repos.rycee.firefox-addons; [
          adnauseam
          augmented-steam
          enhanced-github
          enhancer-for-youtube
          honey
          refined-github
          return-youtube-dislikes
          sidebery
          stylus
          terms-of-service-didnt-read
          vimium
          vue-js-devtools
        ];
      };
    };
  };
}
