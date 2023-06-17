;;; Packages --- any custom packages my config requires
;; no-byte-compile: t; -*-

;;; Commentary:
;;; I have no idea what I'm doing again. I'm usually just following docs here

;;; Code:

(when (package! polymode)
  (package! typst-mode))

(unpin! tree-sitter)
(unpin! tree-sitter-langs)

;;; packages.el ends here
