((. (require :legendary) :setup) {:which_key {:auto_register true}})

(local whichkeyOpts {})
((. (require :which-key) :setup) whichkeyOpts)

(require :keybinds.core)
