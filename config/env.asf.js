import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  releaseDestDir: path.resolve(__dirname, '../../echarts-website'),
  ecWWWGeneratedDir: path.resolve(__dirname, '../../echarts-www/_generated')
};
