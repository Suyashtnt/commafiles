{pkgs, ...}: {
  users.users.tntman = {
    isNormalUser = true;
    description = "Tabiasgeee Human";
    extraGroups = ["networkmanager" "wheel" "scanner" "lp" "docker"];
    initialPassword = "password"; # Change this with passwd
    shell = pkgs.nushell;
  };
  nixpkgs.hostPlatform = "x86_64-linux";

  networking.hostName = "GAMER-PC";

  time.timeZone = "Africa/Johannesburg";
  i18n.defaultLocale = "en_ZA.UTF-8";

  programs.xwayland.enable = true;

  services = {
    xserver = {
      xkb = {
        layout = "za";
      };
    };

    gnome = {
      glib-networking.enable = true;
    };

    openssh = {
      enable = true;
      # require public key authentication for better security
      settings.PasswordAuthentication = false;
      settings.KbdInteractiveAuthentication = false;
      #settings.PermitRootLogin = "yes";
    };

    jellyfin.enable = true;
    usbmuxd.enable = true;
    avahi.enable = true;
    avahi.nssmdns4 = true;
    flatpak.enable = true;
    gvfs.enable = true;
  };

  programs.dconf.enable = true;

  virtualisation = {
    docker.enable = true;
  };

  environment.systemPackages = with pkgs; [
    vim # backup editor
    libimobiledevice
    gnome.adwaita-icon-theme
    cloudflared
    ifuse
    virt-manager
    xdg-desktop-portal-gtk
  ];
}
