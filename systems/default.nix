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
          userHomeModules = ["tntman"];
        };
        tau = {
          userHomeModules = ["tau"];
        };
        EVIL-LAPTOP = {
          userHomeModules = ["tntman"];
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
