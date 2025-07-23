#!/bin/bash

# Release script for mollie-react
# Usage: ./scripts/release.sh [version]
# Example: ./scripts/release.sh 1.2.3

set -e

if [ $# -eq 0 ]; then
    echo "❌ Please provide a version number"
    echo "Usage: $0 <version>"
    echo "Example: $0 1.2.3"
    exit 1
fi

VERSION=$1

# Validate version format
if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+(\-[a-zA-Z0-9\.\-]+)?$ ]]; then
    echo "❌ Invalid version format. Please use semantic versioning (e.g., 1.2.3 or 1.2.3-beta.1)"
    exit 1
fi

echo "🚀 Starting release process for version $VERSION"

# Check if version already exists
if git tag | grep -q "^v$VERSION$"; then
    echo "❌ Version v$VERSION already exists!"
    exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Working directory is not clean. Please commit or stash your changes."
    git status --short
    exit 1
fi

# Update to latest main
echo "📡 Updating to latest main branch..."
git checkout main
git pull origin main

# Run tests
echo "🧪 Running tests..."
npm run typecheck
npm run build
npm run test

# Update package version
echo "📝 Updating package.json to version $VERSION..."
npm version $VERSION --no-git-tag-version

# Update CHANGELOG
echo "📋 Updating CHANGELOG.md..."
DATE=$(date +%Y-%m-%d)

if [ -f CHANGELOG.md ]; then
    cp CHANGELOG.md CHANGELOG.md.backup
fi

# Create new changelog entry
cat > CHANGELOG.md.new << EOF
# Changelog

## [$VERSION] - $DATE

### Changed
- Release version $VERSION

EOF

# Append existing changelog if it exists
if [ -f CHANGELOG.md.backup ]; then
    # Skip the first line (# Changelog) and append the rest
    tail -n +2 CHANGELOG.md.backup >> CHANGELOG.md.new
fi

mv CHANGELOG.md.new CHANGELOG.md
rm -f CHANGELOG.md.backup

# Commit changes
echo "💾 Committing version bump..."
git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: bump version to v$VERSION"

# Create tag
echo "🏷️ Creating tag v$VERSION..."
git tag "v$VERSION"

# Push changes and tag
echo "📤 Pushing to repository..."
git push origin main
git push origin "v$VERSION"

echo "✅ Release v$VERSION completed successfully!"
echo ""
echo "Next steps:"
echo "1. Go to GitHub and create a release from tag v$VERSION"
echo "2. The GitHub workflow will automatically publish to NPM"
echo "3. Or manually run the Release workflow in GitHub Actions"
