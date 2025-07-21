import {join} from 'node:path'
import fs from 'node:fs'
import enhance from '@enhance/ssr'
import layout from './elements/bp-layout.mjs'
import sidebar from './elements/bp-sidebar.mjs'
import code from './elements/bp-code.mjs'
import json from './elements/bp-code-json.mjs'
import ts from './elements/bp-code-ts.mjs'
import debug from './elements/bp-debug.mjs'

let css = false // only read once on coldstart

export default function render ({html, state}) {
  if (!css)
    css = fs.readFileSync(join(process.cwd(), 'index.css')).toString()
  let h = enhance({
    elements: {
      'bp-layout': layout,
      'bp-sidebar': sidebar,
      'bp-code': code,
      'bp-code-json': json,
      'bp-code-ts': ts,
      'bp-debug': debug
    },
    initialState: { ...state }
  }) 
  return wrap({ css, body: h`<bp-layout>${ html }</bp-layout>` })
}

/** wraps rendered html in the minimum html document envelope */
function wrap ({title='Blueprints', css='', body=''}) {
  return `<!doctype html>
<html lang=en>
<head>
  <meta charset=utf-8>
  <meta name=viewport content=width=device-width,initial-scale=1>
  <title>${ title }</title>
  <link rel=icon href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKNSURBVHgB7Vc7chNBEB0DVS4CMEVsqYrYCogRnxgDBxBwgJUgRhYBZRKBDyAJcuELCGcuAlZcQDeQTiA5wtGyb8o99ba3Z+0A24le1ZZ3d2a6X7/+eLVx5+79zF0jbrhrxprApRDo9br+ughubm7e3rcW3rxuuZPViVutVubBJ4+brtNJ3PHxr8J7vPu8/8mvA9PpH//33taW+3t6WjaELtBXkrzLgPl8njWbTwtru7uvsjSdZgI8y1qz+Sy8x9nt2oOsll/9LwfZcrn0drWvEoFG46HfzEYsx7Lear0N5/As73fy5+7ex2BL3lcSAFsxgoMwEnPM0bBznOv3v4ZnwXh86O1VEhj/OAwHBsNRybFWRUjPZrOwzhEDaZoW0hQlgDydB1GFDUx+Hpl7LcdQiskHAthoAdGylJLvKtKxiEUp2GtQEJ4ASyiOkWN2gLzGOgGAjZhj6QLBYDAqEuC2k+JCtILJ5ChIyHWiz+gLNqxi5DQ47n2rqmUWDIbfMitFVmVbColK584BbkXPOI9YV3bMOYjHijJGtkTAilQDhB7lU68qz/recl4iYFW1NViSpBPO6GmH+263V1BCugep0aM9EEBhaMj0YlWkG2CMSQnR7TM1eD+n5ndeG1EFpPLRyyKZNmYVGO+HIhyATo1/n9dVtAZYIjYG5roF9dBBpAyreFlFkwC3UgxW73PraoA8/4et7AIxZrHnPOszepqyQlxDuhvM7wErEoxPy7Gvk/5BiagoxEqy9CYBPYQkCu5569qh3GuFeKJaZ2/x51m9Xgv3i8XCtdvvXXr2TVcF3ov78H3YTnKbdX+PdQsbXoYCibp7+eK5G46+u/+B3t4Hb7PduSCBq8b6l9GawD+Z9kfMcFxlwgAAAABJRU5ErkJggg==">
  <style>${ css }</style>
</head>
<body>${ body }</body></html>`
}

