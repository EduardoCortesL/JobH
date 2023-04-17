import { useState } from 'react';
import CoverLetterResponse from './cLetterResponse';
import * as pdfjsLib from 'pdfjs-dist';
import { loadPdf } from '@/functions/textpdf';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const cLetterPrompt = "You are a cover letter generator.You will be given a job description along with the job applicant's resume.You will write a cover letter for the applicant that matches their past experiences from the resume with the job description.rather than simply outlining the applicant's past experiences, you will give more detail and explain how those experiences will help the applicant succeed in the new job.You will write the cover letter in a modern, professional style without being too formal, as a software developer might do naturally."


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
          console.log(text);
          const requestBody = {
            name,
            companyName,
            jobDescription,
            cLetterPrompt,
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
            <input type="file" id="resume"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <CoverLetterResponse value={coverLetter} />
        </div>
      )}
    </div>
  );
};

export default FormComponent;