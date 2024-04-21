{ pkgs, config, lib, ... }: {
  # sops required to run this anyways
  sops.secrets."lastfm/key" = {
    owner = config.systemd.services.navidrome.serviceConfig.User;
    restartUnits = [ "navidrome.service" ];
  };
  sops.secrets."lastfm/secret" = {
    owner = config.systemd.services.navidrome.serviceConfig.User;
    restartUnits = [ "navidrome.service" ];
  };
  sops.templates."navidrome-config.toml" = {
    content = ''
      MusicFolder = "/mnt/BulkStorage/Music"
      Address = "192.168.1.42"
      LastFM.Enabled = true
      LastFM.ApiKey = "${config.sops.placeholder."lastfm/key"}"
      LastFM.Secret = "${config.sops.placeholder."lastfm/secret"}"
      EnableSharing = true
      EnableExternalServices = true
      Scanner.GroupAlbumReleases = true
    '';
    owner = config.users.users.navidrome.name;
  };

  services.navidrome = {
    enable = true;
    openFirewall = true;
  };

  systemd.services.navidrome = {
    after = lib.mkForce [ "network.target" "sops-nix.service" ];

    serviceConfig.BindReadOnlyPaths = [
      # navidrome uses online services to download additional album metadata / covers
      "${config.environment.etc."ssl/certs/ca-certificates.crt".source}:/etc/ssl/certs/ca-certificates.crt"
      builtins.storeDir
      "/etc"
      "/mnt/BulkStorage/Music"
      "/run/secrets-rendered"
    ];
    serviceConfig.DynamicUser = lib.mkForce false;
    serviceConfig.User = config.users.users.navidrome.name;
    serviceConfig.ExecStart = lib.mkForce "${pkgs.navidrome}/bin/navidrome --configfile ${config.sops.templates."navidrome-config.toml".path}";
  };

  users.users.navidrome = {
    name = "navidrome";
    home = "/var/lib/navidrome";
    homeMode = "777";
    createHome = true;
    isSystemUser = true;
    group = "navidrome";
    extraGroups = [ "wheel" "users" ];
  };
  users.groups.navidrome = {};
}
