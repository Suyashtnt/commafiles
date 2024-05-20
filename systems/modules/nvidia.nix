{
  config,
  pkgs,
  ...
}: {
  hardware.nvidia = {
    modesetting.enable = true;
    powerManagement.enable = true;
    package = config.boot.kernelPackages.nvidiaPackages.stable;
  };

  hardware.opengl = {
    enable = true;
    driSupport = true;
    driSupport32Bit = true;
    package = config.boot.kernelPackages.nvidiaPackages.stable;
    extraPackages = [ pkgs.libvdpau-va-gl pkgs.mesa pkgs.mesa.drivers ];
  };
  
  boot.kernelModules = ["nvidia"];
  services.xserver.videoDrivers = ["nvidia"];
}
