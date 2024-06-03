# Edit this configuration file to define what should be installed on
# your system.  Help is available in the configuration.nix(5) man page
# and in the NixOS manual (accessible by running ‘nixos-help’).

{ config, pkgs, ... }:

{
  networking.hostName = "EVIL-LAPTOP"; # Define your hostname.

  # Set your time zone.
  time.timeZone = "Africa/Johannesburg";

  # Select internationalisation properties.
  i18n.defaultLocale = "en_US.UTF-8";

  # Configure keymap in X11
  services.xserver.xkb = {
    layout = "us";
  };

  # Enable touchpad support (enabled default in most desktopManager).
  services.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.tntman = {
    isNormalUser = true;
    description = "Suyash";
    extraGroups = ["networkmanager" "wheel" "scanner" "lp" "docker"];
    packages = with pkgs; [
      firefox
    ];
    shell = pkgs.nushell;
  };

  environment.systemPackages = with pkgs; [
    vim 
    helix
  ];

  services = {
    usbmuxd.enable = true;
    avahi.enable = true;
    avahi.nssmdns4 = true;
    flatpak.enable = true;
    openssh.enable = true;
    gvfs.enable = true;
  };

  services.upower.enable = true;

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It‘s perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "23.11"; # Did you read the comment?
}
