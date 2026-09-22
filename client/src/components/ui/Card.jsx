import React from "react";
import { motion } from "framer-motion";

export const Card = ({
  children,
  className = "",
  hover = false,
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: `
      bg-[var(--color-surface)]
      border border-[var(--color-border)]
      shadow-[var(--shadow-sm)]
    `,

    glass: `
      bg-[color-mix(in_srgb,var(--color-surface)_86%,transparent)]
      backdrop-blur-xl border border-[var(--color-border)]
      shadow-[var(--shadow-md)]
    `,

    interactive: `
      bg-[var(--color-surface)] border border-[var(--color-border)]
      shadow-[var(--shadow-sm)] hover:border-[var(--color-brand)]/50
      hover:shadow-[var(--shadow-md)]
      cursor-pointer
    `,

    gradient: `
      bg-[var(--color-surface-raised)] text-[var(--color-text)]
      border border-[var(--color-border)] shadow-[var(--shadow-lg)]
    `,
  };

  return (
    <motion.div
      whileHover={
        hover || variant === "interactive"
          ? {
              y: -4,
              scale: 1.01,
              transition: {
                duration: 0.2,
              },
            }
          : {}
      }
      className={`
        rounded-xl
        overflow-hidden
        p-6
        transition-all
        duration-200
        ${variantStyles[variant] || variantStyles.default}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Card.Header = ({ children, className = "" }) => (
  <div className={`mb-5 space-y-1 ${className}`}>{children}</div>
);

Card.Title = ({ children, className = "" }) => (
  <h3
    className={`
      text-lg
      font-bold
      tracking-tight
      text-[var(--color-text)]
      ${className}
    `}
  >
    {children}
  </h3>
);

Card.Description = ({ children, className = "" }) => (
  <p
    className={`
      text-sm
      leading-6
      text-[var(--color-text-muted)]
      ${className}
    `}
  >
    {children}
  </p>
);

Card.Content = ({ children, className = "" }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = "" }) => (
  <div
    className={`
      mt-6
      pt-4
      border-t
      border-[var(--color-border)]
      flex
      items-center
      justify-between
      ${className}
    `}
  >
    {children}
  </div>
);
