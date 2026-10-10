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
    <form onSubmit={handleSubmit} noValidate className="flex min-w-0 flex-col gap-4">
      <Input label="Your name" autoComplete="name" className="bg-card" value={values.name} onChange={(e) => setField('name', e.target.value)} error={errors.name} required />
      <Input label="Your email" type="email" autoComplete="email" className="bg-card" value={values.email} onChange={(e) => setField('email', e.target.value)} error={errors.email} required />
      <Input label="Subject" className="bg-card" value={values.subject} onChange={(e) => setField('subject', e.target.value)} />
      <Textarea label="Message" rows={5} className="bg-card" value={values.message} onChange={(e) => setField('message', e.target.value)} error={errors.message} required />

      <Button type="submit" size="lg" className="self-start" loading={status === 'submitting'} disabled={status === 'submitting'}>
        Send message
      </Button>

      <p role="status" className="min-h-6 text-sm font-medium">
        {status === 'success' && <span className="text-primary">Message sent. I'll get back to you soon.</span>}
        {status === 'error' && <span className="text-red-500">{serverError}</span>}
      </p>
    </form>
  );
}
