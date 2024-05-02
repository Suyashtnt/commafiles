{ ... }: {
  services = {
    batsignal = {
      enable = true;
      extraArgs = "-c 10 -w 35 -f 95";
    };

    mpris-proxy.enable = true;
  };
}
