{
  eval = {
    # Example target for writing a package.
    target = {
      args = [ "-f" "default.nix" ];
      installable = "nixosConfigurations.GAMER-PC.config.system.build.toplevel";
    };
    # Force thunks
    depth = 10;
    workers = 3;
  };
  formatting.command = "alejandra";
  options = {
    enable = true;
    target = {
      args = [ ];
      installable = ".#nixosConfigurations.GAMER-PC.options";
    };
    depth = 10;
  };
}
