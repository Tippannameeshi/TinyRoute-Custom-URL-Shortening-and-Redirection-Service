import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2, ShieldAlert } from 'lucide-react';

import { authApi } from '../api/authApi';
import { ROUTES } from '../constants/routes';

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email address...');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('This verification link is missing its token.');
      return;
    }

    let cancelled = false;
    authApi.verifyEmail(token)
      .then(({ data }) => {
        if (!cancelled) {
          setStatus('success');
          setMessage(data.message || 'Your email address has been verified.');
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setStatus('error');
          setMessage(error.response?.data?.message || 'This verification link is invalid or expired.');
        }
      });

    return () => { cancelled = true; };
  }, [searchParams]);

  const isSuccess = status === 'success';

  return <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
    <section className="app-surface w-full max-w-md rounded-xl p-8 text-center">
      <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-lg ${isSuccess ? 'bg-[color-mix(in_srgb,var(--color-success)_14%,transparent)] text-[var(--color-success)]' : status === 'error' ? 'bg-[color-mix(in_srgb,var(--color-danger)_14%,transparent)] text-[var(--color-danger)]' : 'bg-[var(--color-brand-soft)] text-[var(--color-brand)]'}`}>
        {status === 'loading' ? <Loader2 className="animate-spin" size={22} /> : isSuccess ? <CheckCircle2 size={22} /> : <ShieldAlert size={22} />}
      </div>
      <p className="eyebrow mt-6">Email verification</p>
      <h1 className="mt-2 text-2xl font-bold text-[var(--color-text)]">{isSuccess ? 'You are verified' : status === 'error' ? 'Verification failed' : 'Checking your link'}</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">{message}</p>
      {status !== 'loading' && <Link to={isSuccess ? ROUTES.LOGIN : ROUTES.HOME} className="mt-7 inline-flex rounded-lg bg-[var(--color-brand)] px-4 py-2.5 text-sm font-bold text-[var(--color-bg)]">{isSuccess ? 'Continue to sign in' : 'Return home'}</Link>}
    </section>
  </main>;
};
