#!/usr/bin/env bash

cd ./intellij/.config/JetBrains/
find RustRover2023.3 -type f -delete

cd IntelliJIdea2023.3 # source
find . -not -path '.' -type f -name '*' -exec ln -vsr "./{}" "../RustRover2023.3/{}" ';'

