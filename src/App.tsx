import { HtmlHTMLAttributes, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JSZip from 'jszip'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const hundleFileInput = (e) => {
    const files = e.target.files
    console.log("発火");
    console.log(files);
    const zip = new JSZip();
    // const folder = zip.folder('download.zip');

    [...files].map(
      (file) => {zip.file(file.name, file)}
    )
    console.log("ZIP作成");
    console.log(zip);
    zip.generateAsync({type:"blob"})
    .then((zip)=>download(zip, files[0].name))
  }

  const download = (zip:Blob, fileName:string) => {
    console.log("ダウンロード発火");
    console.log(zip);
    const url = window.URL.createObjectURL(zip);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName + '_etc.zip');
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <input type="file" multiple onChange={(e) => hundleFileInput(e)}/>
    </>
  )
}

export default App
