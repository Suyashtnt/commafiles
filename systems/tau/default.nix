{ pkgs, ... }: {
  time.timeZone = "Africa/Johannesburg";
  i18n.defaultLocale = "en_ZA.UTF-8";
  sdImage.compressImage = false;
  console.keyMap = "us";

  networking.hostName = "tau";
  networking.useDHCP = true;

  users.users.root = { 
    # use mkpasswd to generate
    initialHashedPassword = "$y$j9T$5nB/aaSZx9Om.bzBH73ZD1$kRXHNIB8nkDV/gfIq.pNO70KfMl4V57simxk6cGMXFC";
    openssh.authorizedKeys.keys = [ 
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBzVQvEJjRAY51R49ytUC7RstLEWNELtlniyXXb7wZQe Suyashtnt@gmail.com"
    ];
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
