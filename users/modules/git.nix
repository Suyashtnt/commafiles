{pkgs, ...}: {
  home.packages = with pkgs; [
    openssl
    gitui
    gh
    jujutsu
  ];

  programs.git = {
    enable = true;
    userName = "Suyashtnt";
    userEmail = "suyashtnt@gmail.com";
    package = pkgs.gitFull;
    extraConfig = {
      init = {defaultBranch = "main";};

      difftool = { prompt = false; tool = "difftastic"; };
      "difftool \"difftastic\"" = {
        cmd = ''difft "$LOCAL" "$REMOTE"'';
      };

      credential = {
        credentialStore = "secretservice";
        helper = "${pkgs.git-credential-manager}/bin/git-credential-manager";
      };

      # Sign commits
      commit.gpgsign = true;
      gpg.format = "ssh";
      gpg.ssh.allowedSignersFile = "~/.ssh/allowed_signers";
      user.signingkey = "~/.ssh/id_ed25519.pub";
    };
    lfs.enable = true;
    difftastic = {
      enable = true;
      background = "dark";
    };
  };

  programs.gpg.enable = true;

  services = {
    gpg-agent = {
      enable = true;
      pinentryPackage = pkgs.pinentry-gnome3;
      defaultCacheTtl = 1800;
      maxCacheTtl = 7200;
    };
  };
}
