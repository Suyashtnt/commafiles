{ ... }: {
  services.vaultwarden = {
    enable = true;
    config = {
      ROCKET_PORT = 8080;
    };
  };
}
