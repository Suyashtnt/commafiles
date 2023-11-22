(fn config []
  ;; imports
  (local treesitter (require :nvim-treesitter.configs))
  (local context (require :treesitter-context))
  (local rainbow (require :rainbow-delimiters))
  (local rainbow-setup (require :rainbow-delimiters.setup))
  (local highlight {:enable true :additional_vim_regex_highlighting true})
  ;; config
  (treesitter.setup {: highlight})
  (context.setup)
  (local strat {"" rainbow.strategy.global :html rainbow.strategy.local})
  (rainbow-setup {:strategy strat}))

[{1 :nvim-treesitter/nvim-treesitter
  :dependencies [:nvim-treesitter/nvim-treesitter-context
                 :HiPhish/rainbow-delimiters.nvim]
  : config}]
