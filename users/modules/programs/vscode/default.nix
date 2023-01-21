{ pkgs, ... }: {
  home.packages = with pkgs; [
    wakatime
  ];

  programs.vscode = {
    enable = true;
    extensions = with pkgs.vscode-extensions; [
      vscodevim.vim
      yzhang.markdown-all-in-one
      bbenoist.nix
      WakaTime.vscode-wakatime
      catppuccin.catppuccin-vsc
      mkhl.direnv
      dbaeumer.vscode-eslint
      eamodio.gitlens
      svelte.svelte-vscode
      denoland.vscode-deno
      lokalise.i18n-ally
      vadimcn.vscode-lldb
    ];
  };
}
