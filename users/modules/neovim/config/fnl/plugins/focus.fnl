(local wkeys
       {:<leader> {:r [:<cmd>FocusToggle<cr> "Toggle automatic split resizing"]
                   :s [:<cmd>FocusSplitNicely<cr>
                       "Split window based on golden ratio"]}})

[{1 :nvim-focus/focus.nvim :version "*" :opts {:enable true} : wkeys}]
