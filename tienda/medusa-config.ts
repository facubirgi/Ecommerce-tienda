import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    backendUrl: process.env.BACKEND_URL,
    storefrontUrl: process.env.STORE_URL,
  },
  modules: {
    [Modules.PAYMENT]: {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/mercadopago",
            id: "mercadopago",
            options: {
              access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
              back_url_success: process.env.MERCADOPAGO_BACK_URL_SUCCESS,
              back_url_failure: process.env.MERCADOPAGO_BACK_URL_FAILURE,
              back_url_pending: process.env.MERCADOPAGO_BACK_URL_PENDING,
              notification_url: process.env.MERCADOPAGO_NOTIFICATION_URL,
            },
          },
        ],
      },
    },
  },
})