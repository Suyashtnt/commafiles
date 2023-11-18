(set vim.g.mapleader " ")

((. (require :legendary) :setup) {
                                  :which_key {:auto_register true}
                                  :extensions {:smart_splits {}}})

(local whichkeyOpts {})
((. (require :which-key) :setup) whichkeyOpts)

(require :keybinds.core)
(require :keybinds.flash)
(require :keybinds.harpoon)
;; init would be here
(require :keybinds.lsp)
(require :keybinds.telescope)
