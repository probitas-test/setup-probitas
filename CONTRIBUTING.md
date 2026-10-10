# Contributing to setup-probitas

Thank you for your interest in contributing to setup-probitas!

## Development Setup

1. Fork and clone the repository
2. Make your changes
3. Test locally using the test workflow
4. Submit a pull request

## Testing

### Local Testing

You can test the action locally by creating a test workflow in your fork:

```yaml
name: Test Local Changes
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ./
      - run: probitas --version
```

### Running CI

The test workflow runs automatically on pull requests and tests:
- Installing the latest Probitas on Ubuntu (x64 and arm64), macOS and Windows
- Running a scenario with the installed binary
- Refusing Probitas 1.x with a pointer to `@v1`

## Release Process

When you're ready to release a new version:

### 1. Update Version References

If needed, update version references in documentation:
- README.md examples
- CONTRIBUTING.md

### 2. Create a Git Tag

```bash
# For a new major/minor/patch release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### 3. Create a GitHub Release

Go to the [Releases page](../../releases) and:
1. Click "Draft a new release"
2. Choose the tag you just pushed (e.g., `v1.0.0`)
3. Set the release title (e.g., `v1.0.0`)
4. Add release notes describing changes
5. Click "Publish release"

### 4. Automatic Tag Updates

When you publish the release, the [release workflow](../../actions/workflows/release.yml) will automatically:

- Update the `v1` tag to point to `v1.0.0`
- Update the `v1.0` tag to point to `v1.0.0`
- Create a summary showing the updated tags

This allows users to use:
- `@v1` - Always get the latest v1.x.x version
- `@v1.0` - Always get the latest v1.0.x version
- `@v1.0.0` - Pin to exact version

### Release Checklist

- [ ] All tests pass on main branch
- [ ] Version follows semantic versioning (vX.Y.Z)
- [ ] Release notes are clear and comprehensive
- [ ] Breaking changes are clearly documented
- [ ] Examples in README.md are up to date

## Code Style

- Use clear, descriptive variable names
- Keep shell scripts POSIX-compatible where possible
- Add comments for complex logic
- Follow existing formatting conventions

## Questions?

Feel free to open an issue for any questions or concerns.
