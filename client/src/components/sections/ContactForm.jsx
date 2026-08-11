import { useState } from 'react';
import { Input, Textarea } from '../ui/Input.jsx';
import { Button } from '../ui/Button.jsx';
import { contactApi } from '../../services/api/contact.js';
import { apiErrorMessage } from '../../services/api/client.js';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const setField = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const validate = () => {
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'A valid email is required';
    if (values.message.trim().length < 10) next.message = 'Message should be at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setServerError('');
    try {
      await contactApi.submit(values);
      setStatus('success');
      setValues(EMPTY);
    } catch (err) {
      setStatus('error');
      setServerError(apiErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-glow">
      <h3 className="text-xl font-semibold text-text-primary">Send a message 🚀</h3>

      <Input placeholder="Your name" value={values.name} onChange={(e) => setField('name', e.target.value)} error={errors.name} required />
      <Input placeholder="Your email" type="email" value={values.email} onChange={(e) => setField('email', e.target.value)} error={errors.email} required />
      <Input placeholder="Subject" value={values.subject} onChange={(e) => setField('subject', e.target.value)} />
      <Textarea placeholder="Message" rows={4} value={values.message} onChange={(e) => setField('message', e.target.value)} error={errors.message} required />

      <Button type="submit" loading={status === 'submitting'} disabled={status === 'submitting'}>
        Send Message
      </Button>

      {status === 'success' && <p className="text-sm font-medium text-emerald-500">Message sent successfully — I'll get back to you soon!</p>}
      {status === 'error' && <p className="text-sm font-medium text-red-500">{serverError}</p>}
    </form>
  );
}
