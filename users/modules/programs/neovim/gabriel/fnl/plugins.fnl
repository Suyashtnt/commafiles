(local lazy (require :lazy))
(local setup lazy.setup)

(setup [
        :rktjmp/hotpot.nvim
        { 1 :catppuccin/nvim
          :name "catppuccin"
          :config #(require :plugins.catppuccin)
          :priority 1000}
        { 1 :folke/which-key.nvim
          :dependencies [ :mrjones2014/legendary.nvim
                          :mrjones2014/smart-splits.nvim]
          :config #(require :keybinds)}
        { 1 :beauwilliams/focus.nvim
          :config #((. (require :focus) :setup))}
        { 1 :mrjones2014/smart-splits.nvim
          :config #((. (require :smart-splits) :setup))}
        { 1 :nvim-telescope/telescope.nvim
          :dependencies [:nvim-lua/plenary.nvim]
          :config #(require :plugins.telescope)}
        { 1 :nvim-neo-tree/neo-tree.nvim
          :branch :v2.x
          :dependencies [
                          :nvim-tree/nvim-web-devicons
                          :nvim-lua/plenary.nvim
                          :MunifTanjim/nui.nvim]
          :config #(vim.cmd "let g:neo_tree_remove_legacy_commands = 1")}
        { 1 :rcarriga/nvim-notify
          :config #(set vim.notify (require :notify))}
        { 1 :nvim-treesitter/nvim-treesitter
          :dependencies [
                          :nvim-treesitter/nvim-treesitter-context
                          :HiPhish/nvim-ts-rainbow2]
          :config #(require :plugins.treesitter)}
        { 1 :ggandor/leap.nvim
          :config #((. (require :leap) :add_default_mappings))}
        { 1 :neovim/nvim-lspconfig
          :dependencies [
                          :ms-jpq/coq_nvim
                          :ms-jpq/coq.artifacts
                          :ms-jpq/coq.thirdparty
                          :j-hui/fidget.nvim
                          :nvim-tree/nvim-web-devicons
                          :nvimdev/lspsaga.nvim
                          :nvim-treesitter/nvim-treesitter
                          :smjonas/inc-rename.nvim
                          :stevearc/dressing.nvim
                          :stevearc/aerial.nvim
                          :ray-x/lsp_signature.nvim
                          :kevinhwang91/nvim-ufo
                          :kevinhwang91/promise-async]
          :config #(require :plugins.lsp)}])
