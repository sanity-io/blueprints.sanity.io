export default function debug ({ html, state }) {
  return html`<!-- ${JSON.stringify(state, null, 2)} -->`
}
