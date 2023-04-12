export default async function handler(req, res) {
    const { name, companyName, jobDescription, resume } = req.body;
  
    // create the data object to send to the API
    const data = {
      context: `${name} works for ${companyName} and is interested in the following job: ${jobDescription}`,
      resume: resume
    };
  
    // make the API call using fetch
    try {
      const response = await fetch('https://api.openai.com/v1/engine/your-engine-id/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: 'The following is a cover letter written for a job application. Please complete the letter with appropriate content.',
          max_tokens: 1024,
          temperature: 0.7,
          n: 1,
          stop: ['Thank you for your time.', 'Sincerely,']
        })
      });
  
      const { choices } = await response.json();
      const { text } = choices[0];
  
      // send the generated text back to the client
      res.status(200).json({ coverLetter: text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
  