(local wkeys
       {:<leader> {:<leader> ["<cmd>Telescope find_files<cr>" "Find File"]
                   :b ["<cmd>Telescope buffers<cr>" "Find Buffer"]}
        :<leader>f {
                      :name "file"
                      :f ["<cmd>Telescope find_files<cr>" "Find File"]
                      :r ["<cmd>Telescope oldfiles<cr>" "Recent Files"]
                      :g ["<cmd>Telescope live_grep<cr>" "Grep"]
                      :m ["<cmd>Telescope harpoon marks<cr>" "Harpoon marks"]
                      :b ["<cmd>Telescope buffers<cr>" "Buffers"]}})

[{1 :nvim-telescope/telescope.nvim
  :dependencies [:nvim-lua/plenary.nvim]
  :opts {}
  : wkeys}]
