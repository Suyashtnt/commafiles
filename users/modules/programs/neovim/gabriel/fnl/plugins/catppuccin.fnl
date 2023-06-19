(local catppuccin (require :catppuccin))

(catppuccin.setup {:intergrations intergrations})

(vim.api.nvim_cmd {:cmd :colorscheme :args ["catppuccin"]} {})
