import React, { useState, useEffect } from 'react';

interface HaleyAssistantProps {
  isVisible?: boolean;
  mood?: 'happy' | 'excited' | 'helpful' | 'winking';
  position?: 'fixed' | 'relative';
  message?: string;
}

const HaleyAssistant: React.FC<HaleyAssistantProps> = ({ 
  isVisible = true, 
  mood = 'happy', 
  position = 'fixed',
  message 
}) => {
  const [currentMood, setCurrentMood] = useState(mood);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const haleyPhrases = [
    "Welcome to my dreamland! 🌸",
    "Need help with tools? I'm here! ✨",
    "Let's discover amazing anime together! 💖",
    "Want to create viral content? 🚀",
    "I love helping you succeed! 🌟",
    "This is where magic happens! ⭐"
  ];

  const [currentPhrase, setCurrentPhrase] = useState(haleyPhrases[0]);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(haleyPhrases[Math.floor(Math.random() * haleyPhrases.length)]);
    }, 5000);

    const moodInterval = setInterval(() => {
      const moods: typeof mood[] = ['happy', 'excited', 'helpful', 'winking'];
      setCurrentMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 3000);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(moodInterval);
    };
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    setShowMessage(true);
    setTimeout(() => {
      setIsAnimating(false);
      setShowMessage(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className={`${position === 'fixed' ? 'fixed bottom-8 right-8 z-50' : 'relative'} cursor-pointer`}>
      {/* Speech bubble */}
      {(showMessage || message) && (
        <div className="absolute bottom-full right-0 mb-4 max-w-xs">
          <div className="glass-card p-3 relative">
            <p className="text-sm font-medium text-center magic-text">
              {message || currentPhrase}
            </p>
            <div className="absolute bottom-0 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-card transform translate-y-full"></div>
          </div>
        </div>
      )}

      {/* Haley Character */}
      <div 
        onClick={handleClick}
        className="relative w-32 h-32 rounded-full p-1"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
          {/* Haley's Avatar */}
          <div className="relative">
            {/* Face */}
            <div className="w-16 h-16 bg-gradient-to-b from-pink-100 to-pink-50 rounded-full relative border-2 border-white/30">
              {/* Eyes */}
              <div className="absolute top-4 left-3 flex space-x-2">
                <div className="w-2 h-2 bg-haley-blue rounded-full"></div>
                <div className="w-2 h-2 bg-haley-blue rounded-full"></div>
              </div>
              
              {/* Mouth */}
              <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-sakura-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaleyAssistant;