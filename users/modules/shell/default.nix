{pkgs, ...}: {
  home.packages = with pkgs; [
    carapace
    fish # nushell completion partly relies on it
  ];

  programs = {
    direnv = {
      enable = true;
      nix-direnv.enable = true;
      enableNushellIntegration = true;
    };

    atuin = {
      enable = true;
      enableNushellIntegration = true;
    };

    zoxide = {
      enable = true;
      enableNushellIntegration = true;
    };

    nushell = {
      enable = true;
      configFile.source = ./config/config.nu;
      envFile.source = ./config/env.nu;
    };
  };
}
