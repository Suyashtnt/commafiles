{inputs, ...}: {
  home-manager = {
    useGlobalPkgs = true;
    sharedModules = [
      inputs.sops-nix.homeManagerModules.sops
    ];
  };
}
