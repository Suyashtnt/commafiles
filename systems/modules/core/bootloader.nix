{
  pkgs,
  inputs,
  ...
}: let
  catppuccin-plymouth-mocha = pkgs.catppuccin-plymouth.override {
    variant = "mocha";
  };
in {
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
    supportedFilesystems = ["ntfs" "mtpfs"];

    kernelModules = ["kvm-intel"];
    kernelPackages = pkgs.linuxPackages_latest;

    plymouth = {
      enable = true;
      logo = ./nix.png;
      theme = "catppuccin-mocha";
      themePackages = [catppuccin-plymouth-mocha];
    };
  };
}
