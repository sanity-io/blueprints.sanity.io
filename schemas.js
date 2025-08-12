import app from './pages/schemas/2024-10-01/sanity.app.json' with { type: 'json' }
import blueprint from './pages/schemas/2024-10-01/sanity.blueprint.json' with { type: 'json' }

import cron from './pages/schemas/2024-10-01/sanity.function.cron.json' with { type: 'json' }
import document from './pages/schemas/2024-10-01/sanity.function.document.json' with { type: 'json' }
import event from './pages/schemas/2024-10-01/sanity.function.event.json' with { type: 'json' }
import https from './pages/schemas/2024-10-01/sanity.function.https.json' with { type: 'json' }
import queue from './pages/schemas/2024-10-01/sanity.function.queue.json' with { type: 'json' }
import wss from './pages/schemas/2024-10-01/sanity.function.wss.json' with { type: 'json' }

import project from './pages/schemas/2024-10-01/sanity.project.json' with { type: 'json' }
import dataset from './pages/schemas/2024-10-01/sanity.project.dataset.json' with { type: 'json' }
import origin from './pages/schemas/2024-10-01/sanity.project.origin.json' with { type: 'json' }
import studio from './pages/schemas/2024-10-01/sanity.project.studio.json' with { type: 'json' }
import webhook from './pages/schemas/2024-10-01/sanity.project.webhook.json' with { type: 'json' }

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
