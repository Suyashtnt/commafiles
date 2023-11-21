# common cross-shell config
{
  lib,
  config,
  ...
}: let
  cfg = config.tntman.home.shell;
in {
  options.tntman.home.shell = {
    executable = lib.mkOption {
      type = lib.types.str;
      example = "\${pkgs.zsh}/bin/zsh";
      description = "The command to execute the shell with.";
    };

    # shell aliases
    enableDefaultAliases = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = ''
        Whether to enable default aliases.
      '';
    };
  };

  config.home.shellAliases = lib.mkIf cfg.enableDefaultAliases {
    # it's sudover.
    sudover = "sudo -k";
  };
}
