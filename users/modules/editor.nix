# common cross-editor config
{lib, config, ...}:
let
  cfg = config.tntman.home.editor;
in
 {
  options.tntman.home.editor = {
    executable = lib.mkOption {
      type = lib.types.str;
      example = "\${pkgs.neovim}/bin/nvim";
      description = "The editor program.";
    };

    name = lib.mkOption {
      type = lib.types.str;
      example = "NeoVim";
      description = "The name of the editor.";
    };
  };
}
