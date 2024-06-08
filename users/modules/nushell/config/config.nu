module completions {
}

# Get just the extern definitions without the custom completion commands
use completions *

let stheme = {
    "base": {
        "background": "#060516",
        "foreground": "#d4d5f2"
    },
    "base00": "#060516",
    "base01": "#09081b",
    "base02": "#141327",
    "base03": "#2b2b41",
    "base04": "#60607a",
    "base05": "#dadbf8",
    "base06": "#e7e8ff",
    "base07": "#aaa8ff",
    "base08": "#ab8be3",
    "base09": "#ea9d00",
    "base0A": "#ff5d66",
    "base0B": "#27b892",
    "base0C": "#00c2ba",
    "base0D": "#acaaff",
    "base0E": "#44a8e7",
    "base0F": "#45455d",
    "overlay": {
        "background": "#141327",
        "foreground": "#e7e8ff"
    },
    "primary": {
        "background": "#433889",
        "foreground": "#acaaff"
    },
    "secondary": {
        "background": "#004d85",
        "foreground": "#44a8e7"
    },
    "surface": {
        "background": "#09081b",
        "foreground": "#dadbf8"
    },
    "green": "#27b892",
    "mauve": "#ab8be3",
    "orange": "#ea9d00",
    "red": "#ff5d66",
    "subtle": "#45455d",
    "teal": "#00c2ba"
}

let theme = {
  separator: $stheme.overlay.foreground
  leading_trailing_space_bg: $stheme.overlay.foreground
  header: $stheme.primary.foreground
  date: $stheme.mauve
  filesize: $stheme.secondary.foreground
  row_index: $stheme.primary.foreground
  bool: $stheme.primary.foreground
  int: $stheme.primary.foreground
  duration: $stheme.primary.foreground
  range: $stheme.primary.foreground
  float: $stheme.primary.foreground
  string: $stheme.green
  nothing: $stheme.primary.foreground
  binary: $stheme.primary.foreground
  cellpath: $stheme.primary.foreground

  hints: dark_gray

  shape_garbage: { fg: $stheme.base.foreground bg: $stheme.red attr: b }
  shape_bool: $stheme.secondary.foreground
  shape_int: { fg: $stheme.mauve attr: b}
  shape_float: { fg: $stheme.mauve attr: b}
  shape_range: { fg: $stheme.orange attr: b}
  shape_internalcall: { fg: $stheme.secondary.foreground attr: b}
  shape_external: { fg: $stheme.secondary.foreground attr: b}
  shape_externalarg: $stheme.surface.foreground 
  shape_literal: $stheme.secondary.foreground
  shape_operator: $stheme.orange
  shape_signature: { fg: $stheme.green attr: b}
  shape_string: $stheme.green
  shape_filepath: $stheme.orange
  shape_globpattern: { fg: $stheme.secondary.foreground attr: b}
  shape_variable: $stheme.surface.foreground
  shape_flag: { fg: $stheme.secondary.foreground attr: b}
  shape_custom: {attr: b}
}

