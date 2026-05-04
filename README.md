# setup-probitas

Set up your GitHub Actions workflow with [Probitas](https://github.com/probitas-test/probitas), a scenario-based testing framework.

## Usage

### Basic Setup

The simplest setup installs the latest stable Probitas version:

```yaml
- uses: probitas-test/setup-probitas@v2
```

### Full Example Workflow

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: probitas-test/setup-probitas@v2

      - name: Run Probitas tests
        run: probitas run
```

## Inputs

| Input | Description | Default |
|-------|-------------|---------|
| `deno-version` | The Deno version to install. Can be a semver version or range (e.g., `v2.x`, `^2`), `canary`, `lts`, or `rc`. | `v2.x` |
| `probitas-version` | The Probitas version to install from JSR. Can be a semver version or `latest`. | `latest` |
| `cache` | Cache downloaded modules & packages automatically in GitHub Actions cache. | `true` |
| `cache-hash` | A hash used as part of the cache key, which defaults to a hash of the `deno.lock` files. | |

## Outputs

| Output | Description |
|--------|-------------|
| `cache-hit` | A boolean indicating whether the cache was hit. |
| `deno-version` | The Deno version that was installed. |
| `probitas-version` | The Probitas version that was installed. |

## Examples

### Specify Version

```yaml
- uses: probitas-test/setup-probitas@v2
  with:
    probitas-version: "0.21.0"
```

### Matrix Testing

Test across multiple Probitas versions:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        probitas-version: ["latest", "0.20.0", "0.21.0"]
    steps:
      - uses: actions/checkout@v4

      - uses: probitas-test/setup-probitas@v2
        with:
          probitas-version: ${{ matrix.probitas-version }}

      - run: probitas run
```

### Run with Selectors and Tags

```yaml
- uses: probitas-test/setup-probitas@v2

- name: Run integration tests
  run: probitas run -s tag:integration

- name: Run with custom reporter
  run: probitas run --reporter json > results.json
```

### Multiple Operating Systems

```yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: probitas-test/setup-probitas@v2
      - run: probitas run
```

## How It Works

This action performs the following steps:

1. **Setup Deno**: Installs Deno (required runtime) via [denoland/setup-deno](https://github.com/denoland/setup-deno), with optional caching of `deno.lock` dependencies
2. **Install Probitas CLI**: Runs the official `install.sh` from the Probitas repository, which uses `deno install` to install the CLI from [JSR](https://jsr.io/@probitas/probitas) at the requested version
3. **Verify Installation**: Confirms Probitas is correctly installed and available in the PATH

## Versioning

This action follows semantic versioning. When a new version is released (e.g., `v2.0.0`), the following tags are automatically updated:

- `v2` - Points to the latest `v2.x.x` release
- `v2.0` - Points to the latest `v2.0.x` release

### Recommended Usage

```yaml
# Recommended: Use major version for automatic updates
- uses: probitas-test/setup-probitas@v2

# Alternative: Pin to major.minor for more control
- uses: probitas-test/setup-probitas@v2.0

# Alternative: Pin to exact version for maximum stability
- uses: probitas-test/setup-probitas@v2.0.0
```

Using `@v2` ensures you automatically receive bug fixes and new features within the v2 major version, while avoiding breaking changes.

## Related Projects

- [Probitas](https://github.com/probitas-test/probitas) - The Probitas framework and CLI

## License

See [LICENSE](LICENSE) file for details.
