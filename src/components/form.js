import { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const cLetterPrompt = "You are a cover letter generator.You will be given a job description along with the job applicant's resume.You will write a cover letter for the applicant that matches their past experiences from the resume with the job description.rather than simply outlining the applicant's past experiences, you will give more detail and explain how those experiences will help the applicant succeed in the new job.You will write the cover letter in a modern, professional style without being too formal, as a software developer might do naturally."

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestBody = {
      name,
      companyName,
      jobDescription,
      cLetterPrompt
      // resume,
    };
    console.log(requestBody);
  
    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    const result = await res.json();
    setCoverLetter(result.coverLetter);
  };
  

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Get Cover letter</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="companyName">Company Name:</label>
        <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="jobDescription">Job Description:</label>
        <input type="text" id="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="resume">Resume:</label>
        <input type="file" id="resume" onChange={(e) => setResume(e.target.files[0])} />
      </div>
      <button type="submit">Submit</button>
      {coverLetter && (
        <div>
          <h2>Generated Cover Letter:</h2>
          <p>{coverLetter}</p>
        </div>
      )}
    </form>
  );
};

export default Form;
