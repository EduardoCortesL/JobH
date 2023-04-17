import Head from 'next/head'
import { useState } from 'react';

const QuestionsResponse = (props) => {
  const [isCopied, setIsCopied] = useState(false)
  let coverLetter = props.value;

  const copyToClipboard = () => {
      navigator.clipboard.writeText(coverLetter)
      setIsCopied(true)
  }

  return (
    <div className="answer">  
        <div>
        <h2>Generated Questions:</h2>
          <p>{coverLetter}</p>
        </div>
      <button onClick={copyToClipboard} disabled={isCopied} type="submit">
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  )
}

export default QuestionsResponse;
