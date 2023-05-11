import React, { useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
export default function JoinUs()
{
  const [fullName, setFullName] = useState('');
  const [residence, setResidence] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Full Name: ${fullName}, Place of Residence: ${residence}, Phone Number: ${phone}`);
    alert('Your registration has been accepted,we will get back to you as soon as possible');
  };

  return (<>
     <h1 className="h1_register"> Does not exist in the system?</h1> 
     <h1 className="h1_register">Want to register?</h1>
      <div className="form">
    <form onSubmit={handleSubmit} >
        <label>Want to hear more about our services?</label><br/><br/>
      <label htmlFor="fullName" ></label>
      <input
        placeholder="full name"
        type="text"
        id="fullName"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      /><br/><br/>

      <label htmlFor="residence"></label>
      <input
        placeholder="Place of Residence"
        type="text"
        id="residence"
        value={residence}
        onChange={(e) => setResidence(e.target.value)}
        required
      /><br/><br/>

      <label htmlFor="phone" ></label>
      <input
       placeholder="Phone Number"
        type="tel"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      /><br/><br/>
      <input type="checkbox"/>I agree to receive marketing messages by email/SMS<br/><br/>
      <button className="CallButton" type="submit">Call Me</button>
    </form>
    </div>
    <Link to='/home' className="back_to_home">Back To Home</Link>
  </>);
};