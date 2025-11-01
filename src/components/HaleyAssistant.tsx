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
    "Need help with anything? I'm here! ✨",
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

  return null;
};

export default HaleyAssistant;