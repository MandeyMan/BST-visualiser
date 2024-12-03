import React from 'react';

export const Card = ({ children, className = '' }) => {
  return <div className={`p-4 border rounded shadow ${className}`}>{children}</div>;
};

export const CardHeader = ({ children, className = '' }) => {
  return <div className={`mb-2 font-bold ${className}`}>{children}</div>;
};

export const CardContent = ({ children, className = '' }) => {
  return <div className={`${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = '' }) => {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
};
