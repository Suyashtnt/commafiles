{pkgs, ...}: {
  programs = {
    direnv = {
      enable = true;
      nix-direnv.enable = true;
      # bugged, uses let-env
      enableNushellIntegration = false;
    };

    atuin = {
      enable = true;
      # bugged, let-env still being used
      enableNushellIntegration = false;
    };

    nushell = {
      enable = true;
      configFile.source = ./config/config.nu;
      envFile.source = ./config/env.nu;
    };
  };
}
