export default function sidebar({ html, state }) {
  function active(path) {
    return path === state.store.path
      ? `href=${path} class="active pi-6 pb-7" aria-current="page"`
      : `href=${path} class="pi-6 pb-7"`
  }
  return html`
    <nav class="flex flex-col gap3 text-1 p0">
      <section class="flex flex-col">
        <h2 class="mbe-4 font-sans text-2 uppercase tracking2 font-semibold">Concepts</h2>
        <a ${active('/')}> Overview</a>
        <a ${active('/concepts/resources')}>Resources</a>
        <a ${active('/concepts/stacks')}>Stacks</a>
        <a ${active('/concepts/values')}>Values</a>
        <a ${active('/concepts/parameters')}>Parameters</a>
        <a ${active('/concepts/references')}>References</a>
        <a ${active('/concepts/outputs')}>Outputs</a>
      </section>

      <section class="flex flex-col">
        <h2 class="mbe-4 font-sans text-2 uppercase tracking2 font-semibold">Examples</h2>
        <a ${active('/examples/simple')}>Simple</a>
        <a ${active('/examples/kitchensink')}>Kitchen Sink</a>
      </section>

      <section class="flex flex-col font-mono">
        <h2 class="mbe-4 font-sans text-2 uppercase tracking2 font-semibold">Resources</h2>
        <a ${active('/reference/resources/sanity.blueprint')}><code>sanity.blueprint</code></a></li>
        <a ${active('/reference/resources/sanity.project')}><code>sanity.project</code></a></li>
        <hr>
        <a ${active('/reference/resources/sanity.project.origin')}><code>sanity.project.origin</code></a>
        <a ${active('/reference/resources/sanity.project.dataset')}><code>sanity.project.dataset</code></a>
        <a ${active('/reference/resources/sanity.project.studio')}><code>sanity.project.studio</code></a>
        <a ${active('/reference/resources/sanity.project.webhook')}><code>sanity.project.webhook</code></a>
        <hr>
        <a ${active('/reference/resources/sanity.function.document')}><code>sanity.function.document</code></a>
        <a ${active('/reference/resources/sanity.function.cron')}><code>sanity.function.cron</code></a>
        <a ${active('/reference/resources/sanity.function.event')}><code>sanity.function.event</code></a>
        <a ${active('/reference/resources/sanity.function.queue')}><code>sanity.function.queue</code></a>
        <a ${active('/reference/resources/sanity.function.https')}><code>sanity.function.https</code></a>
        <a ${active('/reference/resources/sanity.function.wss')}><code>sanity.function.wss</code></a>
      </section>

      <!--
      <section class="flex flex-col">
        <h2 class="mbe-4 font-sans text-2 uppercase tracking2 font-semibold">CLI</h2>
        <a ${active('/cli')}>Overview</a>
        <a ${active('/cli/add')}>add</a>
        <a ${active('/cli/config')}>config</a>
        <a ${active('/cli/dev')}>dev</a>
        <a ${active('/cli/deploy')}>deploy</a>
        <a ${active('/cli/destroy')}>destroy</a>
        <a ${active('/cli/info')}>info</a>
        <a ${active('/cli/init')}>init</a>
        <a ${active('/cli/logs')}>logs</a>
        <a ${active('/cli/plan')}>plan</a>
        <a ${active('/cli/stacks')}>stacks</a>
      </section>
      -->
    </nav>
  `
}
