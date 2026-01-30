#!/usr/bin/env bun
// @ts-nocheck
import { createCliRenderer } from '@opentui/core';
import { createRoot } from '@opentui/react';
import { homedir } from 'os';
import { readFile } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { MultiRepoApp } from './src/MultiRepoApp';
import { setTheme } from './src/theme';

const execAsync = promisify(exec);

// Load theme preference from config
const CONFIG_PATH = `${homedir()}/.gitarborrc`;

async function checkGitInstalled(): Promise<boolean> {
  try {
    await execAsync('git --version');
    return true;
  } catch {
    return false;
  }
}

async function isGitRepository(path: string): Promise<boolean> {
  try {
    await execAsync('git rev-parse --git-dir', { cwd: path });
    return true;
  } catch {
    return false;
  }
}

async function loadThemePreference() {
  try {
    const config = await readFile(CONFIG_PATH, 'utf-8');
    const configData = JSON.parse(config);
    if (configData.theme) {
      setTheme(configData.theme);
    }
  } catch {
    // Config doesn't exist or is invalid - use default theme
  }
}

// Check if git is installed before starting the app
const hasGit = await checkGitInstalled();
if (!hasGit) {
  console.error('Error: git is not installed or not in PATH');
  console.error('Please install git and try again');
  console.error('\nInstallation instructions:');
  console.error('  macOS:   brew install git');
  console.error('  Linux:   sudo apt-get install git  (or equivalent)');
  console.error('  Windows: https://git-scm.com/download/win');
  process.exit(1);
}

// Check if current directory is a git repository
const cwd = process.cwd();
const isRepo = await isGitRepository(cwd);
if (!isRepo) {
  console.error('Error: Not a git repository');
  console.error(`The directory '${cwd}' is not a git repository.`);
  console.error('\nTo initialize a new git repository, run:');
  console.error('  git init');
  process.exit(1);
}

// Load theme before starting the app
await loadThemePreference();

// Create the CLI renderer (async)
const renderer = await createCliRenderer({
  exitOnCtrlC: false, // We handle Ctrl+C in the app
  useAlternateScreen: true, // Enable fullscreen mode with alternate buffer
});

// Create and mount the React root
const root = createRoot(renderer);
root.render(<MultiRepoApp initialCwd={cwd} />);

// Clean exit handler
const cleanExit = () => {
  root.unmount();
  renderer.destroy();
  process.exit(0);
};

// Handle cleanup on exit signals
process.on('SIGINT', cleanExit);
process.on('SIGTERM', cleanExit);

// Export cleanExit for use in App component
(globalThis as any).__gitarborCleanExit = cleanExit;
