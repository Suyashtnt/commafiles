(local treesitter (require :nvim-treesitter.configs))
(local context (require :treesitter-context))
(local rainbow (require :rainbow-delimiters))
(local rainbow-setup (require :rainbow-delimiters.setup))


(local highlight {
                    :enable true
                    :additional_vim_regex_highlighting true})

(treesitter.setup {
                    :highlight highlight})

(context.setup)

(local strat {"" rainbow.strategy.global
              :html rainbow.strategy.local})

(rainbow-setup {
                :strategy strat})
