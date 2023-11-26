(fn config []
  ;; imports
  (local lspconfig (require :lspconfig))
  (local coq (require :coq))
  (local coq_3p (require :coq_3p))
  (local inc_rename (require :inc_rename))
  (local dressing (require :dressing))
  (local ufo (require :ufo))
  (local lspsaga (require :lspsaga))
  (local lsp-format (require :lsp-format))
  (local rust-tools (require :rust-tools))
  (local crates (require :crates))
  ;; server setup
  (local servers [:tsserver
                  :svelte
                  :unocss
                  :nil_ls
                  :fennel_ls
                  :lua_ls
                  :typst_lsp
                  :hls
                  :marksman])
  (local settings {:typst_lsp {:exportPdf :onType}})

  (fn on-attach [client bufnr]
    (local lsp_signature (require :lsp_signature))
    (lsp-format.on_attach client)
    (lsp_signature.on_attach {:bind true :handler_opts {:border :rounded}}
                             bufnr))

  (local capabilities (vim.lsp.protocol.make_client_capabilities))
  (set capabilities.textDocument.foldingRange
       {:dynamicRegistration false :lineFoldingOnly true})
  (each [_ lsp (ipairs servers)]
    (let [settings (if (not= (. settings lsp) nil) (. settings lsp) {})
          server (. lspconfig lsp)]
      (server.setup (coq.lsp_ensure_capabilities {: on-attach
                                                  : settings
                                                  : capabilities}))))
  (rust-tools.setup {:server (coq.lsp_ensure_capabilities {:on_attach on-attach
                                                           :settings {:rust-analyzer {:checkOnSave {:command :clippy}}}
                                                           : capabilities})})
  ;; ufo

  (fn handler [virt-text lnum end-lnum width truncate]
    (let [new-virt-text {}]
      (var suffix (: "  %d " :format (- end-lnum lnum)))
      (local suf-width (vim.fn.strdisplaywidth suffix))
      (local target-width (- width suf-width))
      (var cur-width 0)
      (each [_ chunk (ipairs virt-text)]
        (var chunk-text (. chunk 1))
        (var chunk-width (vim.fn.strdisplaywidth chunk-text))
        (if (> target-width (+ cur-width chunk-width))
            (table.insert new-virt-text chunk)
            (do
              (set chunk-text (truncate chunk-text (- target-width cur-width)))
              (local hl-group (. chunk 2))
              (table.insert new-virt-text [chunk-text hl-group])
              (set chunk-width (vim.fn.strdisplaywidth chunk-text))
              (when (< (+ cur-width chunk-width) target-width)
                (set suffix
                     (.. suffix
                         (: " " :rep (- (- target-width cur-width) chunk-width)))))
              (lua :break)))
        (set cur-width (+ cur-width chunk-width)))
      (table.insert new-virt-text [suffix :MoreMsg])
      new-virt-text))

  (ufo.setup {:fold_virt_text_handler handler})
  ;; extra
  (lspsaga.setup)
  (inc_rename.setup {:input_buffer_type :dressing})
  (dressing.setup {:input {:override (fn [conf]
                                       (set conf.col (- 1))
                                       (set conf.row 0)
                                       conf)}})
  (lspsaga.setup {:ui {:kind ((. (require :catppuccin.groups.integrations.lsp_saga)
                                 :custom_kind))
                       :border :rounded}})
  (lsp-format.setup)
  (coq_3p [{:src :copilot :short_name :COP :accept_key :<c-f>}])
  (crates.setup {:src {:coq {:enabled true :name :crates}}}))

(local wkeys #(let [ufo (require :ufo)]
                {:zR [#(ufo.openAllFolds) "Open all folds"]
                 :zM [#(ufo.closeAllFolds) "Close all folds"]
                 :<A-d> {1 "<cmd>Lspsaga term_toggle<cr>" 
                         2 "Toggle terminal" 
                         :mode [:n :t]}
                 :g {
                       :name "+LSP"
                       :r ["<cmd>Lspsaga finder<CR>" "LSP Finder"]
                       :d ["<cmd>Lspsaga peek_definition<CR>" "LSP Preview Definition"]
                       :D ["<cmd>Lspsaga goto_definition<CR>" "LSP Go To Definition"]
                       :t ["<cmd>Lspsaga peek_type_definition<CR>" "LSP Preview Type"]
                       :T ["<cmd>Lspsaga goto_type_definition<CR>" "LSP Go To Type"]}
                 :K ["<cmd>Lspsaga hover_doc<CR>" "LSP Hover Doc"]
                 :<leader>a ["<cmd>Lspsaga code_action<CR>" "LSP Code Action"]
                 :<leader>r {1 #(.. ":IncRename " (vim.fn.expand :<cword>)) 2 "LSP Code Action" :expr true}
                 "]e" ["<cmd>Lspsaga diagnostic_jump_next<CR>" "LSP Next Diagnostic"]
                 "[e" ["<cmd>Lspsaga diagnostic_jump_prev<CR>" "LSP Prev Diagnostic"]}))

[{1 :neovim/nvim-lspconfig
  :dependencies [:ms-jpq/coq_nvim
                 :ms-jpq/coq.artifacts
                 :github/copilot.vim
                 ;; for coq.thirdparty
                 :saecki/crates.nvim
                 :simrat39/rust-tools.nvim
                 :ms-jpq/coq.thirdparty
                 :jose-elias-alvarez/null-ls.nvim
                 :nvim-tree/nvim-web-devicons
                 :nvimdev/lspsaga.nvim
                 :nvim-treesitter/nvim-treesitter
                 :smjonas/inc-rename.nvim
                 :stevearc/dressing.nvim
                 :ray-x/lsp_signature.nvim
                 :kevinhwang91/nvim-ufo
                 :lukas-reineke/lsp-format.nvim
                 :kevinhwang91/promise-async]
  : config
  : wkeys}
 {1 :j-hui/fidget.nvim
  :opts {:notification {:override_vim_notify true
                        :window {:winblend 90 :border :rounded}}}}]
