;; LSP binds

(local wk (require :which-key))
(local reg wk.register)

(reg {
      :g {
            :name "+LSP"
            :r ["<cmd>Lspsaga finder<CR>" "LSP Finder"]
            :d ["<cmd>Lspsaga peek_definition<CR>" "LSP Preview Definition"]
            :D ["<cmd>Lspsaga goto_definition<CR>" "LSP Go To Definition"]
            :t ["<cmd>Lspsaga peek_type_definition<CR>" "LSP Preview Type"]
            :T ["<cmd>Lspsaga goto_type_definition<CR>" "LSP Go To Type"]}
      :K ["<cmd>Lspsaga hover_doc<CR>" "LSP Hover Doc"]
      "<leader>a" ["<cmd>Lspsaga code_action<CR>" "LSP Code Action"]
      "<leader>r" {1 #(.. ":IncRename " (vim.fn.expand :<cword>)) 2 "LSP Code Action" :expr true}
      "]e" ["<cmd>Lspsaga diagnostic_jump_next<CR>" "LSP Next Diagnostic"]
      "[e" ["<cmd>Lspsaga diagnostic_jump_prev<CR>" "LSP Prev Diagnostic"]})
