# 🔄 Augment Trial Reset

**This repository is no longer maintained or updated.**

## Why is the tool no longer public?

To protect legitimate users and prevent automated monitoring, scraping, and abuse by third parties (including the Augment extension developers), the tool is now distributed only by request in a private repository.

## Access to the Tool

The Augment Trial Reset tool is now available only by request in a private repository.

**To request access:**
- Please message me directly on GitHub ([TrialLord](https://github.com/TrialLord)) and ask for access to the private repository.
- You will receive an invitation to the private repository if approved.

**Note:**
- The tool is no longer distributed publicly to prevent automated monitoring and abuse.
- Please do not share the tool or private repo link publicly.

---

Thank you for your understanding and support!

<div align="center">

<img src="assets/logo.svg" alt="Augment Trial Reset Logo" width="200"/>

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TrialLord/augment-trial-reset)](https://github.com/TrialLord/augment-trial-reset/releases)
[![GitHub](https://img.shields.io/github/license/TrialLord/augment-trial-reset)](https://github.com/TrialLord/augment-trial-reset/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/TrialLord/augment-trial-reset?style=social)](https://github.com/TrialLord/augment-trial-reset/stargazers)
[![Downloads](https://img.shields.io/github/downloads/TrialLord/augment-trial-reset/total)](https://github.com/TrialLord/augment-trial-reset/releases)

*A professional tool for managing Augment extension trial periods*

</div>

## 📋 Overview

This tool provides a reliable solution for resetting the trial period of the Augment coding extension. It works seamlessly with both VS Code and Cursor editors, ensuring a smooth development experience.

## ✨ Features

- 🔄 **Aggressive Trial Reset**: Wipes all known config and cache data for a true reset
- 🛠️ **Multi-Editor Support**: Works with both VS Code and Cursor
- 🔒 **Secure**: No data is sent to external servers
- 💾 **Backup System**: Automatically backs up your configuration
- 🎯 **Cross-Platform**: Compatible with Windows, macOS, and Linux
- 🕒 **Custom Trial Duration**: Use `--days N` to set your trial period (maximum 14 days; higher values will be capped)
- 🧹 **Identity File Wipe**: Removes identity-related files for both VS Code and Cursor to further reduce tracking
- 🛡️ **Improved Safety**: Aggressively deletes all stale data before resetting

## 💰 Cost Savings

The Augment extension costs $20/month ($240/year). This tool helps you:
- Save $240 annually
- Get unlimited trial periods
- Access premium features for free
- No subscription required

## 🔧 Technical Details

### Files Modified & Wiped
- `state.json`: Trial state and configuration
- `subscription.json`: Subscription information
- `account.json`: Account settings
- All related `augment.augment` folders in globalStorage, Cache, and CachedData

### System Requirements
- Node.js runtime
- VS Code or Cursor editor
- Administrative privileges (system-dependent)
- **Dependencies:** Run `npm install` to install required packages (`chalk`, `inquirer`)

## ⚠️ Important Notes

- Each reset requires a new account
- Resets the device trial counter to zero
- Must be run with editor closed
- The maximum allowed trial period is 14 days. If you specify a higher value, the tool will warn you and use 14 days instead.
- The tool now wipes identity-related files in both VS Code and Cursor config directories (logs, history, workspaceStorage) to further reduce tracking.

> **Note:** The custom trial duration feature is not guaranteed to work in all cases. The Augment extension may enforce trial limits server-side or change its validation methods at any time. This tool attempts to reset all local data, but results may vary depending on future updates to the extension.

## 🔒 Security Features

- Local file modifications only
- Automatic configuration backups
- No external data transmission
- Timestamped backup files

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is provided for educational purposes only. Use responsibly and in accordance with the extension's terms of service.

## 💡 Future Tools

We're planning to create more trial reset tools! Let us know which tools you'd like to see next:

- [Create an Issue](https://github.com/TrialLord/augment-trial-reset/issues/new) to suggest a tool
- Vote on existing suggestions by adding a 👍 reaction

Popular suggestions so far:
- JetBrains IDEs trial reset
- Adobe Creative Cloud trial reset
- Microsoft Office trial reset
- More VS Code extensions

---

<div align="center">

Made with ❤️ by [TrialLord](https://github.com/TrialLord)

</div>
