const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://studyup:studyup@localhost:5432/studyup';

async function applyMigration() {
  const client = new Client({ connectionString });
  
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, 'backend', 'prisma', 'migrations', '20241208_init', 'migration.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Applying migration...');
    await client.query(migrationSQL);
    
    console.log('Migration applied successfully!');
    
    // Create the _prisma_migrations table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
        "id" VARCHAR(36) PRIMARY KEY,
        "checksum" VARCHAR(64) NOT NULL,
        "finished_at" TIMESTAMPTZ,
        "migration_name" VARCHAR(255) NOT NULL,
        "logs" TEXT,
        "rolled_back_at" TIMESTAMPTZ,
        "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "applied_steps_count" INTEGER NOT NULL DEFAULT 0
      );
    `);
    
    // Insert migration record
    await client.query(`
      INSERT INTO "_prisma_migrations" (id, checksum, migration_name, finished_at, applied_steps_count)
      VALUES (
        gen_random_uuid()::text,
        '${require('crypto').createHash('sha256').update(migrationSQL).digest('hex')}',
        '20241208_init',
        now(),
        1
      )
      ON CONFLICT DO NOTHING;
    `);
    
    console.log('Migration record created');
    
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

applyMigration();
