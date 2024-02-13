{
  buildDotnetModule,
  src,
  version,
  pname,
  lib,
  gtk4,
  libadwaita,
  blueprint-compiler,
  wrapGAppsHook,
  dotnet-sdk_8,
  dotnet-runtime_8,
  makeDesktopItem,
  copyDesktopItems,
  ...
}:
buildDotnetModule rec {
  inherit src version pname;

  desktopItems = [(makeDesktopItem {
    name = "cavalier";
    desktopName = "Cavalier";
    icon = "cava";
    exec = "NickvisionCavalier.GNOME %u";
    comment = meta.description;
    categories = ["AudioVideo" "Audio" "Video"];
  })];

  meta = with lib; {
    description = "A gtk frontend for CAVA";
    homepage = "https://github.com/NickvisionApps/Cavalier";
    platforms = platforms.all;
    license = with licenses; [mit];
  };

  runtimeDeps = [
    gtk4
    libadwaita
  ];

  nativeBuildInputs = [
    gtk4
    libadwaita
    blueprint-compiler
    wrapGAppsHook
    copyDesktopItems
  ];

  dotnet-sdk = dotnet-sdk_8;
  dotnet-runtime = dotnet-runtime_8;
  executables = ["NickvisionCavalier.GNOME"];
  selfContainedBuild = true;
  nugetDeps = ./deps.nix;
  dontWrapGApps = false;

  projectFile = "NickvisionCavalier.GNOME/NickvisionCavalier.GNOME.csproj";
}
