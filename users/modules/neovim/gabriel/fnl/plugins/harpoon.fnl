(local telescope (require :telescope))
(local harpoon (require :harpoon))

(harpoon.setup {
                :tabline true})

(telescope.load_extension :harpoon)
