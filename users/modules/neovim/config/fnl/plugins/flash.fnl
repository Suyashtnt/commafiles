(local wkeys #(let [flash (require :flash)]
                {:s [#(flash.jump) "Flash Jump"]}))

[;; Folke you absolute madlad for creating lazy, which-key, trouble, AND this
 {1 :folke/flash.nvim
  ;; @type Flash.Config
  :opts {}
  :event :VeryLazy
  : wkeys}]
