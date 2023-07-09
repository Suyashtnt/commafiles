(local catppuccin (require :catppuccin))

(local intergrations {
                      :fidget true
                      :leap true
                      :lsp_saga true
                      :neotree true
                      :notify true
                      :treesitter_context true
                      :harpoon true
                      :which_key true})

(catppuccin.setup {:intergrations intergrations})

(vim.api.nvim_cmd {:cmd :colorscheme :args ["catppuccin"]} {})
