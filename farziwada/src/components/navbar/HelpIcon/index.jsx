import React from 'react';
import { HelpCircle } from 'lucide-react';
import IconButton from '../../buttons/IconButton';

const HelpIcon = ({ onClick, title = "Fraud Awareness Guide" }) => {
  return (
    <IconButton
      onClick={onClick}
      title={title}
      variant="default"
    >
      <HelpCircle className="w-5 h-5" />
    </IconButton>
  );
};

export default HelpIcon; 