# common cross-terminal config
{lib, ...}: {
  options.tntman.home.terminal = {
    executable = lib.mkOption {
      type = lib.types.str;
      example = "\${pkgs.zsh}/bin/zsh";
      description = "The command to execute when opening a new terminal.";
    };

    name = lib.mkOption {
      type = lib.types.str;
      example = "zsh";
      description = "The name of the terminal.";
    };
  };
}
