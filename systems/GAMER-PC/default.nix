{pkgs, ...}: {
  users.users.tntman = {
    isNormalUser = true;
    description = "Tabiasgeee Human";
    extraGroups = ["networkmanager" "wheel" "scanner" "lp" "docker"];
    initialPassword = "password"; # Change this with passwd
    shell = pkgs.nushell;
  };

  networking.hostName = "GAMER-PC";

  #  networking.interfaces.eth0.ipv4.addresses = [{
  #    address = "192.168.0.110";
  #  }];

  time.timeZone = "Africa/Johannesburg";
  i18n.defaultLocale = "en_ZA.UTF-8";

  programs.xwayland.enable = true;

  services = {
    xserver = {
      layout = "za";
      xkbVariant = "";
    };

    gnome = {
      glib-networking.enable = true;
      gnome-keyring.enable = true;
    };

    udev.packages = with pkgs; [
      gnome.gnome-settings-daemon
    ];

    onedrive.enable = true;
    usbmuxd.enable = true;
    avahi.enable = true;
    avahi.nssmdns = true;
    flatpak.enable = true;
    openssh.enable = true;
    jellyfin.enable = true;
    gvfs.enable = true;
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
