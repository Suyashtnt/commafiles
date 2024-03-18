{...}: {
  perSystem = {
    config,
    self',
    inputs',
    pkgs,
    ...
  }: {
    devShells.default = pkgs.mkShell {
      packages = with pkgs; [
        yaml-language-server # yaml LSP
        alejandra # uncomprimising nix formatter
        fnlfmt # fennel formatter
        fennel # fennel compiler
        config.packages.fennel-ls
        marksman # markdown LSP
        deno # deno LSP for ags transpiler
        nodejs
        nodePackages.typescript-language-server # typescript LSP for ags autocomplete
      ];
    };
  };
}
