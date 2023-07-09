(local wk (require :which-key))
(local reg wk.register)

(local flash (require :flash))
(local flash-helpers (require :flash_helpers))

(reg {
      :s [#(flash-helpers.TwoJump) "Jump"]  
      :S [#(flash.jump) "Treesitter jump"]})  
