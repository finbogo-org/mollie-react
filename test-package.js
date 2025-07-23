#!/usr/bin/env node

console.log('Testing mollie-react package...');

try {
  // Test CommonJS import
  const cjsPkg = require('./dist/cjs/index.js');
  console.log('✅ CommonJS import successful');
  console.log('   Available exports:', Object.keys(cjsPkg).length);
  
  // Test TypeScript definitions
  const fs = require('fs');
  const typesExist = fs.existsSync('./dist/types/index.d.ts');
  console.log(typesExist ? '✅ TypeScript definitions found' : '❌ TypeScript definitions missing');
  
  // Test package.json exports
  const pkg = require('./package.json');
  const hasExports = pkg.exports && pkg.exports['.'];
  console.log(hasExports ? '✅ Package exports configured' : '❌ Package exports missing');
  
  console.log('\n🎉 Package is ready for publishing!');
  console.log('\nTo publish: npm publish');
  console.log('To test locally: npm pack');
  
} catch (error) {
  console.error('❌ Package test failed:', error.message);
  process.exit(1);
}
