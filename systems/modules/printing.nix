{pkgs, ...}: {
  services.printing = {
    enable = true;
    drivers = [pkgs.epson-escpr];
  };

  hardware.sane.enable = true;
  hardware.sane.extraBackends = [pkgs.sane-airscan];
}
