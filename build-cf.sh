#!/bin/bash
set -e

echo "Building Azura Cafe..."
pnpm build

echo "Copying dist to root..."
rm -rf dist
cp -r artifacts/azura/dist dist

echo "Done!"
