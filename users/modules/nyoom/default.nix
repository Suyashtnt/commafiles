{ inputs, ... }: {
  programs.neovim = {
    enable = true;
    extraPackages = (with pkgs ;[ tree-sitter nodejs ripgrep fd unzip ]);
  }
}
