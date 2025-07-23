# GitHub Workflows Documentation

This repository includes several GitHub Actions workflows for automated testing, building, and publishing.

## Workflows Overview

### 1. CI Workflow (`.github/workflows/ci.yml`)
**Triggers:** Push to `main` branch, Pull Requests to `main`

**Purpose:** Continuous Integration testing
- Tests on Node.js versions 18.x, 20.x, 21.x
- Runs TypeScript type checking
- Builds the package
- Validates package structure
- Checks if package can be packed

### 2. Release Workflow (`.github/workflows/release.yml`)
**Triggers:** Manual dispatch via GitHub Actions UI

**Purpose:** Create new releases with version bumping
- Allows choosing version increment: patch, minor, or major
- Option to create prerelease versions
- Automatically updates CHANGELOG.md
- Creates Git commit with version bump
- Creates GitHub release with release notes

**Usage:**
1. Go to the "Actions" tab in your GitHub repository
2. Select "Release" workflow
3. Click "Run workflow"
4. Choose version type (patch/minor/major)
5. Optionally check "Create a prerelease"
6. Click "Run workflow"

### 3. Publish Workflow (`.github/workflows/publish.yml`)
**Triggers:** When a GitHub release is published

**Purpose:** Automatically publish to NPM
- Runs tests and builds
- Extracts version from release tag
- Updates package.json version
- Publishes to NPM registry
- Uploads package tarball to GitHub release

## Setup Requirements

### GitHub Secrets
You need to configure the following in your GitHub repository:

1. **Environment:** Create a GitHub environment called `publish`
2. **Secret:** In the `publish` environment, add `NPM_TOKEN` with your NPM authentication token

### Setting up the Environment and Secret

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Environments**
3. Click **New environment**
4. Name it `publish`
5. Under **Environment secrets**, click **Add secret**
6. Name: `NPM_TOKEN`
7. Value: Your NPM authentication token (`npm_...`)

## Release Process

### Automated Release (Recommended)

1. **Create a Release:**
   - Go to Actions → Release workflow → Run workflow
   - Choose version increment type
   - The workflow will:
     - Run tests
     - Bump version in package.json
     - Update CHANGELOG.md
     - Create a Git commit
     - Create a GitHub release

2. **Automatic Publishing:**
   - The release creation automatically triggers the publish workflow
   - Package gets built and published to NPM
   - Tarball gets attached to the GitHub release

### Manual Release (Alternative)

If you prefer manual control:

1. **Local version bump:**
   ```bash
   npm run version:patch  # or version:minor, version:major
   git add package.json
   git commit -m "chore: bump version to vX.X.X"
   git push
   ```

2. **Create GitHub release:**
   - Go to GitHub → Releases → New release
   - Choose a tag (e.g., `v1.0.1`)
   - Add release notes
   - Publish release

3. **Automatic publishing:**
   - Publishing to NPM happens automatically via the publish workflow

## Version Management

The workflows support semantic versioning:

- **patch** (1.0.0 → 1.0.1): Bug fixes
- **minor** (1.0.0 → 1.1.0): New features, backward compatible
- **major** (1.0.0 → 2.0.0): Breaking changes

### Prerelease Versions

You can create prerelease versions (e.g., `1.1.0-beta.0`) by:
1. Using the Release workflow
2. Checking "Create a prerelease"
3. Choosing the version increment type

## Monitoring

### Workflow Status
- Check the "Actions" tab to monitor workflow runs
- Failed workflows will show error details
- Successful publishes will show the NPM package link

### NPM Package
- Published packages appear at: `https://www.npmjs.com/package/mollie-react`
- Version history is tracked automatically

## Troubleshooting

### Common Issues

1. **NPM Token Invalid:**
   - Verify the `NPM_TOKEN` secret in the `publish` environment
   - Ensure the token has publish permissions

2. **Version Already Exists:**
   - NPM doesn't allow republishing the same version
   - Use a different version number

3. **Tests Failing:**
   - Check the CI workflow for specific error messages
   - Fix issues before creating releases

4. **Build Failing:**
   - Ensure all TypeScript files compile without errors
   - Check that all dependencies are properly installed

### Manual Intervention

If you need to publish manually:

```bash
# Build the package
npm run build

# Test the package
npm run test

# Publish to NPM (requires NPM_TOKEN in environment)
npm publish
```

## Security Notes

- NPM tokens are stored securely in GitHub environment secrets
- The `publish` environment provides additional security for sensitive operations
- Only releases trigger NPM publishing, not regular pushes
- All workflows require tests to pass before publishing
