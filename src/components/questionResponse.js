import Head from 'next/head'
import { useState } from 'react';

const QuestionsResponse = (props) => {
  const [isCopied, setIsCopied] = useState(false)
  let coverLetter = props.value;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter)
    setIsCopied(true)
  }

  const formatResponse = (coverLetter) => {
    const questions = coverLetter.split("\n").filter((line) => line.trim().length > 0);
    let formattedResponse = '';
    for (let i = 0; i < 5; i++) {
      const question = questions[i];
      formattedResponse += `Q${i + 1}. ${question}\n`;
      formattedResponse += `Answer: \n\n`;
      if (i !== 4) {
        formattedResponse += '\n';
      }
    }
    return formattedResponse;
  };

  return (
    <div className="answer">  
        <div>
        <h2>Generated Questions:</h2>
          <p>{formatResponse(coverLetter)}</p>
        </div>
      <button onClick={copyToClipboard} disabled={isCopied} type="submit">
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  )
}

export default QuestionsResponse;
