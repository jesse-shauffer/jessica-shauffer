'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface ConsultationFormProps {
  source?: string;
}

/** Format raw digits as NXX-NXX-XXXX (US 10-digit) */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ConsultationForm({ source = 'homepage' }: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    const digits = formatted.replace(/\D/g, '');
    if (digits.length > 0 && digits.length < 10) {
      setPhoneError('Please enter a 10-digit US phone number.');
    } else {
      setPhoneError('');
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Final phone validation before submit
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) {
      setPhoneError('Please enter a valid 10-digit US phone number.');
      return;
    }

    setError('');
    setSending(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone,
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
    <form className="consultation-form" id="consultationForm" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="form-error" role="alert">
          <i className="ph ph-warning-circle"></i> {error}
        </div>
      )}

      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="fullName">
          Full Name <span className="required-star" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Your name"
          required
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">
          Email <span className="required-star" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@email.com"
          required
          autoComplete="email"
        />
      </div>

      {/* Phone — auto-dash, 10-digit US */}
      <div className="form-group">
        <label htmlFor="phone">
          Phone <span className="required-star" aria-hidden="true">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="617-949-1046"
          value={phone}
          onChange={handlePhoneChange}
          inputMode="numeric"
          maxLength={12}
          required
          autoComplete="tel"
          aria-describedby={phoneError ? 'phone-error' : undefined}
        />
        {phoneError && (
          <span id="phone-error" className="form-field-error" role="alert">
            {phoneError}
          </span>
        )}
      </div>

      {/* Interest */}
      <div className="form-group">
        <label htmlFor="interest">
          I&apos;m interested in... <span className="required-star" aria-hidden="true">*</span>
        </label>
        <select id="interest" name="interest" required defaultValue="">
          <option value="" disabled>Select one</option>
          <option value="buying">Buying a home</option>
          <option value="selling">Selling my home</option>
          <option value="both">Buying and selling</option>
          <option value="investing">Investment property</option>
          <option value="vacation">Vacation home</option>
          <option value="commercial">Commercial property</option>
          <option value="other">Something else</option>
        </select>
      </div>

      {/* Optional message */}
      <div className="form-group">
        <label htmlFor="message">Anything else you&apos;d like to share?</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Timeline, budget, neighborhood preferences..."
        ></textarea>
      </div>

      <button type="submit" className="btn btn--accent btn--lg btn--full" disabled={sending}>
        {sending ? 'Sending...' : 'Book My Free Consultation'}
      </button>
      <p className="form-privacy"><i className="ph ph-lock-simple"></i> Your info is private and will never be shared.</p>
    </form>
  );
}
