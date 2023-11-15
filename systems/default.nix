{config, ...}: {
  imports = [
    ./GAMER-PC
    ./tau
  ];

  flake = {
    images = {
      tau = config.nixosSystems.tau.config.system.build.sdImage;
    };
  };
}
