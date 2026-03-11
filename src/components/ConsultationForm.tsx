'use client';

import { useState, FormEvent } from 'react';

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = value as string; });
    console.log('Lead captured:', data);
    setSubmitted(true);
  }

  return (
    <div className="form-split__form">
      {!submitted ? (
        <form className="consultation-form" id="consultationForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" placeholder="(555) 000-0000" />
          </div>
          <div className="form-group">
            <label htmlFor="interest">I&apos;m interested in...</label>
            <select id="interest" name="interest" required defaultValue="">
              <option value="" disabled>Select one</option>
              <option value="buying">Buying a home</option>
              <option value="selling">Selling my home</option>
              <option value="both">Buying and selling</option>
              <option value="investing">Investment property</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Anything else you&apos;d like to share?</label>
            <textarea id="message" name="message" rows={3} placeholder="Timeline, budget, neighborhood preferences..."></textarea>
          </div>
          <button type="submit" className="btn btn--accent btn--lg btn--full">Book My Free Consultation</button>
          <p className="form-privacy"><i className="ph ph-lock-simple"></i> Your info is private and will never be shared.</p>
        </form>
      ) : (
        <div className="form-success">
          <i className="ph ph-check-circle"></i>
          <h3>You&apos;re all set.</h3>
          <p>Jessica will be in touch within 24 hours to schedule your free consultation. In the meantime, feel free to explore the Easton market data above.</p>
        </div>
      )}
    </div>
  );
}
