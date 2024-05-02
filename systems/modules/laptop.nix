{ pkgs, ... }: {
  services = {
    upower.enable = true;
    blueman.enable = true;

    # for until https://github.com/NixOS/nixpkgs/pull/292115 has been merged
    pipewire.wireplumber.configPackages = [
    	(pkgs.writeTextDir "share/wireplumber/bluetooth.lua.d/51-bluez-config.lua" ''
    		bluez_monitor.properties = {
    			["bluez5.enable-sbc-xq"] = true,
    			["bluez5.enable-msbc"] = true,
    			["bluez5.enable-hw-volume"] = true,
    			["bluez5.headset-roles"] = "[ hsp_hs hsp_ag hfp_hf hfp_ag ]"
    		}
    	'')
    ];
  };

  hardware = {
    bluetooth = {
      enable = true;
      powerOnBoot = true;
      settings = {
        General = {
          Enable = "Source,Sink,Media,Socket";
        };
      };
    };
    pulseaudio.package = pkgs.pulseaudioFull;
    pulseaudio.extraConfig = "
      load-module module-switch-on-connect
    ";
  };
}
