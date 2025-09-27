import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TrendingUp, Sparkles, Target } from 'lucide-react';

const ViralPredictionTool = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePotential = async () => {
    if (!title.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const titleScore = Math.min(title.length * 2, 40);
      const keywordBonus = title.toLowerCase().includes('viral') || title.toLowerCase().includes('amazing') ? 20 : 0;
      const descBonus = description ? Math.min(description.length / 5, 20) : 0;
      const randomFactor = Math.random() * 20;
      
      const score = Math.min(Math.round(titleScore + keywordBonus + descBonus + randomFactor), 98);
      setPrediction(score);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-neon-green to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'High Viral Potential! 🚀';
    if (score >= 60) return 'Good Potential 📈';
    return 'Needs Improvement 💪';
  };

  return (
    <Card className="glass-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 magic-text">
          <TrendingUp className="w-6 h-6" />
          <span>Viral Prediction Tool</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Let Haley's AI predict how viral your content will be! ✨
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Content Title</label>
          <Input
            placeholder="Enter your amazing title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="glass-card border-neon-blue/20"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Description (Optional)</label>
          <Textarea
            placeholder="Tell us more about your content..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="glass-card border-neon-blue/20"
            rows={3}
          />
        </div>

        <Button 
          onClick={analyzePotential}
          disabled={!title.trim() || isAnalyzing}
          className="w-full btn-sakura"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Magic...
            </>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" />
              Predict Viral Score
            </>
          )}
        </Button>

        {prediction !== null && (
          <div className="glass-card p-6 rounded-xl text-center animate-fade-in">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getScoreColor(prediction)} text-white text-2xl font-bold mb-4`}>
              {prediction}%
            </div>
            <h3 className="text-xl font-bold magic-text mb-2">
              {getScoreText(prediction)}
            </h3>
            <p className="text-muted-foreground text-sm">
              Based on title optimization, keyword analysis, and AI magic! ✨
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ViralPredictionTool;