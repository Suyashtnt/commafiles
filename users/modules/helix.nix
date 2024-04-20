{lib, config, pkgs, ... }: {
  tntman.home.editor = {
    executable = "${pkgs.helix}/bin/hx";    
    name = "Helix";
  };

  programs.helix = {
    enable = true;
    defaultEditor = true;
    languages = {
    };
    settings = {
      editor = {
        bufferline = "multiple";
        cursorline = true;
        line-number = "relative";
        true-color = true;

        cursor-shape = {
          insert = "bar";
          normal = "block";
          select = "underline";
        }; 

        lsp = {
          display-messages = true;
          display-inlay-hints = true;
        };
      };
      keys = {
        normal = {
          "A-<" = "goto_previous_buffer";
          "A->" = "goto_next_buffer";
          "A-w" = ":buffer-close";
          "A-/" = "repeat_last_motion";
          X = ["extend_line_up" "extend_to_line_bounds"];
          "A-x" = "extend_to_line_bounds";
          # move 6 down
          J = ["move_visual_line_down" "move_visual_line_down" "move_visual_line_down" "move_visual_line_down" "move_visual_line_down" "move_visual_line_down" ];
          # ditto
          K = ["move_visual_line_up" "move_visual_line_up" "move_visual_line_up" "move_visual_line_up" "move_visual_line_up" "move_visual_line_up" ];
        } // lib.optionalAttrs (config.programs.yazi.enable) {
          # edit file opener
          "space"."e" = ":run-shell-command zellij run -fc -- yazi --chooser-file /tmp/yazi-chooser-file";
          # open file
          "space"."o" = let
            yazi-chooser = pkgs.writeShellScriptBin "yazi-chooser" ''
              TEMP="/tmp/yazi-chooser-file"

              echo >> $TEMP
              while read -r line
              do
                echo "$line"
              done < "$TEMP"
            '';
          in [":new" ":insert-output ${yazi-chooser}/bin/yazi-chooser" "split_selection_on_newline" "goto_file" "goto_last_modification" "goto_last_modified_file" ":buffer-close!"];
        };

        select = {
          X = ["extend_line_up" "extend_to_line_bounds"];
          "A-x" = "extend_to_line_bounds";
        };
      };
    };
  };
}

