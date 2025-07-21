import {join} from 'node:path'
import arc from '@architect/functions'
import render from './ui.js'

const cache = {} // cache file reads between coldstarts

/** app router */
export let handler = arc.http(async function router (req) {
  let path = req.path === '/' ? 'concepts/index.html' : req.path + '.html'
  if (!cache[req.rawPath]) {
    cache[req.rawPath] = 'not found'
    try {
      cache[req.rawPath] = fs.readFileSync(join(process.cwd(), 'pages', path)).toString()
    }
    catch (e) {
      if (e.path.includes('com.chrome.devtools.json') === false) 
        console.log('RouterError:', e.path)
      return { 
        html: render({ html: cache[req.rawPath], state: { path: req.rawPath }}),
        code: 404
      }
    }
  }
  return { 
    html: render({ html: cache[req.rawPath], state: { path: req.rawPath }}) 
  }
})
