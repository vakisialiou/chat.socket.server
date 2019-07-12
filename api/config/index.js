import fs from 'fs'
import path from 'path'
import yml from 'js-yaml'

export const config = yml.safeLoad(fs.readFileSync(path.join(__dirname, './api.config.yml'), 'utf8'))