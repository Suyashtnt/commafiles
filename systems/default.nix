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
      };
    };
  };

  flake = {
    images = {
      tau = config.nixosSystems.tau.config.system.build.sdImage;
    };
  };
}
