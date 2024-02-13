{lib, config, pkgs, ... }: {
  tntman.home.editor = {
    executable = "${pkgs.helix}/bin/hx";    
    name = "Helix";
  };

  programs.helix = {
    enable = true;
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
        };
      };
      keys = {
        normal = {
          "A-." = "goto_previous_buffer";
          "A-minus" = "goto_next_buffer";
          "A-<" = "goto_previous_buffer";
          "A->" = "goto_next_buffer";
          "A-w" = ":buffer-close";
          "A-/" = "repeat_last_motion";
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
      };
    };
  };
}

