{pkgs, ...}: {
  security.pam.loginLimits = [
    # Unlimited amount of processes for root
    {
      domain = "root";
      item = "nproc";
      value = "unlimited";
    }
    # Unlimited open file descriptors
    {
      domain = "*";
      item = "nofile";
      value = "unlimited";
    }
  ];

  security.polkit.enable = true;
  
  services.udev.packages = with pkgs; [
    gnome-settings-daemon
  ];

  # add nushell to list of valid shells
  environment.shells = [ pkgs.nushell ];
}
