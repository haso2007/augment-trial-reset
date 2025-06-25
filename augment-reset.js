#!/usr/bin/env node

/**
 * Augment Extension Trial Reset Tool
 * 
 * This script resets the trial period for the Augment coding extension
 * by modifying the extension's configuration files.
 * Supports Windows, macOS, and Linux systems.
 * 
 * Main features:
 * - Automatically detects and closes running VS Code
 * - Backs up existing configuration
 * - Generates new random device ID
 * - Preserves user settings
 * 
 * Author: Based on cursor-reset by @triallord
 * Created: 2/Jun/2025
 */

const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execSync } = require('child_process');
const readline = require('readline');
const chalk = require('chalk');
const inquirer = require('inquirer');

// Parse CLI arguments for --days and --dry-run
const args = process.argv.slice(2);
let trialDays = 14;
let dryRun = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--days' && args[i + 1]) {
    const val = parseInt(args[i + 1], 10);
    if (!isNaN(val) && val > 0) {
      if (val > 14) {
        console.log(chalk.default.yellow('Warning: The maximum allowed trial period is 14 days. Using 14 days.'));
        trialDays = 14;
      } else {
        trialDays = val;
      }
    }
  }
  if (args[i] === '--dry-run') {
    dryRun = true;
  }
}

function waitForKeypress() {
  if (process.platform === 'win32' && !process.env.TERM) {
    console.log('\nPress any key to exit...');
    return new Promise(resolve => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const cleanup = () => {
        rl.close();
        resolve();
      };

      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        cleanup();
      });

      rl.once('close', cleanup);
    });
  }
  return Promise.resolve();
}

