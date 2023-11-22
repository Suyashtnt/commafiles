(fn config []
 (local gitsigns (require :gitsigns))
 (local statusline (require :evil_line_2))

 ;; git intergration
 (gitsigns.setup)

 ;; global statusline
 (tset vim.opt :laststatus 3)
 ;; remove the line below
 (tset vim.opt :cmdheight 0)

 ;; basic statusline
 (local mocha ((. (require :catppuccin.palettes) :get_palette) :mocha))                                                                                                                                                                        	
 (statusline.setup mocha))

[{ 1 :windwp/windline.nvim
   :dependencies [:lewis6991/gitsigns.nvim] 
   :config config}]
