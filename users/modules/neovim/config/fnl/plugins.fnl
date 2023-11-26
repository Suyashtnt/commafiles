[:rktjmp/hotpot.nvim
 :editorconfig/editorconfig-vim
 :kaarmu/typst.vim
 :wakatime/vim-wakatime

 {1 :eraserhd/parinfer-rust
  :build "nix-shell --run \"cargo build --release \""}

 {1 :numToStr/Comment.nvim :config #((. (require :Comment) :setup))}

 {1 :mrjones2014/smart-splits.nvim
  :config #((. (require :smart-splits) :setup))}

 {1 :s1n7ax/nvim-window-picker
  :name :window-picker
  :event :VeryLazy
  :version :2.*
  :config #((. (require :window-picker) :setup))}]


