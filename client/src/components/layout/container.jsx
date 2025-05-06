import React from "react";
import { cn } from "@/lib/utils";

const Container = ({
  children,
  size = "lg",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
          "max-w-none": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container; 