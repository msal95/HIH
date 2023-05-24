import React from 'react';

function TruncatedText({ text, maxLength }) {
  const truncatedText = text.length > maxLength ? `${text.substring(0, maxLength)  }...` : text;

  return <p className="text-truncate">{truncatedText}</p>;
}

export default TruncatedText;
