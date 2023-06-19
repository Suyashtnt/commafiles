(local lazy (require :lazy))
(local setup lazy.setup)

(setup [
        :rktjmp/hotpot.nvim
        { 1 :catppuccin/nvim
          :name "catppuccin"
          :config (fn [] (require :plugins.catppuccin))
          :priority 1000}
        { 1 :folke/which-key.nvim
          :dependencies [:mrjones2014/legendary.nvim]
          :config (fn [] (require :keybinds))}])
