{
  config,
  ...
}: {
  ezConfigs = {
    nixos = {
      hostsDirectory = ./.;
      modulesDirectory = ./modules;

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
