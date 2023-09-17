;;; Doom.d --- my doom config

;;; Commentary:
;;; I have no idea what I'm doing. Any advice welcome!

;;; $DOOMDIR/config.el -*- lexical-binding: t; -*-


;;; Code:
(setq user-full-name "Suyashtnt"
      user-mail-address "suyashtnt@gmail.com")

;; Doom exposes five (optional) variables for controlling fonts in Doom:
;;
;; - `doom-font' -- the primary font to use
;; - `doom-variable-pitch-font' -- a non-monospace font (where applicable)
;; - `doom-big-font' -- used for `doom-big-font-mode'; use this for
;;   presentations or streaming.
;; - `doom-unicode-font' -- for unicode glyphs
;; - `doom-serif-font' -- for the `fixed-pitch-serif' face
;;
;; See 'C-h v doom-font' for documentation and more examples of what they
;; accept. For example:
(setq doom-font (font-spec :family "ComicCodeLigatures Nerd Font" :size 12 :weight 'semi-light)
      doom-variable-pitch-font (font-spec :family "Inter" :size 13))

(setq doom-theme 'catppuccin)
(setq catppuccin-flavor 'mocha)
(setq custom-safe-themes 't)

(setq display-line-numbers-type 'relative)

;; Makes sure that if there is a massive mouse movement, it recenters.
(setq mouse-wheel-scroll-amount '(1 ((shift) . 3) ((control)))
      scroll-conservatively 3
      scroll-margin 3
      maximum-scroll-margin 0.2)

;; smooth scrolling stuff
(setq pixel-scroll-precision-large-scroll-height 40.0)
(setq-hook! 'term-mode-hook scroll-margin 0)
(setq mouse-wheel-scroll-amount '(1 ((shift) . 1)))
(setq mouse-wheel-progressive-speed nil)
(setq mouse-wheel-follow-mouse 't)
(setq scroll-step 1)
(add-hook 'text-mode-hook 'pixel-scroll-precision-mode)

(setq fancy-splash-image (expand-file-name "splash.svg" doom-user-dir))

(set-frame-parameter nil 'alpha-background 40)
(add-to-list 'default-frame-alist '(alpha-background . 40))

;; Whenever you reconfigure a package, make sure to wrap your config in an
;; `after!' block, otherwise Doom's defaults may override your settings. E.g.
;;
;;   (after! PACKAGE
;;     (setq x y))
;;
;; The exceptions to this rule:
;;
;;   - Setting file/directory variables (like `org-directory')
;;   - Setting variables which explicitly tell you to set them before their
;;     package is loaded (see 'C-h v VARIABLE' to look up their documentation).
;;   - Setting doom variables (which start with 'doom-' or '+').
;;
;; Here are some additional functions/macros that will help you configure Doom.
;;
;; - `load!' for loading external *.el files relative to this one
;; - `use-package!' for configuring packages
;; - `after!' for running code after a package has loaded
;; - `add-load-path!' for adding directories to the `load-path', relative to
;;   this file. Emacs searches the `load-path' when you load packages with
;;   `require' or `use-package'.
;; - `map!' for binding new keys
;;
;; To get information about any of these functions/macros, move the cursor over
;; the highlighted symbol at press 'K' (non-evil users must press 'C-c c k').
;; This will open documentation for it, including demos of how they are used.
;; Alternatively, use `C-h o' to look up a symbol (functions, variables, faces,
;; etc).
;;
;; You can also try 'gd' (or 'C-c c d') to jump to their definition and see how
;; they are implemented.

(after! lsp-mode
  (add-to-list 'lsp-language-id-configuration
    '("\\.typ$" . "typst"))

  (lsp-register-client
    (make-lsp-client :new-connection (lsp-stdio-connection "typst-lsp")
                     :activation-fn (lsp-activate-on "typst")
                     :environment-fn (lambda ()
                                       '(("RUST_BACKTRACE" . lsp-typst-enable-backtrace)))
                     :server-id 'typst-lsp)))

(defun scroll-down-and-recenter ()
  "Scrolls down and recenters the screen."
  (interactive)
  (evil-scroll-down 0))

(defun scroll-up-and-recenter ()
  "Scrolls up and recenters the screen."
  (interactive)
  (evil-scroll-up 0))

(map!
  :after evil
  :n "C-d" 'scroll-down-and-recenter
  :n "C-u" 'scroll-up-and-recenter)

(setq lsp-typst-enable-backtrace "1")

(after! lsp-ui
 (setq lsp-ui-doc-enable t)
 (setq lsp-ui-doc-position 'at-point))

(after! centaur-tabs (centaur-tabs-group-by-projectile-project))

(use-package! lsp-nix
  :ensure lsp-mode
  :after (lsp-mode)
  :demand t
  :custom
  (lsp-nix-nil-formatter ["nixpkgs-fmt"]))

(use-package! nix-mode
  :hook (nix-mode . lsp-deferred)
  :ensure t)

(use-package! good-scroll
  :hook (doom-first-input . good-scroll-mode)
  :config
  (defun good-scroll--convert-line-to-step (line)
    (cl-typecase line
      (integer (* line (line-pixel-height)))
      ((or null (member -))
       (- (good-scroll--window-usable-height)
          (* next-screen-context-lines (line-pixel-height))))
      (t (line-pixel-height))))

  (defadvice! good-scroll--scroll-up (&optional arg)
    :override 'scroll-up
    (good-scroll-move (good-scroll--convert-line-to-step arg)))

  (defadvice! good-scroll--scroll-down (&optional arg)
    :override 'scroll-down
    (good-scroll-move (- (good-scroll--convert-line-to-step arg)))))

(use-package! typst-mode)

;; accept completion from copilot and fallback to company
(use-package! copilot
  :hook (prog-mode . copilot-mode)
  :bind (:map copilot-completion-map
              ("<tab>" . 'copilot-accept-completion)
              ("TAB" . 'copilot-accept-completion)
              ("C-TAB" . 'copilot-accept-completion-by-word)
              ("C-<tab>" . 'copilot-accept-completion-by-word)))

(add-hook 'nix-mode-local-vars-hook #'lsp!)
(add-hook 'typst-mode-local-vars-hook #'lsp!)
(add-hook 'typst--markup-mode-local-vars-hook #'lsp!)
(add-hook 'typst--code-mode-local-vars-hook #'lsp!)

;; tree sitter enabled packages
(global-tree-sitter-mode)
(add-hook 'tree-sitter-after-on-hook #'tree-sitter-hl-mode)

;;; config.el ends here
