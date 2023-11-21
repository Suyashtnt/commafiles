{config, ...}: {
  programs.kitty = {
    enable = true;
    extraConfig = builtins.readFile ./kitty.conf;
  };

  tntman.home.terminal = {
    executable = "${config.programs.kitty.package}/bin/kitty";
    name = "kitty";
  };
}
