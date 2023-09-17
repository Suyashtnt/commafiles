{
  stdenv,
  luajit,
  fennel,
  src,
  version,
  ...
}:
stdenv.mkDerivation {
  inherit src version;
  pname = "fennel-ls";

  nativeBuildInputs = [
    luajit
    fennel
  ];

  installPhase = ''
    DESTDIR=$out PREFIX=$out make install
    install -Dm755 fennel-ls $out/bin/fennel-ls
  '';
}
