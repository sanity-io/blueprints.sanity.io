export default function layout({ html }) {
  return html`
    <nav><h1><a href='/' class='font-semibold text-1 uppercase tracking2'>Sanity Blueprints</a></h1></nav>
    <bp-sidebar></bp-sidebar>
    <main><slot></main>
    <bp-debug></bp-debug>`
}
