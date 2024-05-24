#!/usr/bin/env nu

let outputPath = sudo nom build --print-out-paths --no-link .#
cachix push suyashtnt $outputPath
cachix deploy activate $outputPath
