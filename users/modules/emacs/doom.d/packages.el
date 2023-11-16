;;; Packages --- any custom packages my config requires
;; no-byte-compile: t; -*-

;;; Commentary:
;;; I have no idea what I'm doing again. I'm usually just following docs here

;;; Code:

(when (package! polymode)
  (package! typst-mode
            :recipe (:type git :host github :repo "Ziqi-Yang/typst-mode.el")))

(package! catppuccin-theme)
(package! rainbow-mode)
(package! good-scroll)

;; s, editorconfig, and dash
(when (package! editorconfig)
  (package! copilot
            :recipe (:host github :repo "zerolfx/copilot.el" :files ("*.el" "dist"))))

;; non-unpinned breaks
(unpin! tree-sitter)
(unpin! tree-sitter-langs)

;;; packages.el ends here
