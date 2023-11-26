(fn config []
  (vim.cmd "let g:neo_tree_remove_legacy_commands = 1")
  (local neo-tree (require :neo-tree))
  (neo-tree.setup {:popup_border_style :rounded}))

(local wkeys {:<leader>p ["<cmd>Neotree toggle position=float<cr>"
                          "File explorer"]})

[{1 :nvim-neo-tree/neo-tree.nvim
  :branch :v3.x
  :dependencies [:nvim-tree/nvim-web-devicons
                 :nvim-lua/plenary.nvim
                 :MunifTanjim/nui.nvim]
  : config
  : wkeys}]
