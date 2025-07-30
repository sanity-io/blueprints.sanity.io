import {join} from 'node:path'
import {readFileSync} from 'node:fs'

export default function jsonschema ({ html, state }) {
  const pathToPages = join(process.cwd(), 'pages', state.attrs.src)
  const json = readFileSync(pathToPages).toString()
  return html`<a href=${state.attrs.src}>raw</a><pre class=language-typescript>${json}</pre>`
}
