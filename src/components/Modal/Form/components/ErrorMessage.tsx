import React from 'react';

interface IErrorMessage {
  error: string,
}

const ErrorMessage: React.FC<IErrorMessage> = ({ error }) => {
  return <p className="errorMessage">{error}</p>;
};

export default ErrorMessage;
