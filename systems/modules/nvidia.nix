{
  config,
  pkgs,
  ...
}: {
  hardware.nvidia = {
    modesetting.enable = true;
    open = false;
    powerManagement.enable = true;
    package = config.boot.kernelPackages.nvidiaPackages.stable;
  };

  hardware.graphics = {
    enable = true;
    package = config.boot.kernelPackages.nvidiaPackages.stable;
    extraPackages = [ pkgs.libvdpau-va-gl pkgs.mesa pkgs.mesa.drivers ];
  };
  
  boot.kernelModules = ["nvidia"];
  services.xserver.videoDrivers = ["nvidia"];
}
