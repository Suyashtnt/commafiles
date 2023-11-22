(fn config []
  (local telescope (require :telescope))
  (local harpoon (require :harpoon))
  (harpoon.setup {:tabline true})
  (telescope.load_extension :harpoon))

[{1 :ThePrimeagen/harpoon :dependencies [:nvim-lua/plenary.nvim] : config}]
