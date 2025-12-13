// Simple toast implementation without sonner dependency
import React from "react";

type ToasterProps = {
  className?: string;
};

const Toaster = ({ ...props }: ToasterProps) => {
  return <div {...props} />;
};

const toast = (message: string | { title?: string; description?: string }) => {
  console.log('Toast:', message);
};

export { Toaster, toast };