import React from "react";
import { Message } from "semantic-ui-react";

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Message negative role="alert"><p>{message}</p></Message>
  );
};

export default ErrorMessage;
