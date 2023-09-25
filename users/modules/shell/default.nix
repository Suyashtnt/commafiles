{
pkgs,
config,
lib,
...}: {
  home.packages = with pkgs; [
    carapace
    fish # nushell completion partly relies on it
  ];

  programs = {
    direnv = {
      enable = true;
      nix-direnv.enable = true;
      enableNushellIntegration = true;
    };

    atuin = {
      enable = true;
      enableNushellIntegration = true;
    };

    zoxide = {
      enable = true;
      enableNushellIntegration = true;
    };

    starship = {
      enable = true;
      enableNushellIntegration = true;
      settings = builtins.fromTOML (builtins.readFile ./config/starship.toml);
    };

    nushell = {
      enable = true;
      configFile.source = ./config/config.nu;
      envFile.source = ./config/env.nu;
      extraEnv = let
        envVars = config.home.sessionVariables;
        path = config.home.sessionPath;

        # exception for XCURSOR_PATH, where it needs to be replaced with $env.XCURSOR_PATH = ($env.XCURSOR_PATH | split row (char esep) | append "{path}");
        # where path is the original value of $env.XCURSOR_PATH with $XCURSOR_PATH${XCURSOR_PATH:+:} removed
        envVarList = builtins.mapAttrs (name: value: if name == "XCURSOR_PATH" then
          let
            path = lib.strings.removePrefix "$XCURSOR_PATH$\{XCURSOR_PATH:+:}" value;
          in
          ''$env.${name} = ($env.${name} | split row (char esep) | append "${path}")''
        else
          ''$env.${name} = ${toString value}''
        ) envVars;

        envVariables = builtins.concatStringsSep "\n" (builtins.attrValues envVarList);

        # format each path as $env.PATH = ($env.PATH | split row (char esep) | append "{path}");
        pathList = map (path: ''$env.PATH = ($env.PATH | split row (char esep) | append "${path}")'') path;
        pathVariables = builtins.concatStringsSep "\n" pathList;
      in
      builtins.concatStringsSep "\n" [envVariables pathVariables];
    };
  };
}
