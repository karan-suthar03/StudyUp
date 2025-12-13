const { execSync } = require('child_process');
const path = require('path');

process.env.DATABASE_URL = 'postgresql://studyup:studyup@localhost:5432/studyup?schema=public';
process.chdir(path.join(__dirname, 'backend'));

try {
  console.log('Running Prisma db push...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('Database schema updated successfully!');
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
}
