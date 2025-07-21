export default function layout ({ html }) {
  return html`
    <h1><a href=/>blueprints.sanity.io</a></h1>
    <section>
      <bp-sidebar></bp-sidebar>
      <main><slot></main>
    </section>
    <bp-debug></bp-debug>`
}
