-- I am too lazy to rewrite this in fennel rn
-- TODO: rewrite in fennel when not lazy

local windline = require('windline')
local helper = require('windline.helpers')
local b_components = require('windline.components.basic')

local state = _G.WindLine.state
local sep = helper.separators

local lsp_comps = require('windline.components.lsp')
local git_comps = require('windline.components.git')

local hl_list = {
    Black = { 'white', 'black' },
    White = { 'black', 'white' },
    Inactive = { 'InactiveFg', 'InactiveBg' },
    Active = { 'ActiveFg', 'ActiveBg' },
}
local basic = {}

local breakpoint_width = 90
basic.divider = { b_components.divider, '' }
basic.bg = { ' ', 'StatusLine' }

local colors_mode = {
    Normal = { 'black', 'red', 'bold' },
    Insert = { 'black', 'green', 'bold' },
    Visual = { 'black', 'yellow', 'bold' },
    Replace = { 'black', 'blue_light', 'bold' },
    Command = { 'black', 'magenta', 'bold' },
    NormalBefore = { 'red', 'black' },
    InsertBefore = { 'green', 'black' },
    VisualBefore = { 'yellow', 'black' },
    ReplaceBefore = { 'blue_light', 'black' },
    CommandBefore = { 'magenta', 'black' },
    NormalAfter = { 'lavender', 'red' },
    InsertAfter = { 'lavender', 'green' },
    VisualAfter = { 'lavender', 'yellow' },
    ReplaceAfter = { 'lavender', 'blue_light' },
    CommandAfter = { 'lavender', 'magenta' },
}

basic.vi_mode = {
    name = 'vi_mode',
    hl_colors = colors_mode,
    text = function()
        return { 
          { sep.left_rounded, state.mode[2] .. "Before" },
          { '  ', state.mode[2] },
          { sep.left_rounded, state.mode[2] .. "After" },
        }
    end,
}

basic.lsp_diagnos = {
    name = 'diagnostic',
    hl_colors = {
        red = { 'red', 'black' },
        yellow = { 'yellow', 'black' },
        blue = { 'blue', 'black' },
    },
    width = breakpoint_width,
    text = function(bufnr)
        if lsp_comps.check_lsp(bufnr) then
            return {
                { sep.left_rounded, { 'black', 'lavender' } },
                { lsp_comps.lsp_error({ format = ' %s', show_zero = true }), 'red' },
                { lsp_comps.lsp_warning({ format = '  %s', show_zero = true }), 'yellow' },
                { lsp_comps.lsp_hint({ format = ' 󰋼 %s', show_zero = true }), 'blue' },
                { sep.right_rounded, { 'black', 'lavender' } },
            }
        end
        return ''
    end,
}

basic.file = {
    name = 'file',
    hl_colors = {
        default = { 'black', 'lavender' },
        lavender = { 'black', 'lavender' },
    },
    text = function(_, _, width)
        return {
            { b_components.cache_file_name('[No Name]', 'unique'), 'lavender' },
            { b_components.file_modified(' '), 'lavender' },
        }
    end,
}

basic.git = {
    name = 'git',
    hl_colors = {
        green = { 'green', 'black_light' },
        red = { 'red', 'black_light' },
        blue = { 'blue', 'black_light' },
    },
    width = breakpoint_width,
    text = function(bufnr)
        if git_comps.is_git(bufnr) then
            return {
                { git_comps.diff_added({ format = '  %s', show_zero = true }), 'green' },
                { git_comps.diff_removed({ format = '  %s', show_zero = true }), 'red' },
                { git_comps.diff_changed({ format = ' 󰿠 %s', show_zero = true }), 'blue' },
            }
        end
        return ''
    end,
}

basic.lsp_name = {
    width = breakpoint_width,
    name = 'lsp_name',
    hl_colors = {
        magenta = { 'magenta', 'black_light' },
    },
    text = function(bufnr)
        if lsp_comps.check_lsp(bufnr) then
            return {
                { lsp_comps.lsp_name(), 'magenta' },
            }
        end
        return {
            { b_components.cache_file_type({icon = true}), 'magenta' },
        }
    end,
}

local default = {
    filetypes = { 'default' },
    active = {
        { ' ', hl_list.Black },
        basic.vi_mode,
        basic.file,
        basic.lsp_diagnos,
        basic.divider,
        { sep.left_rounded, { 'black_light', 'lavender' } },
        basic.lsp_name,
        basic.git,
        { git_comps.git_branch(), { 'magenta', 'black_light' }, breakpoint_width },
        { sep.right_rounded, { 'black_light', 'black' } },
        { ' ', hl_list.Black },
    },
    inactive = {
        { b_components.full_file_name, hl_list.Inactive },
        basic.file_name_inactive,
        basic.divider,
        basic.divider,
        { b_components.line_col, hl_list.Inactive },
        { b_components.progress, hl_list.Inactive },
    },
}

local M = {}

function M.setup(catppuccin_mocha)
  windline.setup({
      colors_name = function(colors)
          for key, value in pairs(catppuccin_mocha) do
            colors[key] = value
            local new_key = key .. '_light'
            colors[new_key] = value
          end

          colors.black = catppuccin_mocha.crust
          colors.black_light = catppuccin_mocha.mantle

          colors.NormalFg      = catppuccin_mocha.text
          colors.NormalBg      = catppuccin_mocha.mantle
          colors.InactiveFg    = catppuccin_mocha.overlay1
          colors.InactiveBg    = catppuccin_mocha.crust
          colors.ActiveFg      = catppuccin_mocha.text
          colors.ActiveBg      = catppuccin_mocha.overlay0

          colors.TabSelectionBg= "#b8bb26"
          colors.TabSelectionFg= "#282828"

          return colors
      end,
      statuslines = {
          default
      },
  })
end

return M
