(fn config []
  (local catppuccin (require :catppuccin))
  (local integrations {:fidget true
                       :leap true
                       :lsp_saga true
                       :neotree true
                       :notify true
                       :treesitter_context true
                       :treesitter true
                       :ts_rainbow2 true
                       :harpoon true
                       :which_key true})
  (catppuccin.setup {: integrations :term_colors true}))

[{1 :catppuccin/nvim :name :catppuccin : config :priority 1000}]
