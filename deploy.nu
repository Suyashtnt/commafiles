#!/usr/bin/env nu

let outputPath = nom build --print-out-paths --no-link .#
cachix push suyashtnt $outputPath
cachix deploy activate $outputPath
