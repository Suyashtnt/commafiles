# Specifies how environment variables are:
# - converted from a string to a value on Nushell startup (from_string)
# - converted from a value back to a string when running external commands (to_string)
# Note: The conversions happen *after* config.nu is loaded
$env.ENV_CONVERSIONS = {
  "PATH": {
    from_string: { |s| $s | split row (char esep) | path expand -n }
    to_string: { |v| $v | path expand -n | str join (char esep) }
  }
  "Path": {
    from_string: { |s| $s | split row (char esep) | path expand -n }
    to_string: { |v| $v | path expand -n | str join (char esep) }
  }
}

# Directories to search for scripts when calling source or use
#
# By default, <nushell-config-dir>/scripts is added
$env.NU_LIB_DIRS = [
    ($nu.config-path | path dirname | path join 'scripts')
]

# Directories to search for plugin binaries when calling register
#
# By default, <nushell-config-dir>/plugins is added
$env.NU_PLUGIN_DIRS = [
    ($nu.config-path | path dirname | path join 'plugins')
]

$env.WLR_NO_HARDWARE_CURSORS = 1
$env.LIBVA_DRIVER_NAME = 'nvidia'

mkdir ~/.local/share/atuin/
atuin init nu | save -f ~/.local/share/atuin/init.nu
## Temporary fix for Nushell deprecating --redirect-stderr
## https://github.com/atuinsh/atuin/pull/1913/commits/4c564aca2f385d38f26c13f5b4aeeee318dce0d4
open ~/.local/share/atuin/init.nu | str replace --all 'run-external --redirect-stderr atuin search' 'run-external atuin search' | save -f ~/.local/share/atuin/init.nu;
open ~/.local/share/atuin/init.nu | str replace --all '| complete | $in.stderr | str substring ..-1)' 'e>| str trim)' | save -f ~/.local/share/atuin/init.nu;
