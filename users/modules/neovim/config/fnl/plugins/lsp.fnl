(fn config []
  (let [;; imports
        lspconfig (require :lspconfig)
        coq (require :coq)
        coq_3p (require :coq_3p)
        inc_rename (require :inc_rename)
        lsp-format (require :lsp-format)
        rust-tools (require :rust-tools)
        crates (require :crates) ;; server setup \/
        servers [:tsserver
                 :svelte
                 :unocss
                 :nil_ls
                 :fennel_ls
                 :lua_ls
                 :typst_lsp
                 :hls
                 :marksman]
        settings {:typst_lsp {:exportPdf :onType}}
        capabilities (vim.lsp.protocol.make_client_capabilities)]

    (fn on-attach [client _bufnr]
      (lsp-format.on_attach client))

    (set capabilities.textDocument.foldingRange
         {:dynamicRegistration false :lineFoldingOnly true})
    (each [_ lsp (ipairs servers)]
      (let [settings (if (not= (. settings lsp) nil) (. settings lsp) {})
            server (. lspconfig lsp)]
        (server.setup (coq.lsp_ensure_capabilities {: on-attach
                                                    : settings
                                                    : capabilities}))))
    (rust-tools.setup {:server (coq.lsp_ensure_capabilities {:on_attach on-attach
                                                             :settings {:rust-analyzer {:checkOnSave {:command :clippy}
                                                                                        :cargo {:sysroot :discover}}}
                                                             : capabilities})})
    ;; extra
    (inc_rename.setup)
    (lsp-format.setup)
    (coq_3p [{:src :copilot :short_name :COP :accept_key :<c-f>}])
    (crates.setup {:src {:coq {:enabled true :name :crates}}})))

(local wkeys {:<leader>r {1 #(.. ":IncRename " (vim.fn.expand :<cword>))
                          2 "LSP Code Action"
                          :expr true}})

[{1 :neovim/nvim-lspconfig
  :dependencies [:ms-jpq/coq_nvim
                 :ms-jpq/coq.artifacts
                 :ms-jpq/coq.thirdparty
                 :github/copilot.vim
                 :saecki/crates.nvim
                 :simrat39/rust-tools.nvim
                 :jose-elias-alvarez/null-ls.nvim
                 :nvim-tree/nvim-web-devicons
                 :nvim-treesitter/nvim-treesitter
                 :smjonas/inc-rename.nvim
                 :lukas-reineke/lsp-format.nvim
                 :kevinhwang91/promise-async]
  : config
  : wkeys}
 {1 :j-hui/fidget.nvim
  :opts {:notification {:override_vim_notify true
                        :window {:winblend 90 :border :rounded}}}}]
