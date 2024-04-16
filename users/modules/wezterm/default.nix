{config, pkgs, ...}: {
  programs.wezterm = {
    enable = true;
    package = pkgs.wezterm-git;
    extraConfig = builtins.readFile ./wezterm.lua;
  };

  tntman.home.terminal = {
    executable = "${config.programs.wezterm.package}/bin/wezterm start --always-new-process";
    name = "wezterm";
  };
}
