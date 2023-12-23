(fn config []
  (let [telescope (require :telescope)
        harpoon (require :harpoon)]
    (harpoon.setup {:tabline true})
    (telescope.load_extension :harpoon)))

(local wkeys #(let [harpoon (require :harpoon)
                    list #(harpoon:list)
                    ui harpoon.ui
                    select (fn [n] (: (list) :select n))]
                {:<leader>m {:name :+harpoon
                             :a [#(: (list) :append) "Add file"]
                             :m [#(ui:toggle_quick_menu (list))
                                 "Toggle quick menu"]
                             :1 [#(select 1) "Goto file 1"]
                             :2 [#(select 2) "Goto file 2"]
                             :3 [#(select 3) "Goto file 3"]
                             :4 [#(select 4) "Goto file 4"]
                             :5 [#(select 5) "Goto file 5"]
                             :f ["<cmd>Telescope harpoon marks<cr>"
                                 "Harpoon marks"]}}))

[{1 :ThePrimeagen/harpoon
  :dependencies [:nvim-lua/plenary.nvim]
  :branch :harpoon2
  : config
  : wkeys}]
