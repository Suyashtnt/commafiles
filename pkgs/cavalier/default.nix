{
  buildDotnetModule,
  src,
  version,
  lib,
  gtk4,
  libadwaita,
  blueprint-compiler,
  wrapGAppsHook,
  dotnet-sdk_7,
  dotnet-runtime_7,
  makeDesktopItem,
  ...
}:
buildDotnetModule rec {
  inherit src version;
  pname = "cavalier";

  desktopItems = [
    (makeDesktopItem {
      name = "cavalier";
      exec = "NickvisionCavalier.GNOME";
      icon = "cava";
      desktopName = "Cavalier";
      comment = meta.description;
      categories = ["AudioVideo" "Audio" "Video"];
    })
  ];

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
  ];

  dotnet-sdk = dotnet-sdk_7;
  dotnet-runtime = dotnet-runtime_7;
  executables = ["NickvisionCavalier.GNOME"];
  selfContainedBuild = true;
  nugetDeps = ./deps.nix;
  dontWrapGApps = false;

  projectFile = "NickvisionCavalier.GNOME/NickvisionCavalier.GNOME.csproj";
}
