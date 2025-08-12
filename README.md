# @sanity/blueprints-jsonschemas

JSON schemas for Sanity Blueprints configuration files.

## Installation

```bash
npm install @sanity/blueprints-jsonschemas
```

## Usage

```javascript
import schemas from '@sanity/blueprints-jsonschemas'

// Access individual schemas
const blueprintSchema = schemas.sanity.blueprint
const projectSchema = schemas.sanity.project
const httpsFunction = schemas.sanity.function.https

// Available schemas
console.log(schemas.sanity.blueprint)     // Blueprint schema
console.log(schemas.sanity.project)      // Project schema
console.log(schemas.sanity.app)          // App schema

// Function schemas
console.log(schemas.sanity.function.cron)     // Cron function
console.log(schemas.sanity.function.document) // Document function
console.log(schemas.sanity.function.event)    // Event function
console.log(schemas.sanity.function.https)    // HTTPS function
console.log(schemas.sanity.function.queue)    // Queue function
console.log(schemas.sanity.function.wss)      // WebSocket function

// Project sub-schemas (also available on project schema)
console.log(schemas.sanity.project.dataset)   // Dataset schema
console.log(schemas.sanity.project.origin)    // Origin schema
console.log(schemas.sanity.project.studio)    // Studio schema
console.log(schemas.sanity.project.webhook)   // Webhook schema
```

## Schema Validation

You can use these schemas with any JSON Schema validator:

```javascript
import Ajv from 'ajv'
import schemas from '@sanity/blueprints-jsonschemas'

const ajv = new Ajv()
const validate = ajv.compile(schemas.sanity.blueprint)

const isValid = validate({
  blueprintVersion: '2024-10-01',
  resources: [
    {
      name: 'my-project',
      type: 'sanity.project'
    }
  ]
})

if (!isValid) {
  console.log(validate.errors)
}
```

## Schema Versions

Current schema version: `2024-10-01`

All schemas follow the JSON Schema Draft 2020-12 specification.

## License

MIT