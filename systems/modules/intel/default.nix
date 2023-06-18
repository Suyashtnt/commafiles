{pkgs, ...}: {
  hardware.opengl.extraPackages = with pkgs; [
    intel-compute-runtime
    intel-media-driver
    vaapiIntel
    vaapiVdpau
    libvdpau-va-gl
  ];

  services.xserver.videoDrivers = ["intel"];
  services.hardware.openrgb.motherboard = "intel";
}
