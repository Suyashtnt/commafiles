{
  pkgs,
  inputs,
  ...
}: {
  boot = {
    loader = {
      grub = {
        enable = true;
        version = 2;
        efiSupport = true;
        device = "nodev";
        useOSProber = true;
        theme = inputs.grub-theme + "/src/catppuccin-mocha-grub-theme";
      };
      efi = {
        canTouchEfiVariables = true;
        efiSysMountPoint = "/boot/efi";
      };
    };

    extraModprobeConfig = "options kvm_intel nested=1";
    supportedFilesystems = ["ntfs"];

    kernelModules = ["kvm-intel"];
    kernelPackages = pkgs.linuxPackages_latest;
  };
}
