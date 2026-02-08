import fs from 'fs';
import path from 'path';

export default async () => {
  const rootPath = process.cwd();
  const artifactsDir = path.join(rootPath, 'testAssets/artifacts');
  
  // List the specific subfolders your framework needs
  const subFolders = [
    'allure-results',
    'allure-report',
    'playwright-report',
    'test-results' // for videos/screenshots
  ];

  try {
    console.log('🧹 Cleaning artifacts from previous runs...');
    
    // Delete the whole artifacts directory if it exists
    if (fs.existsSync(artifactsDir)) {
      fs.rmSync(artifactsDir, { recursive: true, force: true });
    }

    // Create the base directory
    fs.mkdirSync(artifactsDir, { recursive: true });

    // Recreate all subfolders
    for (const folder of subFolders) {
      const folderPath = path.join(artifactsDir, folder);
      fs.mkdirSync(folderPath, { recursive: true });
    }

    console.log('✅ Artifacts directory and subfolders recreated.');
  } catch (error) {
    console.error('❌ Error during global setup cleanup:', error.message);
  }
};