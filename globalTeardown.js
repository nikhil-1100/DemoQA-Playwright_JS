import { execSync } from 'child_process';
import path from 'path';

export default async () => {
  const allureResults = path.resolve('testAssets/artifacts/allure-results');
  const allureReport = path.resolve('testAssets/artifacts/allure-report');

  try {
    console.log('🚀 Generating NATIVE single-file Allure report...');
    
    // This command creates a single index.html that has everything inside it
    execSync(`npx allure generate "${allureResults}" --clean --single-file -o "${allureReport}"`, { stdio: 'inherit' });

    console.log('✅ Shareable report is ready at:', path.join(allureReport, 'index.html'));
  } catch (error) {
    console.error('❌ Native single-file generation failed. Your Allure CLI version might be too old.');
  }
};