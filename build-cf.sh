#!/bin/bash
set -e

# Build the project
pnpm build

# Copy dist folder to root for Cloudflare Pages
rm -rf dist
cp -r artifacts/azura/dist dist

echo "Build complete. Output copied to dist/"
