export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const formData = req.body;
        const name = formData.name;
        const companyName = formData.companyName;
        const jobDescription = formData.jobDescription;
        const cLetterPrompt = formData.cLetterPrompt;
        //const resume = formData.get('resume');
        //console.log(formData.jobDescription)
        var raw = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": cLetterPrompt
              },
              {
                "role": "user",
                "content": `Company Name: ${companyName} Job Description: ${jobDescription}.`
              }
            ],
            "temperature": 1,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "max_tokens": 1000,
            "presence_penalty": 0,
            "frequency_penalty": 0
          });

  
        // Make API call to Chat GPT
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json",
            "Authorization": process.env.API_KEY, // replace with your own API key
          },
          body: raw,
        });
  
        const data = await response.json();
        //console.log(data.choices[0].message.content)
        res.status(200).json({ coverLetter: data.choices[0].message.content });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  