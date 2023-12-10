(fn config []
  (let [lspsaga (require :lspsaga)]
    (lspsaga.setup {:ui {:kind ((. (require :catppuccin.groups.integrations.lsp_saga)
                                   :custom_kind))
                         :border :rounded}})))

(local wkeys {:<A-d> {1 "<cmd>Lspsaga term_toggle<cr>"
                      2 "Toggle terminal"
                      :mode [:n :t]}
              :g {:name :+LSP
                  :r ["<cmd>Lspsaga finder<CR>" "LSP Finder"]
                  :d ["<cmd>Lspsaga peek_definition<CR>"
                      "LSP Preview Definition"]
                  :D ["<cmd>Lspsaga goto_definition<CR>"
                      "LSP Go To Definition"]
                  :t ["<cmd>Lspsaga peek_type_definition<CR>"
                      "LSP Preview Type"]
                  :T ["<cmd>Lspsaga goto_type_definition<CR>" "LSP Go To Type"]}
              :K ["<cmd>Lspsaga hover_doc<CR>" "LSP Hover Doc"]
              :<leader>a ["<cmd>Lspsaga code_action<CR>" "LSP Code Action"]
              "]e" ["<cmd>Lspsaga diagnostic_jump_next<CR>"
                    "LSP Next Diagnostic"]
              "[e" ["<cmd>Lspsaga diagnostic_jump_prev<CR>"
                    "LSP Prev Diagnostic"]})

[{1 :nvimdev/lspsaga.nvim : config : wkeys}]
