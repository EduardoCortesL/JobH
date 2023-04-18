import { useState } from 'react'

const CoverLetterResponse = ( props ) => {
  const [isCopied, setIsCopied] = useState(false)
  let coverLetter = props.value;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter)
    setIsCopied(true)
  }

  function formatCoverLetter(text) {
    const paragraphs = text.split("\n\n");
    const formattedParagraphs = paragraphs.map(
      (paragraph) => `<p>${paragraph}</p>`
    );
    const formattedText = formattedParagraphs.join("");
    const formattedLetter = `
        ${formattedText}
  
    `;
    return formattedLetter;
  }

  return (
    <div className="answer">  
        <div>
        <h2>Generated Cover Letter:</h2>
          <p>{formatCoverLetter(coverLetter)}</p>
        </div>
      <button onClick={copyToClipboard} disabled={isCopied} type="submit">
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  )
}

export default CoverLetterResponse;