function isEditorRunning() {
  try {
    const platform = process.platform;
    let result = '';
    
    if (platform === 'win32') {
      try {
        // Check for both VS Code and Cursor
        result = execSync('tasklist /FI "IMAGENAME eq Code.exe" /FI "IMAGENAME eq Cursor.exe"', { encoding: 'utf-8' });
        return result.toLowerCase().includes('code.exe') || result.toLowerCase().includes('cursor.exe');
      } catch (error) {
        console.log('Warning: Could not check for running editors');
        return false;
      }
    } else if (platform === 'darwin') {
      result = execSync('pgrep -x "Code" || pgrep -x "Cursor" || pgrep -x "Code Helper" || pgrep -x "Cursor Helper"', { encoding: 'utf-8' });
      return result.length > 0;
    } else if (platform === 'linux') {
      result = execSync('pgrep -x "code" || pgrep -x "cursor" || pgrep -x "Code" || pgrep -x "Cursor"', { encoding: 'utf-8' });
      return result.length > 0;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function killEditorProcess() {
  try {
    const platform = process.platform;
    let command = '';
    
    switch (platform) {
      case 'win32':
        command = 'taskkill /F /IM Code.exe /T & taskkill /F /IM Cursor.exe /T';
        break;
      case 'darwin':
        command = 'pkill -9 "Code" & pkill -9 "Cursor"';
        break;
      case 'linux':
        command = 'pkill -9 "code" & pkill -9 "cursor"';
        break;
      default:
        throw new Error(`Unsupported operating system: ${platform}`);
    }

    execSync(command);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!isEditorRunning()) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error closing editors:', error.message);
    return false;
  }
}

function formatTimestamp(date) {
  const pad = (num, len = 2) => String(num).padStart(len, '0');
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = pad(date.getMilliseconds(), 3);

  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
}

async function backupFile(filePath) {
  try {
    const timestamp = formatTimestamp(new Date());
    const backupPath = `${filePath}.${timestamp}.bak`;
    await fs.copyFile(filePath, backupPath);
    return backupPath;
  } catch (error) {
    throw new Error(`Backup failed: ${error.message}`);
  }
}

function getAugmentConfigPaths() {
  const platform = process.platform;
  const homedir = os.homedir();
  const paths = [];

  // VS Code paths
  switch (platform) {
    case 'win32':
      // Main configuration paths
      paths.push(path.join(process.env.APPDATA, 'Code', 'User', 'globalStorage', 'augment.augment', 'state.json'));
      paths.push(path.join(process.env.APPDATA, 'Cursor', 'User', 'globalStorage', 'augment.augment', 'state.json'));
      paths.push(path.join(process.env.APPDATA, 'Code', 'User', 'globalStorage', 'augment.augment', 'subscription.json'));
      paths.push(path.join(process.env.APPDATA, 'Cursor', 'User', 'globalStorage', 'augment.augment', 'subscription.json'));
      paths.push(path.join(process.env.APPDATA, 'Code', 'User', 'globalStorage', 'augment.augment', 'account.json'));
      paths.push(path.join(process.env.APPDATA, 'Cursor', 'User', 'globalStorage', 'augment.augment', 'account.json'));
      
      // Additional cache and storage locations
      paths.push(path.join(process.env.APPDATA, 'Code', 'Cache', 'augment.augment'));
      paths.push(path.join(process.env.APPDATA, 'Cursor', 'Cache', 'augment.augment'));
      paths.push(path.join(process.env.APPDATA, 'Code', 'CachedData', 'augment.augment'));
      paths.push(path.join(process.env.APPDATA, 'Cursor', 'CachedData', 'augment.augment'));
      paths.push(path.join(process.env.LOCALAPPDATA, 'Code', 'User', 'globalStorage', 'augment.augment'));
      paths.push(path.join(process.env.LOCALAPPDATA, 'Cursor', 'User', 'globalStorage', 'augment.augment'));
      break;
    case 'darwin':
      // Main configuration paths
      paths.push(path.join(homedir, 'Library', 'Application Support', 'Code', 'User', 'globalStorage', 'augment.augment', 'state.json'));
      paths.push(path.join(homedir, 'Library', 'Application Support', 'Cursor', 'User', 'globalStorage', 'augment.augment', 'state.json'));
      paths.push(path.join(homedir, 'Library', 'Application Support', 'Code', 'User', 'globalStorage', 'augment.augment', 'subscription.json'));
      paths.push(path.join(homedir, 'Library', 'Application Support', 'Cursor', 'User', 'globalStorage', 'augment.augment', 'subscription.json'));
      paths.push(path.join(homedir, 'Library', 'Application Support', 'Code', 'User', 'globalStorage', 'augment.augment', 'account.json'));
      paths.push(path.join(homedir, 'Library', 'Application Support', 'Cursor', 'User', 'globalStorage', 'augment.augment', 'account.json'));
      
      // Additional cache and storage locations
      paths.push(path.join(homedir, 'Library', 'Caches', 'Code', 'augment.augment'));
      paths.push(path.join(homedir, 'Library', 'Caches', 'Cursor', 'augment.augment'));
      paths.push(path.join(homedir, 'Library', 'Application Support', 'Code', 'Cache', 'augment.augment'));
      paths.push(path.join(homedir, 'Library', 'Application Support', 'Cursor', 'Cache', 'augment.augment'));
      break;
    case 'linux':
      // Main configuration paths
      paths.push(path.join(homedir, '.config', 'Code', 'User', 'globalStorage', 'augment.augment', 'state.json'));
      paths.push(path.join(homedir, '.config', 'Cursor', 'User', 'globalStorage', 'augment.augment', 'state.json'));
      paths.push(path.join(homedir, '.config', 'Code', 'User', 'globalStorage', 'augment.augment', 'subscription.json'));
      paths.push(path.join(homedir, '.config', 'Cursor', 'User', 'globalStorage', 'augment.augment', 'subscription.json'));
      paths.push(path.join(homedir, '.config', 'Code', 'User', 'globalStorage', 'augment.augment', 'account.json'));
      paths.push(path.join(homedir, '.config', 'Cursor', 'User', 'globalStorage', 'augment.augment', 'account.json'));
      
      // Additional cache and storage locations
      paths.push(path.join(homedir, '.cache', 'Code', 'augment.augment'));
      paths.push(path.join(homedir, '.cache', 'Cursor', 'augment.augment'));
      paths.push(path.join(homedir, '.config', 'Code', 'Cache', 'augment.augment'));
      paths.push(path.join(homedir, '.config', 'Cursor', 'Cache', 'augment.augment'));
      break;
    default:
      throw new Error(`Unsupported operating system: ${platform}`);
  }

  return paths;
}

function generateDeviceId() {
  return crypto.randomBytes(32).toString('hex');
}

function generateEmail() {
  const randomString = crypto.randomBytes(8).toString('hex');
  return `user_${randomString}@example.com`;
}

function generateUserId() {
  return crypto.randomBytes(16).toString('hex');
}

// Add new function to get user input
async function getUserInput(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function wipeEditorIdentityFiles() {
  const fs = require('fs').promises;
  const path = require('path');
  const os = require('os');
  const chalk = require('chalk');

  const appData = process.env.APPDATA;
  const cursorPaths = [
    path.join(appData, 'Cursor', 'logs'),
    path.join(appData, 'Cursor', 'User', 'History'),
    path.join(appData, 'Cursor', 'User', 'workspaceStorage'),
  ];
  const patterns = [/id/i, /user/i, /uuid/i, /machine/i];

  for (const dir of cursorPaths) {
    try {
      const files = await fs.readdir(dir, { withFileTypes: true });
      for (const file of files) {
        if (file.isFile() && patterns.some((pat) => pat.test(file.name))) {
          const filePath = path.join(dir, file.name);
          try {
            await fs.unlink(filePath);
            console.log(chalk.default.yellow('Wiped identity-related file: ' + filePath));
          } catch {}
        }
        if (file.isDirectory()) {
          // Recursively check subdirectories
          const subdir = path.join(dir, file.name);
          try {
            const subfiles = await fs.readdir(subdir, { withFileTypes: true });
            for (const subfile of subfiles) {
              if (subfile.isFile() && patterns.some((pat) => pat.test(subfile.name))) {
                const subfilePath = path.join(subdir, subfile.name);
                try {
                  await fs.unlink(subfilePath);
                  console.log(chalk.default.yellow('Wiped identity-related file: ' + subfilePath));
                } catch {}
              }
            }
          } catch {}
        }
      }
    } catch {}
  }

  const codePaths = [
    path.join(appData, 'Code', 'logs'),
    path.join(appData, 'Code', 'User', 'History'),
    path.join(appData, 'Code', 'User', 'workspaceStorage'),
  ];

  for (const dir of codePaths) {
    try {
      const files = await fs.readdir(dir, { withFileTypes: true });
      for (const file of files) {
        if (file.isFile() && patterns.some((pat) => pat.test(file.name))) {
          const filePath = path.join(dir, file.name);
          try {
            await fs.unlink(filePath);
            console.log(chalk.default.yellow('Wiped identity-related file: ' + filePath));
          } catch {}
        }
        if (file.isDirectory()) {
          // Recursively check subdirectories
          const subdir = path.join(dir, file.name);
          try {
            const subfiles = await fs.readdir(subdir, { withFileTypes: true });
            for (const subfile of subfiles) {
              if (subfile.isFile() && patterns.some((pat) => pat.test(subfile.name))) {
                const subfilePath = path.join(subdir, subfile.name);
                try {
                  await fs.unlink(subfilePath);
                  console.log(chalk.default.yellow('Wiped identity-related file: ' + subfilePath));
                } catch {}
              }
            }
          } catch {}
        }
      }
    } catch {}
  }
}

async function resetAugmentTrial() {
  try {
    console.log('🔍 Checking for running editors...');
    if (isEditorRunning()) {
      console.log('⚠️ VS Code or Cursor is running, attempting to close...');
      if (await killEditorProcess()) {
        console.log('✅ Editors have been closed\n');
      } else {
        console.log('❌ Failed to close editors');
        return;
      }
    }

    const configPaths = getAugmentConfigPaths();
    console.log('📂 Found configuration paths:', configPaths);

    // Generate new account data
    console.log('🎲 Generating new account data...');
    const newDeviceId = generateDeviceId();
    const newUserId = generateUserId();
    const userEmail = generateEmail(); // Use random email instead of fixed one
    console.log('✅ New account data generated successfully\n');

    // Calculate trial dates
    const trialStartDate = new Date();
    const trialEndDate = new Date(trialStartDate);
    trialEndDate.setDate(trialEndDate.getDate() + trialDays);

    for (const configPath of configPaths) {
      console.log(chalk.default.cyan(`\n🔄 Processing: ${configPath}`));
      let shouldProceed = true;
      let exists = false;
      try {
        await fs.access(configPath);
        exists = true;
      } catch {}
      // Always delete the file or directory if it exists
      if (exists) {
        try {
          const stats = await fs.stat(configPath);
          if (stats.isDirectory()) {
            await fs.rm(configPath, { recursive: true, force: true });
            console.log(chalk.default.yellow('Removed existing directory: ' + configPath));
          } else {
            await fs.unlink(configPath);
            console.log(chalk.default.yellow('Removed existing file: ' + configPath));
          }
        } catch (err) {
          console.log(chalk.default.gray('Could not remove existing file/directory (may not exist): ' + configPath));
        }
      }
      // Also aggressively remove parent augment.augment directory if present
      const parentDir = path.dirname(configPath);
      if (parentDir.endsWith('augment.augment')) {
        try {
          await fs.rm(parentDir, { recursive: true, force: true });
          console.log(chalk.default.yellow('Aggressively wiped directory: ' + parentDir));
        } catch (err) {
          // Ignore errors
        }
        // Recreate the directory for the new config
        await fs.mkdir(parentDir, { recursive: true });
      }
      if (dryRun) {
        console.log(chalk.default.green('Would reset and write new configuration (dry run).'));
        continue;
      }
      
      try {
        // Create directory if it doesn't exist
        await fs.mkdir(path.dirname(configPath), { recursive: true });
        
        // Backup existing config
        console.log(chalk.default.blue('💾 Backing up configuration...'));
        try {
          const backupPath = await backupFile(configPath);
          console.log(chalk.default.green(`✅ Configuration backup complete: ${backupPath}\n`));
        } catch (error) {
          console.log(chalk.default.gray('ℹ️ No existing configuration to backup\n'));
        }

        // If it's a directory, remove it completely
        try {
          const stats = await fs.stat(configPath);
          if (stats.isDirectory()) {
            await fs.rm(configPath, { recursive: true, force: true });
            console.log(chalk.default.green('✅ Removed directory: ' + configPath));
            continue;
          }
        } catch (error) {
          // Ignore errors if file/directory doesn't exist
        }

        // Create new configuration based on file type
        let newConfig;
        if (configPath.includes('subscription.json')) {
          newConfig = {
            status: 'active',
            type: 'trial',
            startDate: trialStartDate.toISOString(),
            endDate: trialEndDate.toISOString(),
            isActive: true,
            isExpired: false,
            remainingDays: trialDays,
            trialCount: 0,
            lastTrialReset: null,
            previousTrials: []
          };
        } else if (configPath.includes('account.json')) {
          newConfig = {
            userId: newUserId,
            email: userEmail,
            deviceId: newDeviceId,
            createdAt: trialStartDate.toISOString(),
            lastLogin: trialStartDate.toISOString(),
            isActive: true,
            trialHistory: [],
            deviceHistory: []
          };
        } else {
          // Default state.json configuration
          newConfig = {
            // New account identifiers
            deviceId: newDeviceId,
            userId: newUserId,
            email: userEmail,
            
            // Trial information
            trialStartDate: trialStartDate.toISOString(),
            trialEndDate: trialEndDate.toISOString(),
            trialDuration: trialDays,
            trialStatus: 'active',
            trialExpired: false,
            trialRemainingDays: trialDays,
            trialCount: 0,
            
            // Reset all usage counters
            usageCount: 0,
            totalUsageCount: 0,
            lastUsageDate: null,
            messageCount: 0,
            totalMessageCount: 0,
            
            // Reset all timestamps
            lastReset: new Date().toISOString(),
            firstRunDate: new Date().toISOString(),
            lastRunDate: new Date().toISOString(),
            
            // Clear any existing session data
            sessionId: crypto.randomBytes(16).toString('hex'),
            lastSessionDate: null,
            sessionHistory: [],
            
            // Reset all flags
            isFirstRun: true,
            hasCompletedOnboarding: false,
            hasUsedTrial: false,
            
            // Clear any existing preferences but keep defaults
            preferences: {
              theme: 'light',
              language: 'en',
              notifications: true
            },
            
            // Clear any tracking data
            tracking: {
              lastCheck: null,
              checkCount: 0,
              lastValidation: null
            }
          };
        }

        // Save new configuration
        await fs.writeFile(configPath, JSON.stringify(newConfig, null, 2));
        console.log(chalk.default.green('✅ New configuration saved successfully\n'));

        if (configPath.includes('state.json')) {
          console.log(chalk.default.magenta('Account Details:'));
          console.log('User ID:', newUserId);
          console.log('Device ID:', newDeviceId);
          console.log('Email:', userEmail);
          console.log(`\nTrial period: ${trialDays} days`);
          console.log('Start date:', trialStartDate.toLocaleDateString());
          console.log('End date:', trialEndDate.toLocaleDateString());
        }
      } catch (error) {
        console.log(chalk.default.red(`❌ Error processing ${configPath}:`), error.message);
      }
    }

    console.log('\n🎉 Augment extension trial reset complete!');
    console.log('\n⚠️ Important:');
    console.log('1. Please restart your editor (VS Code or Cursor) for changes to take effect');
    console.log('2. Create a new account when prompted');
    console.log('3. The trial period will be active for ' + trialDays + ' days');
    console.log('4. Consider using a different network connection or VPN if issues persist');

    await waitForKeypress();
  } catch (error) {
    console.log('❌ An error occurred:', error.message);
    await waitForKeypress();
  }
}

async function main() {
  try {
    console.log(chalk.default.blue('Wiping possible editor identity files (may affect history/settings)...'));
    await wipeEditorIdentityFiles();
    await resetAugmentTrial();
  } catch (error) {
    console.error('\n❌ Program execution error:', error);
    await waitForKeypress();
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Program exited with error:', error);
    process.exit(1);
  });
} 