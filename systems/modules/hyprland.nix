{...}: {
  nixpkgs.overlays = [
    inputs.xdg-desktop-portal-hyprland.overlays.default
  ];
  programs.hyprland.enable = true;
}
