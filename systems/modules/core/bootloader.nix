{
  inputs,
  pkgs,
  lib,
  ...
}: {
  boot = {
    loader = {
      systemd-boot.enable = lib.mkForce false;
      grub = {
        enable = lib.mkDefault false; # enable when setting up/not securebooting
        efiSupport = true;
        device = "nodev";
        useOSProber = true;
      };
      efi = {
        canTouchEfiVariables = true;
        efiSysMountPoint = "/boot/efi";
      };
    };

    initrd.systemd.enable = true;

    extraModprobeConfig = "options kvm_intel nested=1";
    supportedFilesystems = ["ntfs" "mtpfs"];

    kernelModules = ["kvm-intel"];
    kernelPackages = pkgs.linuxKernel.packages.linux_6_11;

    plymouth = {
      enable = true;
    };
  };
}
