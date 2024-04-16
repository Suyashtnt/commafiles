{
  pkgs,
  config,
  ...
}: {
  home.packages = with pkgs; [
    vscode
    wakatime
  ];
}
