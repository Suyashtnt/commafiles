{ inputs, pkgs, ... }: {
  home.packages = with pkgs; [ zig fzf neovide ]; # zig for treesitter, fzf for telescope

  programs.neovim = {
    enable = true;
    extraPackages = with pkgs; [ tree-sitter nodejs ripgrep fd unzip ];
  };

  xdg.configFile.nvim = {
    source = pkgs.buildEnv {
      name = "nyoom";
      paths = [
        inputs.nyoom-src
        { outPath = ./config; meta.priority = 4; }
      ];
    };
    recursive = true;
  };
}
