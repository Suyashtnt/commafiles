local plugins_path = vim.fn.stdpath("data") .. "/lazy"

-- bootstrap lazy
local lazy_path = plugins_path .. "/lazy.nvim"
if not vim.loop.fs_stat(lazy_path) then
  vim.notify("Bootstrapping lazy.nvim...", vim.log.levels.INFO)
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazy_path,
  })
end

-- bootstrap hotpot
local hotpot_path = plugins_path .. "/hotpot.nvim"

if vim.fn.empty(vim.fn.glob(hotpot_path)) > 0 then
  vim.notify("Bootstrapping hotpot.nvim...", vim.log.levels.INFO)
  vim.fn.system({ 'git', 'clone',
    'https://github.com/rktjmp/hotpot.nvim', hotpot_path })
  vim.cmd("helptags " .. hotpot_path .. "/doc")
end

vim.opt.runtimepath:prepend(lazy_path)
vim.opt.runtimepath:prepend(hotpot_path)

-- Enable fnl/ support
require("hotpot").setup({
  provide_require_fennel = true,
  compiler = {
    modules = {
      correlate = true,
    },
  },
})


-- load config
require("config")
