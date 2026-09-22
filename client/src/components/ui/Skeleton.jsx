import React from "react";

export const Skeleton = ({
  className = "",
  circle = false,
  animate = true,
  variant = "default",
}) => {
  const variants = {
    default: "h-4 w-full",
    text: "h-4 w-full",
    title: "h-7 w-1/2",
    button: "h-10 w-28 rounded-xl",
    avatar: "h-12 w-12 rounded-full",
    card: "h-40 w-full rounded-2xl",
  };

  return (
    <div
      aria-hidden="true"
      className={`
        bg-slate-200
        dark:bg-slate-800

        ${
          circle
            ? "rounded-full"
            : variants[variant]?.includes("rounded")
            ? ""
            : "rounded-xl"
        }

        ${variants[variant] || ""}

        ${
          animate
            ? "animate-pulse"
            : ""
        }

        ${className}
      `}
    />
  );
};