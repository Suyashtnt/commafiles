(local catppuccin (require :catppuccin))

(local integrations {
                     :fidget true
                     :leap true
                     :lsp_saga true
                     :neotree true
                     :notify true
                     :treesitter_context true
                     :treesitter true
                     :ts_rainbow2 true
                     :harpoon true
                     :which_key true})

(catppuccin.setup {:integrations integrations
                   :term_colors true})

(vim.api.nvim_cmd {:cmd :colorscheme :args ["catppuccin"]} {})
