// server.js
// Production entrypoint for Hostinger Node.js hosting.
// Hostinger looks for a server.js file at the root directory to start the application.

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

try {
  // Load the compiled full-stack production server
  require('./dist/server.cjs');
} catch (err) {
  console.error("Error starting server: Make sure to run 'npm run build' first to compile the client assets and bundle the backend!");
  console.error(err);
  process.exit(1);
}
