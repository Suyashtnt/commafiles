(require-macros :macros)

;; You can use the `colorscheme` macro to load a custom theme, or load it manually
;; via require. This is the default:

(set! background :dark)
(colorscheme catppuccin)

;; The set! macro sets vim.opt options. By default it sets the option to true
;; Appending `no` in front sets it to false. This determines the style of line
;; numbers in effect. If set to nonumber, line numbers are disabled. For
;; relative line numbers, set 'relativenumber`

(set! relativenumber)
(set! guifont "ComicCodeLigatures Nerd Font:h12")
(set! mouse "a")

;; The let option sets global, or `vim.g` options.
;; Heres an example with localleader, setting it to <space>m

(let! maplocalleader " m")

;; https://github.com/neovide/neovide/pull/1870
(let! neovide_refresh_rate 120)
(let! neovide_transparency 0.8)

(let! neovide_padding_top 0)
(let! neovide_padding_bottom 0)
(let! neovide_padding_left 0)
(let! neovide_padding_right 0)

(let! neovide_floating_blur_amount_x 10)
(let! neovide_floating_blur_amount_y 10)

;; map! is used for mappings
;; Heres an example, preseing esc should also remove search highlights

(map! [n] :<esc> :<esc><cmd>noh<cr> {:desc "No highlight escape"})

;; sometimes you want to modify a plugin thats loaded from within a module. For
;; this you can use the `after` function

(after :neorg
       {:load {:core.norg.dirman {:config {:workspaces {:main "~/neorg"}}}}})
