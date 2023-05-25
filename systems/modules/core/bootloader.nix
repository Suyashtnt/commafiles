{ pkgs
, inputs
, ...
}: {
  boot = {
    loader = {
      grub = {
        enable = true;
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
    supportedFilesystems = [ "ntfs" "mtpfs" ];

    kernelModules = [ "kvm-intel" ];
    kernelPackages = pkgs.linuxPackages_latest;
  };
}
