[:rktjmp/hotpot.nvim
 :editorconfig/editorconfig-vim
 :kaarmu/typst.vim
 :wakatime/vim-wakatime

 {1 :eraserhd/parinfer-rust
  :build "nix-shell --run \"cargo build --release \""}

 {1 :mrjones2014/legendary.nvim
  :priority 100000
  :opts {:extensions {:lazy_nvim {:enable true :auto_register true}
                      :smart_splits {:enable true}
                      :which_key {:auto_register true}}}
  :lazy false}

 {1 :folke/which-key.nvim
  :dependencies [:mrjones2014/smart-splits.nvim]
  :opts {}
  :config #(require :keybinds)}

 {1 :numToStr/Comment.nvim :config #((. (require :Comment) :setup))}

 {1 :mrjones2014/smart-splits.nvim
  :config #((. (require :smart-splits) :setup))}

 {1 :nvim-focus/focus.nvim :version "*" :opts {:enable true}}

 {1 :nvim-telescope/telescope.nvim
  :dependencies [:nvim-lua/plenary.nvim]
  :opts {}}

 {1 :s1n7ax/nvim-window-picker
  :name :window-picker
  :event :VeryLazy
  :version :2.*
  :config #((. (require :window-picker) :setup))}

 {1 :nvim-neo-tree/neo-tree.nvim
  :branch :v3.x
  :dependencies [:nvim-tree/nvim-web-devicons
                 :nvim-lua/plenary.nvim
                 :MunifTanjim/nui.nvim]
  :config #(vim.cmd "let g:neo_tree_remove_legacy_commands = 1"
                    ((. (require :neo-tree) :setup) {:popup_border_style :rounded}))}

 ;; Folke you absolute madlad for creating lazy, which-key, trouble, AND this
 {1 :folke/flash.nvim
  ;; @type Flash.Config
  :opts {}}]

