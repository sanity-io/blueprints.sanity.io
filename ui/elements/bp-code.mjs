export default function code({ html, state }) {
  return html`
    <input
      type="radio"
      id="ts-${state.instanceID}"
      name="tab"
      value="ts"
      checked
    />
    <label for="ts-${state.instanceID}">TS</label>

    <input type="radio" id="json-${state.instanceID}" name="tab" value="json" />
    <label for="json-${state.instanceID}">JSON</label>

    <slot name="ts"></slot>
    <slot name="json"></slot>
  `
}
