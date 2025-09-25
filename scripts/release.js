import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/env.asf.js';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appDir = path.resolve(__dirname, '../app');
const releaseDestDir = config.releaseDestDir;
const ecWWWGeneratedDir = config.ecWWWGeneratedDir;

console.log('Releasing theme builder...');

// Make sure directories exist
fs.ensureDirSync(path.join(ecWWWGeneratedDir, 'en', 'theme-builder'));
fs.ensureDirSync(path.join(ecWWWGeneratedDir, 'zh', 'theme-builder'));
fs.ensureDirSync(path.join(releaseDestDir, 'en', 'theme-builder'));
fs.ensureDirSync(path.join(releaseDestDir, 'zh', 'theme-builder'));

// Clean up existing JS and CSS files in the releaseDestDir
console.log('Cleaning up old CSS and JS files...');
['en', 'zh'].forEach(lang => {
  const themeBuilderDir = path.join(releaseDestDir, lang, 'theme-builder');
  if (fs.existsSync(themeBuilderDir)) {
    const files = fs.readdirSync(themeBuilderDir);
    files.forEach(file => {
      if (file.endsWith('.js') || file.endsWith('.css')) {
        const filePath = path.join(themeBuilderDir, file);
        console.log(`Removing: ${filePath}`);
        fs.removeSync(filePath);
      }
    });
  }
});

// Move body.html files
console.log('Moving body.html files to echarts-www...');
fs.copySync(
    path.join(appDir, 'en', 'body.html'),
    path.join(ecWWWGeneratedDir, 'en', 'theme-builder', 'body.html')
);
fs.copySync(
    path.join(appDir, 'zh', 'body.html'),
    path.join(ecWWWGeneratedDir, 'zh', 'theme-builder', 'body.html')
);

// Move theme-builder files to website
console.log('Moving theme-builder files to echarts-website...');
fs.copySync(
    path.join(appDir, 'en', 'theme-builder'),
    path.join(releaseDestDir, 'en', 'theme-builder'),
    { overwrite: true }
);
fs.copySync(
    path.join(appDir, 'zh', 'theme-builder'),
    path.join(releaseDestDir, 'zh', 'theme-builder'),
    { overwrite: true }
);

console.log('Release completed successfully!');
