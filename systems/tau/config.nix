{pkgs, config, ...}: {
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
    extraGroups = ["networkmanager" "wheel" "scanner" "lp" "gpio"];
    initialPassword = "password"; # Change this with passwd
    openssh.authorizedKeys.keys = [
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBzVQvEJjRAY51R49ytUC7RstLEWNELtlniyXXb7wZQe Suyashtnt@gmail.com"
    ];
    shell = pkgs.nushell;
  };

  # Create gpio group
  users.groups.gpio = {};

  # Change permissions gpio devices
  services.udev.extraRules = ''
    SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio",MODE="0660"
    SUBSYSTEM=="gpio", KERNEL=="gpiochip*", ACTION=="add", RUN+="${pkgs.bash}/bin/bash -c 'chown root:gpio /sys/class/gpio/export /sys/class/gpio/unexport ; chmod 220 /sys/class/gpio/export /sys/class/gpio/unexport'"
    SUBSYSTEM=="gpio", KERNEL=="gpio*", ACTION=="add",RUN+="${pkgs.bash}/bin/bash -c 'chown root:gpio /sys%p/active_low /sys%p/direction /sys%p/edge /sys%p/value ; chmod 660 /sys%p/active_low /sys%p/direction /sys%p/edge /sys%p/value'"
  '';

  services.udev.packages = [
    pkgs.openocd
  ];

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

  # cloudflared
  services.cloudflared = {
    enable = true;
    tunnels = {
      "d9b6c172-5236-4cfe-b441-10f2e83e5eb4" = {
         credentialsFile = "${config.sops.secrets."cloudflared/tau".path}";
         default = "http_status:404";       
      };
    };
  };

  sops.secrets."cloudflared/tau" = {
      # Both are "cloudflared" by default
      owner = config.services.cloudflared.user;
      group = config.services.cloudflared.group;
  };
}
