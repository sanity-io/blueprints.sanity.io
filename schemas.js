import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const loadSchema = (filename) => JSON.parse(readFileSync(join(process.cwd(), 'pages/schemas/2024-10-01', filename), 'utf8'))

const app = loadSchema('sanity.app.json')
const blueprint = loadSchema('sanity.blueprint.json')

const cron = loadSchema('sanity.function.cron.json')
const document = loadSchema('sanity.function.document.json')
const event = loadSchema('sanity.function.event.json')
const https = loadSchema('sanity.function.https.json')
const queue = loadSchema('sanity.function.queue.json')
const wss = loadSchema('sanity.function.wss.json')

const project = loadSchema('sanity.project.json')
const dataset = loadSchema('sanity.project.dataset.json')
const origin = loadSchema('sanity.project.origin.json')
const studio = loadSchema('sanity.project.studio.json')
const webhook = loadSchema('sanity.project.webhook.json')

project.dataset = dataset
project.origin = origin
project.studio = studio
project.webhook = webhook

export default { 
  sanity: { 
    blueprint, 
    project,
    app,
    function: { 
      cron, document, event, https, queue, wss 
    }
  }
}