# The default config record. This is where much of your global configuration is setup.
$env.config = {
  ls: {
    use_ls_colors: true # use the LS_COLORS environment variable to colorize output
    clickable_links: true # enable or disable clickable links. Your terminal has to support links.
  }
  rm: {
    always_trash: false # always act as if -t was given. Can be overridden with -p
  }
  table: {
    mode: rounded # basic, compact, compact_double, light, thin, with_love, rounded, reinforced, heavy, none, other
    index_mode: always # "always" show indexes, "never" show indexes, "auto" = show indexes when a table has "index" column
    header_on_separator: true
    trim: {
      methodology: wrapping # wrapping or truncating
      wrapping_try_keep_words: true # A strategy used by the 'wrapping' methodology
      truncating_suffix: "..." # A suffix used by the 'truncating' methodology
    }
  }

  explore: {
    help_banner: true
    exit_esc: true

    command_bar_text: '#C4C9C6'
    status_bar_background: {fg: '#1D1F21' bg: '#C4C9C6' }

    highlight: {bg: $stheme.orange fg: $stheme.base.background }

    table: {
      split_line: '#404040' 

      cursor: true

      line_index: true 
      line_shift: true
      line_head_top: true
      line_head_bottom: true

      show_head: true
      show_index: true
    }
  }

  history: {
    max_size: 10000 # Session has to be reloaded for this to take effect
    sync_on_enter: true # Enable to share history between multiple sessions, else you have to close the session to write history to file
    file_format: "plaintext" # "sqlite" or "plaintext"
  }
  completions: {
    case_sensitive: false # set to true to enable case-sensitive completions
    quick: true  # set this to false to prevent auto-selecting completions when only one remains
    partial: true  # set this to false to prevent partial filling of the prompt
    algorithm: "fuzzy"  # prefix or fuzzy
  }
  filesize: {
    metric: true # true => KB, MB, GB (ISO standard), false => KiB, MiB, GiB (Windows standard)
    format: "auto" # b, kb, kib, mb, mib, gb, gib, tb, tib, pb, pib, eb, eib, zb, zib, auto
  }
  color_config: $theme   # if you want a light theme, replace `$dark_theme` to `$light_theme`
  use_grid_icons: true
  footer_mode: "25" # always, never, number_of_rows, auto
  float_precision: 2
  buffer_editor: "nvim" # command that will be used to edit the current line buffer with ctrl+o, if unset fallback to $env.EDITOR and $env.VISUAL
  use_ansi_coloring: true
  edit_mode: vi # emacs, vi
  shell_integration: {
      # osc2 abbreviates the path if in the home_dir, sets the tab/window title, shows the running command in the tab/window title
      osc2: true
      # osc7 is a way to communicate the path to the terminal, this is helpful for spawning new tabs in the same directory
      osc7: true
      # osc8 is also implemented as the deprecated setting ls.show_clickable_links, it shows clickable links in ls output if your terminal supports it. show_clickable_links is deprecated in favor of osc8
      osc8: true
      # osc9_9 is from ConEmu and is starting to get wider support. It's similar to osc7 in that it communicates the path to the terminal
      osc9_9: false
      # osc133 is several escapes invented by Final Term which include the supported ones below.
      # 133;A - Mark prompt start
      # 133;B - Mark prompt end
      # 133;C - Mark pre-execution
      # 133;D;exit - Mark execution finished with exit code
      # This is used to enable terminals to know where the prompt is, the command is, where the command finishes, and where the output of the command is
      osc133: true
      # osc633 is closely related to osc133 but only exists in visual studio code (vscode) and supports their shell integration features
      # 633;A - Mark prompt start
      # 633;B - Mark prompt end
      # 633;C - Mark pre-execution
      # 633;D;exit - Mark execution finished with exit code
      # 633;E - NOT IMPLEMENTED - Explicitly set the command line with an optional nonce
      # 633;P;Cwd=<path> - Mark the current working directory and communicate it to the terminal
      # and also helps with the run recent menu in vscode
      osc633: true
      # reset_application_mode is escape \x1b[?1l and was added to help ssh work better
      reset_application_mode: true
  }
  show_banner: false # true or false to enable or disable the banner
  render_right_prompt_on_last_line: false # true or false to enable or disable right prompt to be rendered on last line of the prompt.

  hooks: {
    pre_prompt: [{ ||
      null
    }]
    pre_execution: [{ ||
      null  # replace with source code to run before the repl input is run
    }]
    env_change: {
      PWD: [{|before, after|
        null  # replace with source code to run if the PWD environment is different since the last repl input
      }]
    }
    display_output: { ||
      if (term size).columns >= 100 { table -e } else { table }
    }
  }

  menus: [
      # Configuration for default nushell menus
      # Note the lack of souce parameter
      {
        name: completion_menu
        only_buffer_difference: false
        marker: "| "
        type: {
            layout: columnar
            columns: 4
            col_width: 20   # Optional value. If missing all the screen width is used to calculate column width
            col_padding: 2
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
      }
      # {
      #     name: ide_completion_menu
      #     only_buffer_difference: false
      #     marker: "| "
      #     type: {
      #         layout: ide
      #         min_completion_width: 0,
      #         max_completion_width: 50,
      #         # max_completion_height: 10, # will be limited by the available lines in the terminal
      #         padding: 0,
      #         border: false,
      #         cursor_offset: 0,
      #         description_mode: "prefer_right"
      #         min_description_width: 0
      #         max_description_width: 50
      #         max_description_height: 10
      #         description_offset: 1
      #     }
      #     style: {
      #         text: green
      #         selected_text: green_reverse
      #         description_text: yellow
      #     }
      # }
      {
        name: history_menu
        only_buffer_difference: true
        marker: "? "
        type: {
            layout: list
            page_size: 10
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
      }
      # {
      #     name: ide_completion_menu
      #     modifier: control
      #     keycode: char_n
      #     mode: [emacs vi_normal vi_insert]
      #     event: {
      #         until: [
      #             { send: menu name: ide_completion_menu }
      #             { send: menunext }
      #             { edit: complete }
      #         ]
      #     }
      # }      
      {
        name: help_menu
        only_buffer_difference: true
        marker: "? "
        type: {
            layout: description
            columns: 4
            col_width: 20   # Optional value. If missing all the screen width is used to calculate column width
            col_padding: 2
            selection_rows: 4
            description_rows: 10
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
      }
      # Example of extra menus created using a nushell source
      # Use the source field to create a list of records that populates
      # the menu
      {
        name: commands_menu
        only_buffer_difference: false
        marker: "# "
        type: {
            layout: columnar
            columns: 4
            col_width: 20
            col_padding: 2
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
        source: { |buffer, position|
            $nu.scope.commands
            | where name =~ $buffer
            | each { |it| {value: $it.name description: $it.usage} }
        }
      }
      {
        name: vars_menu
        only_buffer_difference: true
        marker: "# "
        type: {
            layout: list
            page_size: 10
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
        source: { |buffer, position|
            $nu.scope.vars
            | where name =~ $buffer
            | sort-by name
            | each { |it| {value: $it.name description: $it.type} }
        }
      }
      {
        name: commands_with_description
        only_buffer_difference: true
        marker: "# "
        type: {
            layout: description
            columns: 4
            col_width: 20
            col_padding: 2
            selection_rows: 4
            description_rows: 10
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
        source: { |buffer, position|
            $nu.scope.commands
            | where name =~ $buffer
            | each { |it| {value: $it.name description: $it.usage} }
        }
      }
  ]
  keybindings: [
    {
      name: completion_menu
      modifier: none
      keycode: tab
      mode: [emacs vi_normal vi_insert]
      event: {
        until: [
          { send: menu name: completion_menu }
          { send: menunext }
        ]
      }
    }
    {
      name: completion_previous
      modifier: shift
      keycode: backtab
      mode: [emacs, vi_normal, vi_insert] # Note: You can add the same keybinding to all modes by using a list
      event: { send: menuprevious }
    }
    {
      name: history_menu
      modifier: control
      keycode: char_r
      mode: emacs
      event: { send: menu name: history_menu }
    }
    {
      name: next_page
      modifier: control
      keycode: char_x
      mode: emacs
      event: { send: menupagenext }
    }
    {
      name: undo_or_previous_page
      modifier: control
      keycode: char_z
      mode: emacs
      event: {
        until: [
          { send: menupageprevious }
          { edit: undo }
        ]
      }
    }
    {
      name: yank
      modifier: control
      keycode: char_y
      mode: emacs
      event: {
        until: [
          {edit: pastecutbufferafter}
        ]
      }
    }
    {
      name: unix-line-discard
      modifier: control
      keycode: char_u
      mode: [emacs, vi_normal, vi_insert]
      event: {
        until: [
          {edit: cutfromlinestart}
        ]
      }
    }
    {
      name: kill-line
      modifier: control
      keycode: char_k
      mode: [emacs, vi_normal, vi_insert]
      event: {
        until: [
          {edit: cuttolineend}
        ]
      }
    }
    # Keybindings used to trigger the user defined menus
    {
      name: commands_menu
      modifier: control
      keycode: char_t
      mode: [emacs, vi_normal, vi_insert]
      event: { send: menu name: commands_menu }
    }
    {
      name: vars_menu
      modifier: alt
      keycode: char_o
      mode: [emacs, vi_normal, vi_insert]
      event: { send: menu name: vars_menu }
    }
    {
      name: commands_with_description
      modifier: control
      keycode: char_s
      mode: [emacs, vi_normal, vi_insert]
      event: { send: menu name: commands_with_description }
    }
  ]
}

def --env get-env [name] { $env | get $name }
def --env set-env [name, value] { load-env { $name: $value } }
def --env unset-env [name] { hide-env $name }

let null_completer = {|spans: list<string>| null }

let zoxide_completer = {|spans: list<string>|
  $spans | skip 1 | zoxide query -l ...$in | lines | where {|x| $x != $env.PWD } | if ($in | default [] | is-empty) { null } else { $in }
}

let fish_completer = {|spans: list<string>|
    fish --command $'complete "--do-complete=($spans | str join " ")"'
    | $"value(char tab)description(char newline)" + $in
    | from tsv --flexible --no-infer
    | if ($in | default [] | is-empty) { null } else { $in }
}

let carapace_completer = {|spans: list<string>|
  carapace $spans.0 nushell ...$spans | from json | if ($in | default [] | is-empty) { null } else { $in }
}

let specialized_completer = {|spans: list<string>|
    match $spans.0 {
      __zoxide_z => $zoxide_completer
      __zoxide_zi => $zoxide_completer
      _ => $null_completer
    } | do $in $spans
}

def multiple_completers [spans: list<string>] {
  let expanded_alias = (scope aliases | where name == $spans.0 | get -i 0 | get -i expansion)

  let spans = if $expanded_alias != null {
      $spans
      | skip 1
      | prepend ($expanded_alias | split row ' ')
  } else {
      $spans
  }

  let specialized_completer_result = do $specialized_completer $spans
  if $specialized_completer_result != null {
    return $specialized_completer_result
  }

  let fish_completer_result = do $fish_completer $spans
  if $fish_completer_result != null {
    return $fish_completer_result
  }

  let carapace_completer_result = do $carapace_completer $spans
  if $carapace_completer_result != null {
    return $carapace_completer_result
  }

  $null_completer
}

let completer = {|spans: list<string>| multiple_completers $spans }

$env.config.completions.external = {
  enable: true
  max_results: 100
  completer: $completer
}

let cachixExists = ("/etc/cachix-agent.token" | path exists)

$env.SSH_AUTH_SOCK = /run/user/1000/keyring/ssh 

if $cachixExists {
  open /etc/cachix-agent.token | lines | parse "{name}={value}" | reduce -f {} { |it, acc| $acc | upsert $it.name $it.value } | load-env
}
