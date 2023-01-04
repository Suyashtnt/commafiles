{pkgs, ...}: {
  users.users.tntman = {
    isNormalUser = true;
    description = "Tabiasgeee Human";
    extraGroups = ["networkmanager" "wheel" "scanner" "lp" "docker"];
    initialPassword = "password"; # Change this with passwd
    packages = with pkgs; [];
    shell = pkgs.nushell;
  };

  networking.hostName = "GAMER-PC";
  time.timeZone = "Africa/Johannesburg";
  i18n.defaultLocale = "en_ZA.UTF-8";

  programs.xwayland.enable = true;

  services = {
    xserver = {
      layout = "za";
      xkbVariant = "";
    };

    plex = {
      enable = true;
      openFirewall = true;
    };

    gnome = {
      glib-networking.enable = true;
      gnome-keyring.enable = true;
    };

    udev.packages = with pkgs; [
      gnome.gnome-settings-daemon
    ];

    usbmuxd.enable = true;
    avahi.enable = true;
    avahi.nssmdns = true;
    flatpak.enable = true;
    openssh.enable = true;
  };

  security = {
    # allow wayland lockers to unlock the screen
    pam.services.swaylock.text = "auth include login";
  };

  programs.dconf.enable = true;

  virtualisation = {
    docker.enable = true;
  };

  environment.systemPackages = with pkgs; [
    vim # backup editor
    nushell
    libimobiledevice
    gnome.adwaita-icon-theme
    ifuse
    virt-manager
    docker-client
  ];

  environment.variables = {
    FLAKE = "~/commafiles";
  };
}
