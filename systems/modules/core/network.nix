{ hostname, ... }: {
  networking = {
    firewall = {
      enable = false;
      allowedTCPPorts = [ 443 80 22 631 ];
      allowedUDPPorts = [ 443 80 631 ];
    };

    hostName = hostname;
    networkmanager.enable = true;
    nameservers = [ "1.1.1.1" "8.8.8.8" ];
  };
}
