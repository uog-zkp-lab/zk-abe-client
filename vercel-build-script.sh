#!/bin/bash
set -e

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Add Rust and wasm-pack to PATH
export PATH="$HOME/.cargo/bin:$PATH"

# Verify installations
rustc --version
cargo --version
wasm-pack --version

# Run the build command
pnpm build:wasm && next build