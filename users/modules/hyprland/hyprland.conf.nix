{ config, ... }: let
  theme = config.lib.stylix.colors;
in ''
  monitor=HDMI-A-3,preferred,0x0,1
  monitor=HDMI-A-2,preferred,1920x0,1

  workspace=HDMI-A-3,1

  input {
      kb_file=
      kb_layout=
      kb_variant=
      kb_model=
      kb_options=
      kb_rules=

      follow_mouse=1

      touchpad {
          natural_scroll=no
      }

      sensitivity=0 # -1.0 - 1.0, 0 means no modification.
  }

  general {
      gaps_in=5
      gaps_out=10
      border_size=3
      col.active_border=0xff${theme.base0D} 0xff${theme.base08} 0xff${theme.base0A} 60deg
      col.inactive_border=0x00${theme.base02}
      apply_sens_to_raw=0 # whether to apply the sensitivity to raw input (e.g. used by games where you aim using your mouse)
  }

  decoration {
      rounding=16

      blur {
        enabled=1
        size = 8
        passes = 4
      }

      drop_shadow=0
      shadow_range=12
      shadow_render_power=2
      col.shadow=0xff${theme.base0E}
      col.shadow_inactive=0xff${theme.base03}
  }

  bezier=OverShot,0.47,0.4,0.1,1.8
  bezier=MaterialStandard,0.2, 0.0, 0, 1.0
  bezier=MaterialEmphasizedDecelerate,0.05, 0.7, 0.1, 1.0
  bezier=MaterialEmphasizedAccelerate,0.3f, 0f, 0.8f, 0.15f

  animations {
      enabled=1

      animation=windowsIn,1,4,MaterialEmphasizedDecelerate,slide
      animation=windowsOut,1,3,MaterialEmphasizedAccelerate,slide
      animation=windowsMove,1,3,MaterialStandard,slide

      animation=border,1,2,MaterialStandard
      animation=fade,1,2,MaterialStandard
      animation=workspaces,1,5,OverShot,slide
  }

  dwindle {
      pseudotile=1 # enable pseudotiling on dwindle
      preserve_split=1
  }

  windowrule = opacity 0.8 0.8,^(Code)$
  windowrule = opacity 0.8 0.8,^(code-url-handler)$
  windowrule = noblur,^(org.nickvision.cavalier)$
  windowrule = opacity 0.99, obsidian

  exec-once=swww init
  exec-once=ags
  exec-once=swww img -t wipe --transition-angle 30 --transition-bezier 0.41,0.26,0.98,1 --transition-ttep 20 --transition-fps 60 --transition-duration 0.6 /home/tntman/commafiles/wallpapers/Particles.png
  exec=dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP=Hyprland

  # some nice mouse binds
  bindm=SUPER,mouse:272,movewindow
  bindm=SUPER,mouse:273,resizewindow

  # window management
  bind=SUPERSHIFT,C,killactive,
  bind=SUPER,V,togglefloating,
  bind=SUPERSHIFT,F,fullscreen,0

  # layout
  bind=SUPER,T,togglegroup
  bind=SUPER,H,changegroupactive,b
  bind=SUPER,L,changegroupactive,f
  bind=SUPER,F,togglesplit

  # utils
  bind=SUPER,Q,exec,${config.tntman.home.terminal.executable}
  bind=SUPERSHIFT,L,exec,swaylock
  bind=SUPERSHIFT,P,exec,nu -c 'spotify_player get key playback | from json | get item.external_urls.spotify | wl-copy; notify-send "copied current song to clipboard!"'

  # screenshot
  bind=SUPER,S,exec,screenshot
  bind=SUPERCTRL,S,exec,ocr
  bind=SUPERSHIFT,S,exec,grim - | wl-copy -t image/png && notify-send "Screenshot copied to clipboard!"

  # ags
  bind=SUPER,w,exec,ags -r 'togglePowerMode();'
  bind=SUPER,p,exec,ags -r 'toggleMusicOnly();'
  bind=SUPER,d,exec,ags -r 'toggleAppLauncher();'

  layerrule = blur, powermode-.*
  layerrule = blur, applauncher
  layerrule = blur, lyrics-terminal
  layerrule = ignorealpha 0.4, powermode-.*
  layerrule = ignorealpha 0.4, applauncher
  layerrule = ignorealpha 0.4, lyrics-terminal

  bind=SUPER,left,movefocus,l
  bind=SUPER,right,movefocus,r
  bind=SUPER,up,movefocus,u
  bind=SUPER,down,movefocus,d

  bind=SUPER,1,workspace,1
  bind=SUPER,2,workspace,2
  bind=SUPER,3,workspace,3
  bind=SUPER,4,workspace,4
  bind=SUPER,5,workspace,5
  bind=SUPER,6,workspace,6
  bind=SUPER,7,workspace,7
  bind=SUPER,8,workspace,8
  bind=SUPER,9,workspace,9
  bind=SUPER,0,workspace,10

  bind=SUPERSHIFT,1,movetoworkspace,1
  bind=SUPERSHIFT,2,movetoworkspace,2
  bind=SUPERSHIFT,3,movetoworkspace,3
  bind=SUPERSHIFT,4,movetoworkspace,4
  bind=SUPERSHIFT,5,movetoworkspace,5
  bind=SUPERSHIFT,6,movetoworkspace,6
  bind=SUPERSHIFT,7,movetoworkspace,7
  bind=SUPERSHIFT,8,movetoworkspace,8
  bind=SUPERSHIFT,9,movetoworkspace,9
  bind=SUPERSHIFT,0,movetoworkspace,10
  
  bind=SUPER,mouse_down,workspace,e+1
  bind=SUPER,mouse_up,workspace,e-1
''
