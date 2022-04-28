import { FcFile } from "react-icons/fc";

function FileIcon({ file }) {
  return (
  

      <div className="home-page-icons"><FcFile /><a href={file.url} download><p className="file-name">{file.fileName}</p></a></div>
   

  )
}

export default FileIcon