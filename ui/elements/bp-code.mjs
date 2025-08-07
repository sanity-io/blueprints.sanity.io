export default function code({ html, state }) {
  return html`
    <form>
      <section class="inline-flex radius1 mbe0">
        <label class="cursor-pointer pb-7 pi-4 text-1 font-medium">
          <input
            type="radio"
            id="ts-${state.instanceID}"
            name="tab"
            value="ts"
            class="hidden"
            checked
          />
          TS
        </label>

        <label class="cursor-pointer pb-7 pi-4 text-1 font-medium">
          <input
            type="radio"
            id="json-${state.instanceID}"
            name="tab"
            value="json"
            class="hidden"
          />
          JSON
        </label>
      </section>
    </form>

    <slot name="ts"></slot>
    <slot name="json"></slot>
  `
}
