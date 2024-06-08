{pkgs, ...}: {
  home.packages = [
    (pkgs.vesktop.override {
      withSystemVencord = false;
      electron = pkgs.electron_24;
    })
  ];
}
