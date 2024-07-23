{pkgs, ...}: {
  time.timeZone = "Africa/Johannesburg";
  i18n.defaultLocale = "en_ZA.UTF-8";
  sdImage.compressImage = false;
  console.keyMap = "us";
  nixpkgs.config.allowUnsupportedSystem = true;
  nixpkgs.hostPlatform = "aarch64-linux";

  networking.hostName = "tau";
  networking.wireless.enable = false;

  users.users.tau = {
    isNormalUser = true;
    description = "The superior pi";
    extraGroups = ["networkmanager" "wheel" "scanner" "lp"];
    initialPassword = "password"; # Change this with passwd
    openssh.authorizedKeys.keys = [
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBzVQvEJjRAY51R49ytUC7RstLEWNELtlniyXXb7wZQe Suyashtnt@gmail.com"
    ];
    shell = pkgs.nushell;
  };

  qt.platformTheme = "kde";

  services.xserver.enable = true;
  services.xserver.videoDrivers = ["fbdev"];
  services.displayManager.defaultSession = "plasma";
  services.displayManager.sddm.enable = true;
  services.desktopManager.plasma6.enable = true;

  # systemd.services.btattach = {
  #   before = ["bluetooth.service"];
  #   after = ["dev-ttyAMA0.device"];
  #   wantedBy = ["multi-user.target"];
  #   serviceConfig = {
  #     ExecStart = "${pkgs.bluez}/bin/btattach -B /dev/ttyAMA0 -P bcm -S 3000000";
  #   };
  # };

  programs.dconf.enable = true;

  system = {
    stateVersion = "24.05";
  };

  services.openssh.enable = true;

  environment.systemPackages = with pkgs; [
    libraspberrypi
    raspberrypi-eeprom
    helix
  ];
}
