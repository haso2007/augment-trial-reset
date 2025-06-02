# Augment Trial Reset Tool

This tool helps reset the trial period for the Augment coding extension by modifying the extension's configuration files. It works with both VS Code and Cursor editors.

## ⚠️ Important Notes

- This tool resets the trial by modifying device IDs and account information
- You will need to create a new account each time you use this tool
- The tool preserves your user settings while resetting the trial period
- Works on Windows, macOS, and Linux systems

## 🚀 How to Use

1. **Close VS Code/Cursor**
   - Make sure to save any work
   - The tool will attempt to close the editors automatically

2. **Run the Tool**
   ```bash
   node augment-reset.js
   ```

3. **Follow the Prompts**
   - Enter your email address when prompted
   - The tool will generate new account data
   - Wait for the process to complete

4. **Restart Your Editor**
   - Launch VS Code or Cursor
   - Create a new account with the email you provided
   - Check your email for the verification code
   - If you don't receive the code, check your spam folder

## 🔧 What the Tool Does

- Backs up existing configuration files
- Generates new device ID and user ID
- Resets trial period to 14 days
- Preserves user settings and preferences
- Clears usage counters and session data

## 📁 Files Modified

The tool modifies the following files:
- `state.json`
- `subscription.json`
- `account.json`

## ⚠️ Limitations

- You can only use 2-3 trials per device
- Each reset requires a new account
- The tool must be run with the editor closed
- Device trial counter is reset to zero

## 🔒 Security

- All configuration files are backed up before modification
- Backups are stored with timestamps
- No data is sent to external servers

## 🛠️ Requirements

- Node.js installed
- VS Code or Cursor editor
- Administrative privileges (for some systems)

## 📝 License

This tool is provided for educational purposes only. Use at your own risk.

## ⚠️ Disclaimer

This tool is not affiliated with Augment or its developers. Use responsibly and in accordance with the extension's terms of service.

## GitHub Actions
This project uses GitHub Actions for:
- Continuous Integration (CI)
- Automated deployments to GitHub Pages
- Automated releases
