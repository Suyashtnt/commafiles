(local treesitter (require :nvim-treesitter.configs))
(local rainbow (require :ts-rainbow))
(local context (require :treesitter-context))

(local strategy rainbow.strategy)

(local rainbow {
                  :enable true
                  :strategy {
                              1 strategy.global
                              :html strategy.local}})

(local highlight {
                    :enable true
                    :additional_vim_regex_highlighting true})

(treesitter.setup {
                    :rainbow rainbow
                    :highlight highlight})
(context.setup)
