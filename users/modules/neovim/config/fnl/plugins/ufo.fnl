(fn config []
  (let [ufo (require :ufo)]
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
                (set chunk-text
                     (truncate chunk-text (- target-width cur-width)))
                (local hl-group (. chunk 2))
                (table.insert new-virt-text [chunk-text hl-group])
                (set chunk-width (vim.fn.strdisplaywidth chunk-text))
                (when (< (+ cur-width chunk-width) target-width)
                  (set suffix
                       (.. suffix
                           (: " " :rep
                              (- (- target-width cur-width) chunk-width)))))
                (lua :break)))
          (set cur-width (+ cur-width chunk-width)))
        (table.insert new-virt-text [suffix :MoreMsg])
        new-virt-text))

    (ufo.setup {:fold_virt_text_handler handler})))

(local wkeys #(let [ufo (require :ufo)]
                {:zR [#(ufo.openAllFolds) "Open all folds"]
                 :zM [#(ufo.closeAllFolds) "Close all folds"]}))

[{1 :kevinhwang91/nvim-ufo : config : wkeys :event :VeryLazy}]
