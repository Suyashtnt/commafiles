{...}: {
  sound.enable = false; # Pipewire doesn't like this on
  hardware.pulseaudio.enable = false;

  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;

    jack.enable = true;
  };

  security.rtkit.enable = true;
}
