import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const src = path.join(root, 'public', 'coop-headers')
const dest = path.join(root, 'dist', '_headers')
if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest)
  console.log('Wrote dist/_headers for Netlify COOP (Firebase Google popup).')
}
