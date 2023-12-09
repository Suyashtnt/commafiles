{
  stdenv,
  luajit,
  fennel,
  src,
  version,
  pname,
  ...
}:
stdenv.mkDerivation {
  inherit src version pname;

  nativeBuildInputs = [
    luajit
    fennel
  ];

  installPhase = ''
    DESTDIR=$out PREFIX=$out make install
    install -Dm755 fennel-ls $out/bin/fennel-ls
  '';
}
