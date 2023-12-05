(local views {:cmdline_popup {:position {:col "50%" :row 5} :size {:height :auto :width 60}}
              :popupmenu {:border {:padding [0 1] :style :rounded}
                          :position {:col "50%" :row 8}
                          :relative :editor
                          :size {:height 10 :width 60}
                          :win_options {:winhighlight {:FloatBorder :DiagnosticInfo
                                                       :Normal :Normal}}}})

[{1 :folke/noice.nvim
  :dependencies [:MunifTanjim/nui.nvim]
  :event :VeryLazy
  :opts {:lsp {:override {:cmp.entry.get_documentation true
                          :vim.lsp.util.convert_input_to_markdown_lines true
                          :vim.lsp.util.stylize_markdown true}
               :progress {:enabled false}
               :message {:enabled false}}
         : views
         :notify {:enabled false}
         :messages {:enabled false}
         :presets {:bottom_search true
                   :command_palette true
                   :inc_rename true
                   :long_message_to_split true
                   :lsp_doc_border true}}}]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	
