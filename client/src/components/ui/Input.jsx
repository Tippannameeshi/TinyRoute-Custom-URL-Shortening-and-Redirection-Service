import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = forwardRef(({
  label,
  error,
  success,
  helperText,
  icon: Icon = null,
  rightIcon: RightIcon = null,
  onRightIconClick,
  className = '',
  id,
  type = 'text',
  isPassword = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const isPasswordType = type === 'password' || isPassword;
  const computedType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Icon className="w-4 h-4 shrink-0" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={computedType}
          className={`w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border text-slate-900 dark:text-white rounded-xl placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${
            Icon ? 'pl-10' : ''
          } ${
            isPasswordType || RightIcon ? 'pr-10' : ''
          } ${
            error
              ? 'border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
              : success
              ? 'border-emerald-500 dark:border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          } ${className}`}
          {...props}
        />
        {isPasswordType ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        ) : RightIcon ? (
          <button
            type="button"
            onClick={onRightIconClick}
            disabled={!onRightIconClick}
            tabIndex={onRightIconClick ? 0 : -1}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            <RightIcon className="w-4 h-4" />
          </button>
        ) : null}
      </div>
      {error && (
        <p className="text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1">
          <span>{error}</span>
        </p>
      )}
      {!error && success && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
          <span>{success}</span>
        </p>
      )}
      {!error && !success && helperText && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
