# 🔄 Augment Trial Reset

<div align="center">

<img src="assets/logo.svg" alt="Augment Trial Reset Logo" width="200"/>

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TrialLord/augment-trial-reset)](https://github.com/TrialLord/augment-trial-reset/releases)
[![GitHub](https://img.shields.io/github/license/TrialLord/augment-trial-reset)](https://github.com/TrialLord/augment-trial-reset/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/TrialLord/augment-trial-reset?style=social)](https://github.com/TrialLord/augment-trial-reset/stargazers)

*A professional tool for managing Augment extension trial periods*

</div>

## 📋 Overview

This tool provides a reliable solution for resetting the trial period of the Augment coding extension. It works seamlessly with both VS Code and Cursor editors, ensuring a smooth development experience.

## ✨ Features

- 🔄 **Trial Reset**: Reset your trial period to zero
- 🛠️ **Multi-Editor Support**: Works with both VS Code and Cursor
- 🔒 **Secure**: No data is sent to external servers
- 💾 **Backup System**: Automatically backs up your configuration
- 🎯 **Cross-Platform**: Compatible with Windows, macOS, and Linux

## 🚀 Quick Start

1. **Close Your Editor**
   ```bash
   # Save your work and close VS Code/Cursor
   ```

2. **Run the Tool**
   ```bash
   node augment-reset.js
   ```

3. **Create New Account**
   - Launch your editor
   - Create a new account with the provided email
   - Verify your email address

## 🔧 Technical Details

### Files Modified
- `state.json`: Trial state and configuration
- `subscription.json`: Subscription information
- `account.json`: Account settings

### System Requirements
- Node.js runtime
- VS Code or Cursor editor
- Administrative privileges (system-dependent)

## ⚠️ Important Notes

- Each reset requires a new account
- Limited to 2-3 trials per device
- Must be run with editor closed
- Trial counter resets to zero

## 🔒 Security Features

- Local file modifications only
- Automatic configuration backups
- No external data transmission
- Timestamped backup files

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is provided for educational purposes only. Use responsibly and in accordance with the extension's terms of service.

---

<div align="center">

Made with ❤️ by [TrialLord](https://github.com/TrialLord)

</div>
