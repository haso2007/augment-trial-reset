# 🔄 Augment Trial Reset

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
- 🕒 **Custom Trial Duration**: Use `--days N` to set your trial period
- 🧪 **Dry-Run Mode**: Use `--dry-run` to preview changes
- 🛡️ **Improved Safety**: Aggressively deletes all stale data before resetting

## 💰 Cost Savings

The Augment extension costs $20/month ($240/year). This tool helps you:
- Save $240 annually
- Get unlimited trial periods
- Access premium features for free
- No subscription required

## �� Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Close Your Editor**
   ```bash
   # Save your work and close VS Code/Cursor
   ```

3. **Run the Tool**
   ```bash
   node augment-reset.js [--days N] [--dry-run]
   ```
   - `--days N`: Set custom trial period (default: 14 days)
   - `--dry-run`: Preview changes without modifying files

4. **Create New Account**
   - Launch your editor
   - Create a new account with the provided email
   - Verify your email address

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
