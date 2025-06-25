# Changelog

## [2.1.0] - 2025-06-24
### Added
- Identity file wipe for both VS Code and Cursor (logs, history, workspaceStorage) to further reduce tracking and improve reset reliability.
- Warning if a trial period greater than 14 days is specified; tool will cap at 14 days.
- Important notes/disclaimer section in the website and documentation.

### Changed
- Enforced a maximum trial period of 14 days (matching the extension's actual behavior).
- Updated website and documentation to reflect new features and limitations.

### Fixed
- Improved aggressive data wipe and randomized user/device info for each reset.

---

## [2.0.0] - 2025-06-23
### Added
- Aggressive reset logic for all known Augment config, cache, and globalStorage data.
- Custom trial duration option (now capped at 14 days).
- Dry-run mode for previewing changes.
- Improved safety and backup system. 