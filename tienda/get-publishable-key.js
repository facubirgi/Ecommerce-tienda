const { Client } = require('pg');

async function getPublishableKey() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    
    // Primero, obtener las tablas disponibles
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%api%key%'
      ORDER BY table_name
    `);
    
    console.log('📊 Tablas relacionadas con API Keys encontradas:');
    tablesResult.rows.forEach(row => console.log('  -', row.table_name));
    console.log('');
    
    // Intentar obtener las API keys
    const result = await client.query(`
      SELECT ak.token, ak.title, ak.type, ak.created_at
      FROM api_key ak
      WHERE ak.type = 'publishable'
      ORDER BY ak.created_at DESC
      LIMIT 5
    `);
    
    console.log('\n========================================');
    console.log('📋 PUBLISHABLE API KEYS EN TU BASE DE DATOS:');
    console.log('========================================\n');
    
    if (result.rows.length === 0) {
      console.log('⚠️  No se encontraron publishable keys');
    } else {
      result.rows.forEach((row, index) => {
        console.log(`${index + 1}. ${row.title || 'Sin título'}`);
        console.log(`   Token: ${row.token}`);
        console.log(`   Creado: ${row.created_at}`);
        console.log('');
      });
      
      // Verificar si tienen sales channel asociado
      console.log('🔍 Verificando sales channels...\n');
      
      for (const row of result.rows) {
        const scCheck = await client.query(`
          SELECT paksc.publishable_key_id, sc.name as sales_channel_name
          FROM publishable_api_key_sales_channel paksc
          JOIN sales_channel sc ON paksc.sales_channel_id = sc.id
          WHERE paksc.publishable_key_id IN (
            SELECT id FROM api_key WHERE token = $1
          )
        `, [row.token]);
        
        console.log(`📌 ${row.title}:`);
        if (scCheck.rows.length > 0) {
          scCheck.rows.forEach(sc => {
            console.log(`   ✅ Sales Channel: ${sc.sales_channel_name}`);
          });
        } else {
          console.log('   ❌ NO TIENE SALES CHANNEL');
        }
      }
      
      console.log('\n✅ USAR ESTA KEY (la más reciente con Sales Channel):');
      console.log('========================================');
      console.log(`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${result.rows[0].token}`);
      console.log('========================================\n');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

getPublishableKey();
