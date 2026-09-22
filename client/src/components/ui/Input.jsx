import React, { forwardRef, useId, useState } from "react";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

export const Input = forwardRef(
  (
    {
      label,
      error,
      success,
      helperText,
      icon: Icon = null,
      rightIcon: RightIcon = null,
      onRightIconClick,
      className = "",
      id,
      type = "text",
      isPassword = false,
      disabled = false,
      readOnly = false,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const passwordField = isPassword || type === "password";
    const [showPassword, setShowPassword] = useState(false);
    const inputType =
      passwordField && !showPassword
        ? "password"
        : passwordField
          ? "text"
          : type;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold tracking-wide text-[var(--color-text-muted)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-subtle)]"
            />
          )}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error || success || helperText ? helperId : undefined
            }
            className={`w-full rounded-lg border bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] shadow-[var(--shadow-sm)] outline-none transition placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-brand)] focus:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-60 read-only:bg-[var(--color-surface-soft)] ${Icon ? "pl-11" : ""} ${passwordField || RightIcon ? "pr-11" : ""} ${error ? "border-[var(--color-danger)]" : success ? "border-[var(--color-success)]" : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"} ${className}`}
            {...props}
          />
          {passwordField ? (
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)] transition hover:text-[var(--color-text)]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          ) : RightIcon ? (
            <button
              type="button"
              onClick={onRightIconClick}
              disabled={!onRightIconClick}
              aria-label="Input action"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)] transition hover:text-[var(--color-text)]"
            >
              <RightIcon size={16} />
            </button>
          ) : null}
        </div>
        {error && (
          <p
            id={helperId}
            className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-danger)]"
          >
            <AlertCircle size={14} />
            {error}
          </p>
        )}
        {!error && success && (
          <p
            id={helperId}
            className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-success)]"
          >
            <CheckCircle2 size={14} />
            {success}
          </p>
        )}
        {!error && !success && helperText && (
          <p id={helperId} className="text-xs text-[var(--color-text-subtle)]">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
