import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Youtube, 
  Search, 
  TrendingUp, 
  Clock, 
  Shield, 
  Globe, 
  Image, 
  Star,
  FileText,
  Music,
  MessageSquare,
  Zap,
  Target,
  Share2,
  Heart,
  BarChart3,
  Camera,
  Languages
} from 'lucide-react';

const ToolsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tools', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'youtube', name: 'YouTube', icon: <Youtube className="w-4 h-4" /> },
    { id: 'content', name: 'Content', icon: <FileText className="w-4 h-4" /> },
    { id: 'ai', name: 'AI Magic', icon: <Zap className="w-4 h-4" /> },
    { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const tools = [
    {
      id: 1,
      name: 'Viral Prediction Tool',
      description: 'Predict if your content will go viral using advanced AI algorithms',
      icon: <TrendingUp className="w-6 h-6" />,
      category: 'ai',
      badge: 'Hot 🔥',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      name: 'YouTube Title Generator',
      description: 'Generate catchy, SEO-optimized titles that get clicks',
      icon: <Youtube className="w-6 h-6" />,
      category: 'youtube',
      badge: 'Popular',
      color: 'from-red-600 to-red-500'
    },
    {
      id: 3,
      name: 'Copyright Checker',
      description: 'Check if your content is copyright-free instantly',
      icon: <Shield className="w-6 h-6" />,
      category: 'content',
      badge: 'Essential',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      name: 'Trend Scanner',
      description: 'Discover trending topics and hashtags in real-time',
      icon: <Search className="w-6 h-6" />,
      category: 'analytics',
      badge: 'New ✨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 5,
      name: 'Watch Time Estimator',
      description: 'Calculate optimal video length for maximum engagement',
      icon: <Clock className="w-6 h-6" />,
      category: 'youtube',
      badge: 'Smart',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 6,
      name: 'AI Image Generator',
      description: 'Create stunning anime-style artwork with AI magic',
      icon: <Image className="w-6 h-6" />,
      category: 'ai',
      badge: 'Magic ⭐',
      color: 'from-sakura-primary to-purple-primary'
    },
    {
      id: 7,
      name: 'Viral Score Ranker',
      description: 'Rate and rank your content\'s viral potential',
      icon: <Star className="w-6 h-6" />,
      category: 'analytics',
      badge: 'Pro',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 8,
      name: 'Smart SEO Suggestions',
      description: 'Get AI-powered SEO recommendations for better reach',
      icon: <Target className="w-6 h-6" />,
      category: 'content',
      badge: 'SEO',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 9,
      name: 'Music Copyright Checker',
      description: 'Verify if music tracks are safe to use in your videos',
      icon: <Music className="w-6 h-6" />,
      category: 'content',
      badge: 'Audio',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 10,
      name: 'Comment Sentiment Analyzer',
      description: 'Analyze audience sentiment from comments using AI',
      icon: <MessageSquare className="w-6 h-6" />,
      category: 'analytics',
      badge: 'AI',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 11,
      name: 'AI Script Generator',
      description: 'Generate engaging video scripts with AI assistance',
      icon: <FileText className="w-6 h-6" />,
      category: 'ai',
      badge: 'Creative',
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 12,
      name: 'Universal Translator',
      description: 'Translate content to any language instantly',
      icon: <Languages className="w-6 h-6" />,
      category: 'content',
      badge: 'Global 🌍',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <section id="tools" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="magic-text">Magical AI Tools</span> ✨
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-poppins">
            Discover 32+ powerful AI tools designed by Haley to make your content creation journey magical. 
            From viral prediction to copyright checking - we've got you covered! 🚀
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center space-x-2 rounded-full px-6 py-3 transition-all duration-300
                ${selectedCategory === category.id 
                  ? 'btn-sakura' 
                  : 'glass-card hover:glass-card-hover text-foreground'
                }
              `}
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="glass-card-hover group cursor-pointer border-0">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <Badge className="bg-sakura-primary/20 text-sakura-primary border-sakura-primary/30">
                    {tool.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold font-poppins group-hover:text-sakura-primary transition-colors">
                  {tool.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 font-poppins">
                  {tool.description}
                </p>
                <Button className="w-full btn-haley text-sm">
                  Try Now <Zap className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold magic-text mb-4">Ready to Create Magic? ✨</h3>
            <p className="text-muted-foreground mb-6 font-poppins">
              Join thousands of creators who use Haley's tools to make viral content every day!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-sakura">
                <Heart className="w-5 h-5 mr-2" />
                Get All Tools Free
              </Button>
              <Button className="btn-purple">
                <Share2 className="w-5 h-5 mr-2" />
                Share with Friends
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;