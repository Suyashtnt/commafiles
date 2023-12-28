{ ... }: {
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
          y = "move_char_left";
          n = "move_visual_line_down";
          e = "move_visual_line_up";
          o = "move_char_right";
          
          # haul
          h = "yank";

          # jump
          j = "search_next";
          J = "search_prev";

          # breaK of word
          k = "move_next_word_end";
          K = "move_next_long_word_end";

          # line open
          l = "open_below";
          L = "open_above";

          "'" = "command_mode";

          "A-," = "goto_previous_buffer";
          "A-." = "goto_next_buffer";
          "A-w" = ":buffer-close";
          "A-/" = "repeat_last_motion";
        };
      };
    };
  };
}

