{pkgs, ...}: {
  home.packages = [
    (pkgs.vesktop.override {
      withSystemVencord = false;
    })
  ];
}
