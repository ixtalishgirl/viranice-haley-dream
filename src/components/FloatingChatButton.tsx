import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import HaleyPopupChat from '@/components/HaleyPopupChat';

const FloatingChatButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open Haley chat"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg btn-sakura w-14 h-14 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      {open && (
        <HaleyPopupChat isOpen onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default FloatingChatButton;
