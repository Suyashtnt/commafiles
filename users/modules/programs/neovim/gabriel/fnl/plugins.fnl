(local lazy (require :lazy))
(local setup lazy.setup)

(setup [
        :rktjmp/hotpot.nvim
        :editorconfig/editorconfig-vim

        { 1 :windwp/windline.nvim
          :dependencies [:lewis6991/gitsigns.nvim 
                         { 1 :catppuccin/nvim
                           :name "catppuccin"
                           :config #(require :plugins.catppuccin)
                           :priority 1000}]
          :config #(require :plugins.statusline)}

        { 1 :eraserhd/parinfer-rust 
          :build "nix-shell --run \"cargo build --release \""}

        { 1 :folke/which-key.nvim
          :dependencies [ :mrjones2014/legendary.nvim
                          :mrjones2014/smart-splits.nvim]
          :config #(require :keybinds)}

        { 1 :ThePrimeagen/harpoon 
          :dependencies [:nvim-lua/plenary.nvim]
          :config #(require :plugins.harpoon)}

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

        ;; Folke you absolute madlad for creating lazy, which-key, trouble, AND this
        { 1 :folke/flash.nvim
          ;; @type Flash.Config
          :opts {}}

        { 1 :neovim/nvim-lspconfig
          :dependencies [
                          :ms-jpq/coq_nvim
                          :ms-jpq/coq.artifacts
                          :github/copilot.vim ;; coq.thirdparty
                          :ms-jpq/coq.thirdparty
                          :jose-elias-alvarez/null-ls.nvim
                          :j-hui/fidget.nvim
                          :nvim-tree/nvim-web-devicons
                          :nvimdev/lspsaga.nvim
                          :nvim-treesitter/nvim-treesitter
                          :smjonas/inc-rename.nvim
                          :stevearc/dressing.nvim
                          :stevearc/aerial.nvim
                          :ray-x/lsp_signature.nvim
                          :kevinhwang91/nvim-ufo
                          :lukas-reineke/lsp-format.nvim
                          :kevinhwang91/promise-async]
          :config #(require :plugins.lsp)}])
