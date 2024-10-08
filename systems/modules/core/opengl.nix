{pkgs, ...}: {
  hardware = {
    graphics = {
      enable = pkgs.lib.mkDefault true;
      extraPackages = with pkgs; [
        intel-compute-runtime
        intel-media-driver
        vaapiIntel
        vaapiVdpau
        libvdpau-va-gl
        nvidia-vaapi-driver
        libGL
      ];
    };
  };
}
