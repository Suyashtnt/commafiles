;; setup catppucinn before loading theme
(local intergrations {
                      :neotree true
                      :which_key true})

(tset vim.wo :relativenumber true)
(tset vim.wo :number true)
(tset vim.opt :guifont "ComicCodeLigatures Nerd Font:h12")
(tset vim.opt :mouse "a")

(tset vim.g :maplocalleader " m")

;; https://github.com/neovide/neovide/pull/1870
(tset vim.g :neovide_refresh_rate 120)
(tset vim.g :neovide_transparency 0.8)

(tset vim.g :neovide_padding_top 0)
(tset vim.g :neovide_padding_bottom 0)
(tset vim.g :neovide_padding_left 0)
(tset vim.g :neovide_padding_right 0)

(require :plugins)
