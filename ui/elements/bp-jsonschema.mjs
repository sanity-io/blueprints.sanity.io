import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export default function jsonschema({ html, state }) {
  const pathToPages = join(process.cwd(), 'pages', state.attrs.src)
  const json = readFileSync(pathToPages).toString()
  return html` <a
      href="${state.attrs.src}"
      class="mbe0 p-4 radius1 text-1 font-medium"
    >
      ↗ Raw
    </a>
    <pre class="language-typescript text-1">${json}</pre>`
}
