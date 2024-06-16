#!/usr/bin/env bash

stow -R intellij --no-folding
stow -R sway --no-folding

cd ags
npm run build
cd ..