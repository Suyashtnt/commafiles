(fn config []
  (local unruly (require :unruly-worker))
  (unruly.setup {
                  :enable_comment_map true
                  :enable_wrap_navigate  true
                  :enable_visual_navigate true}))

[{
  1 :slugbyte/unruly-worker
  : config}]
