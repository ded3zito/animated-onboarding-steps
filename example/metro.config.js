// Learn more https://docs.expo.dev/guides/monorepo/
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// The library lives one level up and is linked in, so Metro has to watch it.
config.watchFolders = [workspaceRoot];

// Resolve from the example first, then the workspace root. Hierarchical
// lookup stays on: pnpm's store is symlinked, so packages like expo need to
// walk up to their own nested node_modules to find their dependencies.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;
