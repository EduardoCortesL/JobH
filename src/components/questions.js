import { useState } from 'react';
import { loadPdf } from '@/functions/textpdf';
import QuestionsResponse from './questionResponse';


const QuestionsComponent = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const guidePrompt = "You are a interviewer for a company that I have applied. The focus is on engineering, based on the job description, my resume, the company name and position give me a set of 5 questions that I can use to practice for my interview. Also give me the answer for each one of the questions. "
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('resume');
    const file = fileInput.files[0];
    const reader = new FileReader();
    if(file instanceof Blob){
      reader.readAsDataURL(file);
    let base64String = '';
    reader.onload = () => {
      base64String = reader.result.split(',')[1];
      loadPdf(base64String)
        .then((text) => {
          const requestBody = {
            name,
            companyName,
            jobDescription,
            guidePrompt,
            resume: text,
          };
          console.log(requestBody);
          return requestBody;
        })
        .then((requestBody) => {
          fetch('/api/gpt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          })
            .then((res) => res.json())
            .then((result) => {
              setCoverLetter(result.coverLetter);
              setShowForm(false);
            })
            .catch((error) => {
              console.log(`${error.message}`);
            });
        })
        .catch((error) => {
          console.log(`${error.message}`);
        });
    };
  } else {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert';
    alertBox.innerHTML = 'Please upload a resume.';
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  }
  };
  

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Get Questions</h2>
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
            <input type="file" id="resume"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <QuestionsResponse value={coverLetter} />
        </div>
      )}
    </div>
  );
};

export default QuestionsComponent;