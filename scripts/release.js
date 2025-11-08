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
const languages = ['en', 'zh'];

console.log('Releasing theme builder...');

// Make sure directories exist
languages.forEach(lang => {
  fs.ensureDirSync(path.join(ecWWWGeneratedDir, lang, 'theme-builder'));
  fs.ensureDirSync(path.join(releaseDestDir, lang, 'theme-builder'));
});

// Clean up existing JS and CSS files in the releaseDestDir
console.log('Cleaning up old CSS and JS files...');
languages.forEach(lang => {
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

// Move app.html files to echarts-www body.html
console.log('Moving app.html files to echarts-www body.html...');
languages.forEach(lang => {
  fs.copySync(
    path.join(appDir, 'app.html'),
    path.join(ecWWWGeneratedDir, lang, 'theme-builder', 'body.html')
  );
});

// Move theme-builder files to website
console.log('Moving theme-builder files to echarts-website...');
languages.forEach(lang => {
  fs.copySync(
    path.join(appDir, 'theme-builder'),
    path.join(releaseDestDir, lang, 'theme-builder'),
    { overwrite: true }
  );
});

console.log('Release completed successfully!');
