import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Youtube, Copy, RefreshCw, Sparkles } from 'lucide-react';

const YouTubeTitleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const titleTemplates = [
    "{topic} - You Won't Believe What Happens Next!",
    "The Ultimate {topic} Guide That Everyone's Talking About",
    "I Tried {topic} for 30 Days - Here's What Happened",
    "Why {topic} is Taking Over the Internet Right Now",
    "{topic} Secrets That Pros Don't Want You to Know",
    "This {topic} Trick Will Change Your Life Forever",
    "React to {topic} - My Mind is BLOWN! 🤯",
    "Top 10 {topic} Tips That Actually Work in 2024",
    "{topic} Gone WRONG (Very Emotional) 😱",
    "How {topic} Made Me $10,000 in One Month"
  ];

  const generateTitles = () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const shuffled = [...titleTemplates].sort(() => Math.random() - 0.5);
      const generated = shuffled.slice(0, 6).map(template => 
        template.replace(/{topic}/g, topic)
      );
      setTitles(generated);
      setIsGenerating(false);
    }, 1500);
  };

  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
  };

  return (
    <Card className="glass-card max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 magic-text">
          <Youtube className="w-6 h-6" />
          <span>YouTube Title Generator</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Generate viral YouTube titles that get clicks! 🚀
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">What's your video about?</label>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter your topic (e.g., anime review, gaming tips...)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="glass-card border-neon-blue/20"
            />
            <Button 
              onClick={generateTitles}
              disabled={!topic.trim() || isGenerating}
              className="btn-sakura px-6"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {titles.length > 0 && (
          <div className="space-y-3 animate-fade-in">
            <h3 className="font-semibold magic-text">Generated Titles:</h3>
            {titles.map((title, index) => (
              <div key={index} className="glass-card p-4 rounded-lg group hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between space-x-3">
                  <p className="text-sm flex-1">{title}</p>
                  <div className="flex space-x-2">
                    <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30 text-xs">
                      SEO
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyTitle(title)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-center text-muted-foreground">
              Click copy button to use any title! ✨
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default YouTubeTitleGenerator;