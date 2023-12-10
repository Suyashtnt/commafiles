(fn config []
  (let [treesitter (require :nvim-treesitter.configs) ;; imports
        context (require :treesitter-context)
        rainbow (require :rainbow-delimiters)
        rainbow-setup (require :rainbow-delimiters.setup) ;; config
        highlight {:enable true :additional_vim_regex_highlighting true}
        textobjects {:move {:enable true
                            :set_jumps true
                            :goto_next_start {"]m" "@function.outer"
                                              "]]" {:query "@indent.begin"
                                                    :query_group :indents}}
                            :goto_next_end {"]M" "@function.outer"
                                            "][" {:query "@indent.begin"
                                                  :query_group :indents}}
                            :goto_previous_start {"[m" "@function.outer"
                                                  "[[" {:query "@indent.begin"
                                                        :query_group :indents}}
                            :goto_previous_end {"[M" "@function.outer"
                                                "][" {:query "@indent.begin"
                                                      :query_group :indents}}}}
        textsubject-keymaps {:<cr> :textsubjects-smart
                             ";" :textsubjects-container-outer
                             "," :textsubjects-container-inner}
        textsubjects {:enable true :keymaps textsubject-keymaps}
        strat {"" rainbow.strategy.global :html rainbow.strategy.local}]
    ;; config
    (treesitter.setup {: highlight : textobjects : textsubjects})
    (context.setup)
    (rainbow-setup {:strategy strat})))

[{1 :nvim-treesitter/nvim-treesitter
  :dependencies [:nvim-treesitter/nvim-treesitter-context
                 :HiPhish/rainbow-delimiters.nvim
                 :nvim-treesitter/nvim-treesitter-textobjects
                 :RRethy/nvim-treesitter-textsubjects]
  : config}]
