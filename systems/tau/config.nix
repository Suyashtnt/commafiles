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

  system = {
    stateVersion = "23.11";
  };

  services.openssh.enable = true;

  environment.systemPackages = with pkgs; [
    libraspberrypi
    raspberrypi-eeprom
    neovim
  ];
}
