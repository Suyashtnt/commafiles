# This file was generated by nvfetcher, please do not modify it manually.
{ fetchgit, fetchurl, fetchFromGitHub, dockerTools }:
{
  cavalier = {
    pname = "cavalier";
    version = "2023.8.1";
    src = fetchFromGitHub {
      owner = "NickvisionApps";
      repo = "Cavalier";
      rev = "2023.8.1";
      fetchSubmodules = false;
      sha256 = "sha256-ITmGXHTxcWpW43Ppye69W2FkFjjZrgL4R1g9svGvqm0=";
    };
  };
  fennel-ls = {
    pname = "fennel-ls";
    version = "364d02b90de6e41c40fc31a19665cad20041c63a";
    src = fetchgit {
      url = "https://git.sr.ht/~xerool/fennel-ls";
      rev = "364d02b90de6e41c40fc31a19665cad20041c63a";
      fetchSubmodules = false;
      deepClone = false;
      leaveDotGit = false;
      sha256 = "sha256-SAu/i3g1jXMCq/gE9nwxvWQ2eE8qGB4mxvVIzypmVOw=";
    };
    date = "2023-09-03";
  };
}