import { useState } from 'react'

const CoverLetterResponse = ( props ) => {
  const [isCopied, setIsCopied] = useState(false)
  let coverLetter = props.value;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter)
    setIsCopied(true)
  }

  return (
    <div className="answer">  
        <div>
        <h2>Generated Cover Letter:</h2>
          <p>{coverLetter}</p>
        </div>
      <button onClick={copyToClipboard} disabled={isCopied} type="submit">
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  )
}

export default CoverLetterResponse;