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

    sunshine = {
      enable = true;
      capSysAdmin = true;
      openFirewall = true;
    };

    jellyfin.enable = true;
    usbmuxd.enable = true;
    avahi.enable = true;
    avahi.nssmdns4 = true;
    flatpak.enable = true;
    gvfs.enable = true;
  };

  programs.dconf.enable = true;
  programs.wshowkeys.enable = true;

  virtualisation = {
    podman = {
      enable = true;
      dockerCompat = true;
      defaultNetwork.settings.dns_enabled = true;
    };
  };

  environment.systemPackages = with pkgs; [
    vim # backup editor
    libimobiledevice
    adwaita-icon-theme
    cloudflared
    ifuse
    virt-manager
    xdg-desktop-portal-gtk
  ];
}
