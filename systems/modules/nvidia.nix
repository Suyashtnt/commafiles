{
  config,
  pkgs,
  ...
}:{
  environment = {
    variables = {
      GBM_BACKEND = "nvidia-drm";
      __GLX_VENDOR_LIBRARY_NAME = "nvidia";
      VDPAU_DRIVER = "va_gl";
      LIBVA_DRIVER_NAME = "nvidia";
    };
  };

  hardware.nvidia = {
    open = false;
    modesetting.enable = true;
    powerManagement.enable = true;
    package = config.boot.kernelPackages.nvidiaPackages.beta;
  };
  

  hardware.opengl = {
    enable = true;
    driSupport = false;
    package = config.boot.kernelPackages.nvidiaPackages.beta;
    extraPackages = [ pkgs.libvdpau-va-gl ];
  };
  
  services.xserver.videoDrivers = ["nvidia"];
}
