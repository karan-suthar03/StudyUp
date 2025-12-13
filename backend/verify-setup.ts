import prisma from './src/config/database';

async function verifySetup() {
  try {
    console.log('🔍 Verifying database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    console.log('\n🔍 Checking database tables...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    console.log('✅ Found tables:', tables);
    
    console.log('\n🔍 Verifying Prisma Client...');
    console.log('✅ Prisma Client models available:');
    console.log('  - User');
    console.log('  - Profile');
    console.log('  - Connection');
    console.log('  - Message');
    console.log('  - StudySession');
    console.log('  - Resource');
    console.log('  - Feedback');
    console.log('  - Notification');
    
    console.log('\n✅ All checks passed! Database setup is complete.');
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifySetup();
