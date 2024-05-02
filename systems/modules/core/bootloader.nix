{
  pkgs,
  ...
}: {
  boot = {
    loader = {
      grub = {
        enable = true;
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
    kernelPackages = pkgs.linuxPackages_latest;

    plymouth = {
      enable = true;
    };
  };
}
