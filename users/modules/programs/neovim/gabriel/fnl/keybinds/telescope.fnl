;; Telescope binds

(local wk (require :which-key))
(local reg wk.register)

(reg {
      :<leader>f {
                    :name "file"
                    :f ["<cmd>Telescope find_files<cr>" "Find File"]
                    :r ["<cmd>Telescope oldfiles<cr>" "Recent Files"]
                    :g ["<cmd>Telescope live_grep<cr>" "Grep"]
                    :m ["<cmd>Telescope harpoon marks<cr>" "Harpoon marks"]
                    :b ["<cmd>Telescope buffers<cr>" "Buffers"]}})
