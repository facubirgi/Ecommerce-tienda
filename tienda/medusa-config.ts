import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// AGREGAMOS ESTO PARA DEPURAR (verás este mensaje en la consola)
console.log(">>> INTENTANDO CONECTAR A:", process.env.DATABASE_URL);

module.exports = defineConfig({
  projectConfig: {
    // IMPORTANTE: Aquí debe decir process.env.DATABASE_URL, no la URL escrita
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})