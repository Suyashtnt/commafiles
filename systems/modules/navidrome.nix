{ pkgs, config, ... }: {
  services.navidrome = {
    enable = true;
    openFirewall = true;
    settings = {
      MusicFolder = "/mnt/BulkStorage/Music";
      Address = "192.168.1.42"; #todo: not hard code this
      LastFM.Enabled = true;
      EnableSharing = true;
      Scanner.GroupAlbumReleases = true;
    };
  };

  systemd.services.navidrome = {
    after = pkgs.lib.mkForce [ "network.target" "sops-nix.service" ];
    serviceConfig.DynamicUser = pkgs.lib.mkForce false;
    serviceConfig.User = config.users.users.navidrome.name;

    serviceConfig.ExecStart = let
      settingsFormat = pkgs.formats.json {};
      cfg = config.services.navidrome;
    in pkgs.lib.mkForce (pkgs.writeShellScript "start-navidrome" ''
      export ND_LASTFM_APIKEY=$(cat ${config.sops.secrets."lastfm/key".path})
      export ND_LASTFM_SECRET=$(cat ${config.sops.secrets."lastfm/secret".path})
      ${cfg.package}/bin/navidrome --configfile ${settingsFormat.generate "navidrome.json" cfg.settings}
    '');
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
