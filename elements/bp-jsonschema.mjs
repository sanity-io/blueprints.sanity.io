import {join} from 'node:path'

export default function jsonschema ({ html, state }) {
  let json = fs.readFileSync(join(process.cwd(), 'pages', state.attrs.src)).toString()
  return html`<pre>${ json }</pre>`
}
