import {join} from 'node:path'
import {readFileSync} from 'node:fs'
import arc from '@architect/functions'
import render from './ui/index.js'

const cache = {} // cache file reads between coldstarts

/** app router */
export const handler = arc.http(json, html)

async function json (req) {
  const isJSON = req.rawPath.includes('.json')
  if (!isJSON) return
  const json = readFileSync(join(process.cwd(), 'pages', req.rawPath)).toString()
  return { 
    statusCode: 200,
    isBase64Encoded: false,
    headers: { 'content-type': 'application/json' },
    body: json 
  }
}

async function html (req) {
  const path = req.path === '/' ? 'concepts/index.html' : req.path + '.html'
  if (!cache[req.rawPath]) {
    cache[req.rawPath] = 'not found'
    try {
      cache[req.rawPath] = readFileSync(join(process.cwd(), 'pages', path)).toString()
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
}
