export default function layout({ html }) {
  return html`
    <nav><h1><a href=/>blueprints.sanity.io</a></h1></nav>
    <bp-sidebar></bp-sidebar>
    <main><slot></main>
    <bp-debug></bp-debug>`
}
