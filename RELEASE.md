# Release Process

This document outlines the release process for `@sanity/blueprints-jsonschemas`.

## Prerequisites

1. **NPM Token**: Ensure the `NPM_PUBLISH_TOKEN` organization secret is configured
2. **Permissions**: You need write access to the repository
3. **Clean State**: Ensure your working directory is clean and you're on the `main` branch

## Automated Release (Recommended)

Use the provided release script:

```bash
# Patch release (0.0.1 -> 0.0.2)
npm run release patch

# Minor release (0.0.1 -> 0.1.0)
npm run release minor

# Major release (0.0.1 -> 1.0.0)
npm run release major
```

The script will:
1. ✅ Verify you're on the main branch
2. ✅ Ensure working directory is clean
3. ✅ Pull latest changes
4. ✅ Run tests and linting
5. ✅ Bump version in package.json
6. ✅ Commit the version bump
7. ✅ Create and push a git tag
8. ✅ Trigger GitHub Actions to publish to npm

## Manual Release

If you prefer to release manually:

1. **Update version**:
   ```bash
   npm version patch  # or minor/major
   ```

2. **Create and push tag**:
   ```bash
   git tag v$(node -p "require('./package.json').version")
   git push origin main --tags
   ```

3. **GitHub Actions will automatically publish** when the tag is pushed

## GitHub Actions Workflows

### CI Workflow (`.github/workflows/ci.yml`)
- Runs on every push to `main` and pull requests
- Tests on Node.js version 22
- Runs tests and linting

### Publish Workflow (`.github/workflows/publish.yml`)
- Triggers on git tags matching `v*` pattern
- Runs tests and linting
- Publishes to npm with provenance
- Uses `NPM_PUBLISH_TOKEN` organization secret for authentication

## NPM Package Configuration

The package includes:
- `schemas.js` - Main export file
- `pages/schemas/` - All JSON schema files
- `README.md` - Package documentation

Excluded from package (via `.npmignore`):
- Development files (tests, scripts, config)
- GitHub workflows
- Documentation (except README.md)

## Verification

After release, verify the package:

```bash
# Check on npm
npm view @sanity/blueprints-jsonschemas

# Test installation
npm install @sanity/blueprints-jsonschemas
node -e "console.log(require('@sanity/blueprints-jsonschemas'))"
```

## Troubleshooting

### NPM Token Issues
- Ensure `NPM_PUBLISH_TOKEN` is set in GitHub organization secrets
- Token must have publish permissions for `@sanity` scope

### Tag Already Exists
- Delete the tag locally and remotely:
  ```bash
  git tag -d v1.0.0
  git push origin :refs/tags/v1.0.0
  ```

### Failed Tests
- Fix the failing tests before attempting release
- The `prepublishOnly` script will prevent publishing if tests fail