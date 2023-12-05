(fn config []
  ;; imports
  (local treesitter (require :nvim-treesitter.configs))
  (local context (require :treesitter-context))
  (local rainbow (require :rainbow-delimiters))
  (local rainbow-setup (require :rainbow-delimiters.setup))
  (local highlight {:enable true :additional_vim_regex_highlighting true})
  (local textobjects
         {:move {:enable true
                 :set_jumps true
                 :goto_next_start {"]m" "@function.outer"
                                   "]]" {:query "@indent.begin" :query_group :indents}}
                 :goto_next_end {"]M" "@function.outer"
                                 "][" {:query "@indent.begin" :query_group :indents}}
                 :goto_previous_start {"[m" "@function.outer"
                                       "[[" {:query "@indent.begin"
                                             :query_group :indents}}
                 :goto_previous_end {"[M" "@function.outer"
                                     "][" {:query "@indent.begin"
                                           :query_group :indents}}}})
  (local textsubject-keymaps
         {:<cr> :textsubjects-smart
          ";" :textsubjects-container-outer
          "," :textsubjects-container-inner})
  (local textsubjects {:enable true :keymaps textsubject-keymaps})
  ;; config
  (treesitter.setup {: highlight : textobjects : textsubjects})
  (context.setup)
  (local strat {"" rainbow.strategy.global :html rainbow.strategy.local})
  (rainbow-setup {:strategy strat}))

[{1 :nvim-treesitter/nvim-treesitter
  :dependencies [:nvim-treesitter/nvim-treesitter-context
                 :HiPhish/rainbow-delimiters.nvim
                 :nvim-treesitter/nvim-treesitter-textobjects
                 :RRethy/nvim-treesitter-textsubjects]
  : config}]
