import { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('companyName', companyName);
    data.append('jobDescription', jobDescription);
    data.append('resume', resume);

    console.log(data)

    const res = await fetch('/api/gpt', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();

    console.log(result);
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
    </form>
  );
};

export default Form;
