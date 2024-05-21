{...}: {
  perSystem = {
    config,
    pkgs,
    ...
  }: {
    devShells.default = pkgs.mkShell {
      packages = with pkgs; [
        yaml-language-server # yaml LSP
        alejandra # uncomprimising nix formatter
        marksman # markdown LSP
        nodejs
        nodePackages.typescript-language-server # typescript LSP for ags autocomplete
        sops
      ];
    };
  };
}
