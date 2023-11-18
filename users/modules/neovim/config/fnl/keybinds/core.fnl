;; Core misc binds

(local wk (require :which-key))
(local reg wk.register)
(local ufo (require :ufo))

(reg {
      :<leader> {
                  "<leader>" ["<cmd>Telescope find_files<cr>" "Find File"]
                  :b ["<cmd>Telescope buffers<cr>" "Find Buffer"]
                  :p ["<cmd>Neotree toggle position=float<cr>" "File explorer"]
                  :k ["<cmd>Legendary<cr>" "Keybind explorer"]
                  :o ["<cmd>AerialToggle<cr>" "Open code outline"]
                  :r ["<cmd>FocusToggle<cr>" "Toggle automatic split resizing"]
                  :s ["<cmd>FocusSplitNicely<cr>" "Split window based on golden ratio"]}
      :zR [#(ufo.openAllFolds) "Open all folds"]
      :zM [#(ufo.closeAllFolds) "Close all folds"]
      :k [:gk "Go up"]
      :j [:gj "Go down"]
      :<A-d> {1 "<cmd>Lspsaga term_toggle<cr>" 
              2 "Toggle terminal" 
              :mode [:n :t]}
      :<C-Space> ["<C-\\><C-n>" "Exit terminal mode"]
      :<C-d> ["<C-d>zz" "Half page down"]
      :<C-u> ["<C-u>zz" "Half page up"]})
