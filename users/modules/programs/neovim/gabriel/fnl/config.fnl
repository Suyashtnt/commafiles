(tset vim.wo :relativenumber true)
(tset vim.wo :number true)
(tset vim.opt :guifont "ComicCodeLigatures Nerd Font:h12")
(tset vim.opt :mouse "a")
(tset vim.opt :clipboard :unnamedplus)
(tset vim.opt :linespace -4)

;; for nvim-ufo
(tset vim.o :foldcolumn :1)
(tset vim.o :foldlevel 99)
(tset vim.o :foldlevelstart 99)
(tset vim.o :foldenable true)

(tset vim.g :maplocalleader " m")

(tset vim.g :coq_settings {:auto_start :shut-up})

;; https://github.com/neovide/neovide/pull/1870 60 for wayland, else it breaks
(tset vim.g :neovide_refresh_rate 60)
(tset vim.g :neovide_transparency 0.4)

(tset vim.g :neovide_padding_top 0)
(tset vim.g :neovide_padding_bottom 0)
(tset vim.g :neovide_padding_left 0)
(tset vim.g :neovide_padding_right 0)

(tset vim.g :neovide_floating_blur_amount_x 10)
(tset vim.g :neovide_floating_blur_amount_y 10)

(require :plugins)