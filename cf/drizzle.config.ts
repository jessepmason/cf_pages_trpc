import { defineConfig, } from 'drizzle-kit';
import 'dotenv/config'

console.log('process.env',process.env.LOCAL_DB_PATH)



export default  process.env.LOCAL_DB_PATH ? defineConfig({
  schema: './d1/schema.ts',
  out: './d1/migrations',
  dialect: 'sqlite', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.LOCAL_DB_PATH,
  },

}) : defineConfig({
  schema: './d1/schema.ts',
  out: './d1/migrations',
  dialect: 'sqlite', // 'postgresql' | 'mysql' | 'sqlite'
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  }

});