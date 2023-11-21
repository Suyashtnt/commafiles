{pkgs, config, ...}: {
  home.packages = with pkgs; [
    wakatime
  ];

  programs.vscode = {
    enable = true;
    userSettings = {
      "[dotenv]" = {"editor.defaultFormatter" = "foxundermoon.shell-format";};
      "[html]" = {"editor.defaultFormatter" = "esbenp.prettier-vscode";};
      "[ignore]" = {"editor.defaultFormatter" = "foxundermoon.shell-format";};
      "[javascript]" = {"editor.defaultFormatter" = "dbaeumer.vscode-eslint";};
      "[json]" = {
        "editor.defaultFormatter" = "vscode.json-language-features";
        "editor.quickSuggestions" = {strings = true;};
        "editor.suggest.insertMode" = "replace";
      };
      "[jsonc]" = {"editor.defaultFormatter" = "vscode.json-language-features";};
      "[jvmoptions]" = {"editor.defaultFormatter" = "foxundermoon.shell-format";};
      "[lua]" = {"editor.defaultFormatter" = "sumneko.lua";};
      "[markdown]" = {"editor.defaultFormatter" = "DavidAnson.vscode-markdownlint";};
      "[properties]" = {"editor.defaultFormatter" = "foxundermoon.shell-format";};
      "[rust]" = {"editor.defaultFormatter" = "rust-lang.rust-analyzer";};
      "[scss]" = {"editor.defaultFormatter" = "esbenp.prettier-vscode";};
      "[shellscript]" = {"editor.defaultFormatter" = "foxundermoon.shell-format";};
      "[svelte]" = {"editor.defaultFormatter" = "dbaeumer.vscode-eslint";};
      "[toml]" = {"editor.defaultFormatter" = "tamasfe.even-better-toml";};
      "[typescript]" = {"editor.defaultFormatter" = "dbaeumer.vscode-eslint";};
      "[vue]" = {"editor.defaultFormatter" = "dbaeumer.vscode-eslint";};
      "[yuck]" = {
        "editor.defaultFormatter" = null;
        "editor.formatOnPaste" = false;
        "editor.formatOnSave" = false;
      };
      "breadcrumbs.enabled" = true;
      "cSpell.userWords" = ["figcaption" "glitched" "imagetools" "metaframework" "scrset" "srcset" "truegray"];
      "catppuccin.accentColor" = "sapphire";
      "css.validate" = true;
      "debug.allowBreakpointsEverywhere" = true;
      "debug.javascript.autoAttachFilter" = "onlyWithFlag";
      "debug.showBreakpointsInOverviewRuler" = true;
      "editor.bracketPairColorization.enabled" = true;
      "editor.codeActionsOnSave" = {
        "source.fixAll.eslint" = true;
        "source.fixAll.prettier" = true;
      };
      "editor.cursorBlinking" = "phase";
      "editor.cursorSmoothCaretAnimation" = "on";
      "editor.foldingImportsByDefault" = true;
      "editor.fontFamily" = "ComicCodeLigatures Nerd Font, Monaco, 'Courier New', monospace";
      "editor.fontLigatures" = true;
      "editor.formatOnPaste" = true;
      "editor.formatOnSave" = true;
      "editor.guides.bracketPairs" = true;
      "editor.inlayHints.fontSize" = 12;
      "editor.inlineSuggest.enabled" = true;
      "editor.lineNumbers" = "relative";
      "editor.linkedEditing" = true;
      "editor.minimap.enabled" = false;
      "editor.overviewRulerBorder" = false;
      "editor.renderWhitespace" = "none";
      "editor.smoothScrolling" = true;
      "editor.suggestSelection" = "first";
      "editor.tabSize" = 4;
      "errorLens.excludeBySource" = ["rustc(Click for full compiler diagnostic)"];
      "errorLens.gutterIconsEnabled" = true;
      "eslint.experimental.useFlatConfig" = true;
      "eslint.format.enable" = true;
      "eslint.lintTask.enable" = true;
      "eslint.probe" = ["javascript" "javascriptreact" "typescript" "typescriptreact" "html" "vue" "markdown" "svelte"];
      "eslint.useESLintClass" = true;
      "eslint.validate" = ["javascript" "typescript" "vue" "markdown" "svelte"];
      "explorer.autoRevealExclude" = {
        "**/.svelte-kit" = true;
        "**/bower_components" = true;
        "**/node_modules" = true;
      };
      "explorer.confirmDragAndDrop" = false;
      "explorer.fileNesting.enabled" = true;
      "explorer.fileNesting.patterns" = {
        "+layout.svelte" = "+layout.svelte, +layout.ts, +layout.server.ts";
        "+page.svelte" = "+page.svelte, +page.ts, +page.server.ts";
        ".gitignore" = ".gitignore, .gitmodules";
        "flake.nix" = "flake.nix, flake.lock";
      };
      "explorer.incrementalNaming" = "smart";
      "explorer.sortOrder" = "filesFirst";
      "file-browser.hideDotfiles" = false;
      "files.associations" = {".env.example" = "dotenv";};
      "files.autoSave" = "onWindowChange";
      "files.trimFinalNewlines" = true;
      "git.allowForcePush" = true;
      "git.alwaysSignOff" = true;
      "git.closeDiffOnOperation" = true;
      "git.confirmForcePush" = true;
      "git.confirmSync" = false;
      "git.enableCommitSigning" = true;
      "git.fetchOnPull" = true;
      "git.followTagsWhenSync" = true;
      "github.copilot.enable" = {
        "*" = true;
        markdown = true;
        plaintext = true;
        scminput = false;
        typst = false;
      };
      "githubPullRequests.createOnPublishBranch" = "never";
      "githubPullRequests.pullBranch" = "never";
      "javascript.inlayHints.enumMemberValues.enabled" = true;
      "javascript.inlayHints.functionLikeReturnTypes.enabled" = true;
      "javascript.inlayHints.parameterNames.enabled" = "all";
      "javascript.inlayHints.parameterTypes.enabled" = true;
      "javascript.inlayHints.propertyDeclarationTypes.enabled" = true;
      "javascript.inlayHints.variableTypes.enabled" = true;
      "javascript.suggest.paths" = false;
      "markdown.preview.fontFamily" = "-apple-system, BlinkMacSystemFont, Inter, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', 'Droid Sans', sans-serif";
      "nix.enableLanguageServer" = true;
      "nix.serverPath" = "nil";
      "notebook.lineNumbers" = "on";
      "nxConsole.showNodeVersionOnStartup" = false;
      "redhat.telemetry.enabled" = true;
      "remote.SSH.remotePlatform" = {"rpi.local" = "linux";};
      "rust-analyzer.procMacro.attributes.enable" = true;
      "rust-analyzer.semanticHighlighting.operator.specialization.enable" = true;
      "rust-analyzer.semanticHighlighting.punctuation.enable" = true;
      "rust-analyzer.semanticHighlighting.punctuation.separate.macro.bang" = true;
      "rust-analyzer.semanticHighlighting.punctuation.specialization.enable" = true;
      "settingsSync.ignoredExtensions" = ["mkhl.direnv" "vscodevim.vim" "asvetliakov.vscode-neovim" "julianiaquinandi.nvim-ui-modifier"];
      "svelte.enable-ts-plugin" = true;
      "svelte.plugin.svelte.defaultScriptLanguage" = "ts";
      "svelte.plugin.svelte.useNewTransformation" = true;
      "terminal.integrated.copyOnSelection" = true;
      "terminal.integrated.cursorBlinking" = true;
      "terminal.integrated.cursorStyle" = "line";
      "terminal.integrated.defaultProfile.windows" = "PowerShell";
      "terminal.integrated.scrollback" = 50000;
      "terminal.integrated.smoothScrolling" = true;
      "typescript.inlayHints.enumMemberValues.enabled" = true;
      "typescript.inlayHints.functionLikeReturnTypes.enabled" = true;
      "typescript.inlayHints.parameterNames.enabled" = "all";
      "typescript.inlayHints.parameterTypes.enabled" = true;
      "typescript.inlayHints.propertyDeclarationTypes.enabled" = true;
      "typescript.inlayHints.variableTypes.enabled" = true;
      "typescript.suggest.paths" = false;
      "typescript.updateImportsOnFileMove.enabled" = "always";
      "vim.easymotion" = true;
      "vim.normalModeKeyBindingsNonRecursive" = [
        {
          before = ["<space>"];
          commands = ["vspacecode.space"];
        }
        {
          before = [","];
          commands = [
            "vspacecode.space"
            {
              args = "m";
              command = "whichkey.triggerKey";
            }
          ];
        }
      ];
      "vim.useSystemClipboard" = true;
      "vim.visualModeKeyBindingsNonRecursive" = [
        {
          before = ["<space>"];
          commands = ["vspacecode.space"];
        }
        {
          before = [","];
          commands = [
            "vspacecode.space"
            {
              args = "m";
              command = "whichkey.triggerKey";
            }
          ];
        }
      ];
      "vscode-edge-devtools.webhint" = false;
      "vsintellicode.modify.editor.suggestSelection" = "automaticallyOverrodeDefaultValue";
      "window.autoDetectColorScheme" = true;
      "window.commandCenter" = true;
      "window.dialogStyle" = "custom";
      "window.menuBarVisibility" = "compact";
      "window.titleBarStyle" = "custom";
      "window.zoomLevel" = 1;
      "workbench.editor.empty.hint" = "hidden";
      "workbench.editor.showTabs" = "single";
      "workbench.iconTheme" = "catppuccin-mocha";
      "workbench.colorCustomizations" = {
        "[Stylix]" = {
          "statusBar.background" = "#${config.lib.stylix.colors.base01}";
          "scrollbarSlider.activeBackground" = "#${config.lib.stylix.colors.base04}aa";
          "scrollbarSlider.background" = "#${config.lib.stylix.colors.base02}88";
          "scrollbarSlider.hoverBackground" = "#${config.lib.stylix.colors.base03}88";
          "icon.foreground" = "#${config.lib.stylix.colors.base01}";
          "badge.foreground" = "#${config.lib.stylix.colors.base01}";
          "statusBar.foreground" = "#${config.lib.stylix.colors.base06}";
          "button.foreground" = "#${config.lib.stylix.colors.base06}";
          "button.secondaryForeground" = "#${config.lib.stylix.colors.base06}";
        };
      };
      "workbench.layoutControl.enabled" = false;
      "workbench.list.smoothScrolling" = true;
      "workbench.settings.enableNaturalLanguageSearch" = false;
      "workbench.view.alwaysShowHeaderActions" = true;
    };
  };
}
