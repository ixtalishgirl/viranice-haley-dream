import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Image, Download, Shield, Sparkles, Zap } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      name: 'Memory Vault',
      description: 'Save all your conversations with Haley forever. Export to JSON or TXT anytime.',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500',
      features: ['Unlimited chat history', 'Export conversations', 'Search through messages', 'Never lose a memory']
    },
    {
      id: 2,
      name: 'Creative Studio',
      description: 'Create and manage stunning thumbnails with AI assistance. Perfect for content creators.',
      icon: <Image className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      features: ['AI-powered generation', 'Public/private sharing', 'Organized library', 'Multiple formats']
    },
    {
      id: 3,
      name: 'Secure & Private',
      description: 'Your data is encrypted and protected. Only you have access to your memories.',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      features: ['End-to-end encryption', 'Private by default', 'GDPR compliant', 'You own your data']
    },
    {
      id: 4,
      name: 'Export Anytime',
      description: 'Download all your data in JSON or TXT format. Take your memories with you.',
      icon: <Download className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      features: ['One-click export', 'Multiple formats', 'Full data access', 'Easy backups']
    },
    {
      id: 5,
      name: 'AI Companion',
      description: 'Haley learns from your conversations and provides personalized assistance.',
      icon: <Sparkles className="w-6 h-4" />,
      color: 'from-purple-500 to-pink-500',
      features: ['Smart responses', 'Context awareness', 'Personality adaptation', '24/7 availability']
    },
    {
      id: 6,
      name: 'Lightning Fast',
      description: 'Powered by cutting-edge technology for instant responses and smooth experience.',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      features: ['Instant sync', 'Real-time updates', 'Fast search', 'Optimized performance']
    },
  ];

  return (
    <section id="features" className="py-12 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need in <span className="magic-text">One Place</span> ✨
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto text-lg">
            Haley Dreamland combines powerful features to help you save memories, create content, 
            and stay organized—all with your personal AI companion.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group border border-white/10"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2 magic-text">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-foreground/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-green mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass-card p-8 rounded-2xl text-center space-y-4 border border-white/10">
          <h3 className="text-2xl font-bold magic-text">
            Ready to Start Your Journey?
          </h3>
          <p className="text-foreground/80 max-w-xl mx-auto">
            Join Haley Dreamland today and experience the magic of having your own AI companion, 
            memory vault, and creative studio—all in one beautiful place!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button className="btn-sakura text-base px-8 py-3">
              Start Free
            </Button>
            <Button variant="outline" className="text-base px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
