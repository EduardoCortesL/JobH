export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      const name = formData.get('name');
      const companyName = formData.get('companyName');
      const jobDescription = formData.get('jobDescription');
      const resume = formData.get('resume');

      // Make API call to Chat GPT
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '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', // replace with your own API key
        },
        body: JSON.stringify({
          prompt: `Dear Hiring Manager,

I am writing to express my interest in the ${jobDescription} position at ${companyName}. I am confident that my skills and experience make me a strong candidate for the job.

${name}`,
          max_tokens: 150,
          n: 1,
          stop: '.',
        }),
      });

      const data = await response.json();
      res.status(200).json({ coverLetter: data.choices[0].text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
