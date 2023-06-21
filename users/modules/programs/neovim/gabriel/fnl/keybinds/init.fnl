(set vim.g.mapleader " ")

((. (require :legendary) :setup) {
                                  :which_key {:auto_register true}
                                  :extensions {:smart_splits {}}})

(local whichkeyOpts {})
((. (require :which-key) :setup) whichkeyOpts)

(require :keybinds.lsp)
(require :keybinds.telescope)
(require :keybinds.core)
