{
  config,
  ...
}: {
  ezConfigs = {
    nixos = {
      modulesDirectory = ./modules;
      configurationsDirectory = ./.;

      hosts = {
        GAMER-PC = {
          arch = "x86_64";
          userHomeModules = ["tntman"];
        };
        tau = {
          arch = "aarch64";
          userHomeModules = ["tau"];
        };
      };
    };
  };

  flake = {
    images = {
      tau = config.nixosSystems.tau.config.system.build.sdImage;
    };
  };
}
