(local wkeys {
              :<leader>k [:<cmd>Legendary<cr> "Keybind explorer"]
              :k [:gk "Go up"]
              :j [:gj "Go down"]
              :<C-Space> {1 "<C-\\><C-n>" 2 "Exit terminal mode" :mode :t}
              :<C-d> ["<C-d>zz" "Half page down"]
              :<C-u> ["<C-u>zz" "Half page up"]})

[{1 :mrjones2014/legendary.nvim
  :priority 100000
  :opts {:extensions {:lazy_nvim {:enable true :auto_register true}
                      :smart_splits {:enable true}
                      :which_key {:auto_register true}}}
  :lazy false
  : wkeys}
 {1 :folke/which-key.nvim
  :dependencies [:mrjones2014/smart-splits.nvim]
  :opts {:plugins {:spelling {:enabled true}} :ignore_missing true}}]
