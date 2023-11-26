;; fennel-ls: macro-file

(fn plugin! [name options]
  (tset options 1 name)
  options)

{: plugin!}
 
