import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagicalNavigation from '@/components/MagicalNavigation';

const BlogPost = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <MagicalNavigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  March 15, 2024
                </span>
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Haley
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold magic-text mb-6">
                10 AI Tools That Will Transform Your Content Creation
              </h1>

              <div className="aspect-video overflow-hidden rounded-xl mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80"
                  alt="AI Tools"
                  className="w-full h-full object-cover"
                />
              </div>

              <Button variant="outline" className="btn-sakura">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                In today's digital landscape, content creators are constantly looking for ways to stand out and create engaging content that resonates with their audience. Artificial Intelligence has emerged as a game-changing tool that can supercharge your content creation process.
              </p>

              <h2 className="text-2xl font-bold text-neon-blue mt-8 mb-4">1. AI Writing Assistants</h2>
              <p>
                AI-powered writing tools have revolutionized how we approach content creation. These tools can help you brainstorm ideas, overcome writer's block, and refine your messaging to perfection.
              </p>

              <h2 className="text-2xl font-bold text-neon-blue mt-8 mb-4">2. Video Title Generators</h2>
              <p>
                Creating compelling titles is crucial for video content success. Our YouTube Title Generator uses advanced AI to create titles that are not only catchy but also optimized for search and click-through rates.
              </p>

              <h2 className="text-2xl font-bold text-neon-blue mt-8 mb-4">3. Viral Prediction Tools</h2>
              <p>
                Understanding what makes content go viral is no longer a mystery. AI-powered prediction tools analyze patterns across millions of successful posts to give you insights into your content's viral potential.
              </p>

              <h2 className="text-2xl font-bold text-neon-blue mt-8 mb-4">Why AI Tools Matter</h2>
              <p>
                The integration of AI in content creation isn't about replacing human creativity—it's about enhancing it. These tools help you work smarter, not harder, allowing you to focus on what truly matters: creating meaningful connections with your audience.
              </p>

              <div className="bg-accent/10 p-6 rounded-lg mt-8">
                <h3 className="font-bold text-xl mb-3">Key Takeaways</h3>
                <ul className="space-y-2">
                  <li>✨ AI tools enhance rather than replace human creativity</li>
                  <li>🚀 Proper use of AI can significantly boost content performance</li>
                  <li>💡 Understanding your audience is still the most important factor</li>
                  <li>🎯 Combine multiple AI tools for best results</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
