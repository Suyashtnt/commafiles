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
          "," = "command_mode";

          "A-." = "goto_previous_buffer";
          "A-minus" = "goto_next_buffer";
          "A-w" = ":buffer-close";
          "A-/" = "repeat_last_motion";
        };
      };
    };
  };
}

