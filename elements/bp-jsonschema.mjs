import {join} from 'node:path'

export default function jsonschema ({ html, state }) {
  let pathToPages = join(process.cwd(), 'pages', state.attrs.src)
  let json = fs.readFileSync(pathToPages).toString()
  return html`<a href=${state.attrs.src}>raw</a><pre class=langauge-typescript>${ json }</pre>`
}
