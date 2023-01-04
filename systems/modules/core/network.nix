{
  pkgs,
  hostname,
  ...
}: {
  networking = {
    firewall = {
      enable = false;
      allowedTCPPorts = [443 80 22 631];
      allowedUDPPorts = [443 80 631];
    };

    hostName = hostname;
    networkmanager.enable = true;
  };
}
