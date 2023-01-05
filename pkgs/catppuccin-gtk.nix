{ lib
, stdenvNoCC
, fetchFromGitHub
, gtk3
, pkgs
, gnome-themes-extra
, gtk-engine-murrine
, sassc
, tweaks ? [ ]
, size ? "standard"
}:
let
  validSizes = [ "standard" "compact" ];
  validTweaks = [ "nord" "dracula" "black" "rimless" "normal" ];

  unknownTweaks = lib.subtractLists validTweaks tweaks;
  illegalMix = (lib.elem "nord" tweaks) && (lib.elem "dracula" tweaks);

  assertIllegal = lib.assertMsg (!illegalMix) ''
    Tweaks "nord" and "dracula" cannot be mixed. Tweaks: ${toString tweaks}
  '';

  assertSize = lib.assertMsg (lib.elem size validSizes) ''
    You entered a wrong size: ${size}
    Valid sizes are: ${toString validSizes}
  '';

  assertUnknown = lib.assertMsg (unknownTweaks == [ ]) ''
    You entered wrong tweaks: ${toString unknownTweaks}
    Valid tweaks are: ${toString validTweaks}
  '';

  requiredPackages = p: with p; [
    (
      p.buildPythonPackage rec {
        pname = "catppuccin";
        version = "1.1.1";
        src = p.fetchPypi {
          inherit pname version;
          sha256 = "sha256-mHNuV3yIuFL2cixDOr+//+/b9iD2fN82cfLzZkegxKc=";
        };
        doCheck = false;
      }
    )
  ];
in

assert assertIllegal;
assert assertSize;
assert assertUnknown;

stdenvNoCC.mkDerivation rec {
  pname = "catppuccin-gtk";
  version = "0.4.0";

  src = fetchFromGitHub {
    owner = "catppuccin";
    repo = "gtk";
    rev = "v${version}";
    sha256 = "sha256-OFJeuwRBjqIGdP1vPX431DtpkPYZPgvUw3KFBrIsWnE=";
    fetchSubmodules = true;
  };

  nativeBuildInputs = [ gtk3 sassc (pkgs.python3.withPackages requiredPackages) ];

  buildInputs = [ gnome-themes-extra ];

  propagatedUserEnvPkgs = [ gtk-engine-murrine ];

  postPatch = ''
    patchShebangs --build colloid/install.sh colloid/*
  '';

  installPhase = ''
    runHook preInstall

    export HOME=$(mktemp -d)

    python3 install.py all -a all -d $out/share/themes \
      ${lib.optionalString (size != "") "-s ${size}"} \
      ${lib.optionalString (tweaks != []) "--tweaks " + builtins.toString tweaks}

    runHook postInstall
  '';

  meta = with lib; {
    description = "Soothing pastel theme for GTK";
    homepage = "https://github.com/catppuccin/gtk";
    license = licenses.gpl3Plus;
    platforms = platforms.linux;
    maintainers = [ maintainers.fufexan ];
  };
}
