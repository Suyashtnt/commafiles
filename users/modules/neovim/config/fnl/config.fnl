(tset vim.wo :relativenumber true)
(tset vim.wo :number true)
(tset vim.opt :guifont
      "Comic Code Ligatures,ComicCodeLigatures Nerd Font,JetBrainsMono Nerd Font Mono:h13")

(tset vim.opt :mouse :a)
(tset vim.opt :clipboard :unnamedplus)
(tset vim.opt :linespace 1)

;; for nvim-ufo
(tset vim.o :foldcolumn :1)
(tset vim.o :foldlevel 99)
(tset vim.o :foldlevelstart 99)
(tset vim.o :foldenable true)

(tset vim.g :maplocalleader " m")
(tset vim.g :mapleader " ")

(tset vim.g :coq_settings {:auto_start :shut-up})

;; https://github.com/neovide/neovide/pull/1870 60 for wayland, else it breaks
(tset vim.g :neovide_refresh_rate 60)
(tset vim.g :neovide_transparency 0.6)

(tset vim.g :neovide_padding_top 0)
(tset vim.g :neovide_padding_bottom 0)
(tset vim.g :neovide_padding_left 0)
(tset vim.g :neovide_padding_right 0)

(tset vim.g :neovide_floating_blur_amount_x 10)
(tset vim.g :neovide_floating_blur_amount_y 10)

(local plugins (require :plugins))
(local plugins-folder (.. (vim.fn.stdpath :config) :/fnl/plugins))

(when (vim.loop.fs_stat plugins-folder)
  (each [file (vim.fs.dir plugins-folder)]
    (set-forcibly! file (file:match "^(.*)%.fnl$"))
    (let [plugin-spec (require (.. :plugins. file))]
      (each [_ spec (ipairs plugin-spec)]
        (table.insert plugins spec)))))

(fn wrap-init [current-init wkeys]
  (if current-init
      (current-init))
  (let [which-key (require :which-key)
        wkeys (if (= (type wkeys) :function)
                  (wkeys)
                  wkeys)]
    (if wkeys
        (which-key.register wkeys))))

(fn wrap-wk [specs]
  (each [_ spec (ipairs specs)]
    (if spec.wkeys
        (let [current-init spec.init]
          (tset spec :init #(wrap-init current-init spec.wkeys)))))
  specs)

(local lazy (require :lazy))
(lazy.setup (wrap-wk plugins))
