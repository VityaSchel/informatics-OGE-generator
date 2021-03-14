window.plugins_loaded = false
let callbacks = []

window.python_load_compiler = function(){
  startCompilerLoading().then(() => {
    languagePluginLoader.then(function () {
      window.plugins_loaded = true
    })
  })
}

window.python_compile = function(f){
  pyodide.runPython(f)
  return pyodide.globals.__OUTPUT__
}

function startCompilerLoading(){
  return new Promise((resolve, reject) => {
    const pyodideURL = 'https://cdn.jsdelivr.net/pyodide/v0.16.1/full/pyodide.js'
    let script = document.createElement('script')
    script.src = pyodideURL
    script.addEventListener('load', () => {
      resolve()
    })
    document.querySelector('body').appendChild(script)
  })
}

function appendScript(url){
  return new Promise((resolve, reject) => {
    function _resolve(){
      resolve()
    }

    let script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    script.onreadystatechange = _resolve;
    script.onload = _resolve;
  })
}