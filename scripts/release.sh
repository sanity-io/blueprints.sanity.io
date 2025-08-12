#!/bin/bash

# Release script for @sanity/blueprints-jsonschemas
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Default to patch if no argument provided
VERSION_TYPE=${1:-patch}

echo "🚀 Starting release process..."

# Ensure we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "❌ Must be on main branch to release. Currently on: $CURRENT_BRANCH"
  exit 1
fi

# Ensure working directory is clean
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Working directory is not clean. Please commit or stash changes."
  exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Run tests
echo "🧪 Running tests..."
npm test

# Run linting
echo "🔍 Running linting..."
npm run lint

# Bump version
echo "📦 Bumping $VERSION_TYPE version..."
npm version $VERSION_TYPE --no-git-tag-version

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "📋 New version: $NEW_VERSION"

# Commit version bump
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"

# Create and push tag
echo "🏷️  Creating tag v$NEW_VERSION..."
git tag "v$NEW_VERSION"

echo "📤 Pushing changes and tag..."
git push origin main
git push origin "v$NEW_VERSION"

echo "✅ Release v$NEW_VERSION completed!"
echo "🎉 GitHub Actions will automatically publish to npm when the tag is pushed."