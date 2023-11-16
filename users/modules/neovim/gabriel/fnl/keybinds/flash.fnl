(local wk (require :which-key))
(local reg wk.register)

(local flash (require :flash))

(reg {
      :s [#(flash.jump) "Jump"]})  
