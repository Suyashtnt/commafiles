{pkgs, ...}: {
  environment = {
    variables = {
      NIXOS_OZONE_WL = "1";
      __GL_GSYNC_ALLOWED = "0";
      __GL_VRR_ALLOWED = "0";
      DISABLE_QT5_COMPAT = "0";
      ANKI_WAYLAND = "1";
      DIRENV_LOG_FORMAT = "";
      WLR_DRM_NO_ATOMIC = "1";
      QT_WAYLAND_DISABLE_WINDOWDECORATION = "1";
      QT_QPA_PLATFORMTHEME = "qt5ct";
      QT_STYLE_OVERRIDE = "kvantum";
      MOZ_ENABLE_WAYLAND = "1";
      WLR_BACKEND = "vulkan";
      WLR_NO_HARDWARE_CURSORS = "1";
      XDG_SESSION_TYPE = "wayland";
      CLUTTER_BACKEND = "wayland";
      WLR_DRM_DEVICES = "/dev/dri/card1:/dev/dri/card0";
    };
    loginShellInit = ''
      eval $(ssh-agent)
      export GPG_TTY=$TTY
    '';
    systemPackages = [
      pkgs.libsForQt5.qt5.qtwayland
      pkgs.qt6.qtwayland
    ];
  };

  xdg.portal = {
    enable = true;
  };
  
  security = {
    # allow wayland lockers to unlock the screen
    pam.services.swaylock.text = "auth include login";
  };
}
