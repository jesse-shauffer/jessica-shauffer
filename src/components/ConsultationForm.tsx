'use client';

import { useState, FormEvent } from 'react';

interface ConsultationFormProps {
  source?: string;
}

export default function ConsultationForm({ source = 'homepage' }: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSending(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      interest: formData.get('interest') as string,
      message: formData.get('message') as string,
      source,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call Jessica directly.');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-success">
        <i className="ph ph-check-circle"></i>
        <h3>You&apos;re all set.</h3>
        <p>Jessica will be in touch within 24 hours to schedule your free consultation. In the meantime, feel free to explore the Easton market data above.</p>
      </div>
    );
  }

  return (
    <form className="consultation-form" id="consultationForm" onSubmit={handleSubmit}>
      {error && (
        <div className="form-error" role="alert">
          <i className="ph ph-warning-circle"></i> {error}
        </div>
      )}
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
      <button type="submit" className="btn btn--accent btn--lg btn--full" disabled={sending}>
        {sending ? 'Sending...' : 'Book My Free Consultation'}
      </button>
      <p className="form-privacy"><i className="ph ph-lock-simple"></i> Your info is private and will never be shared.</p>
    </form>
  );
}
