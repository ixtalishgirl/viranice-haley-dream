import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagicalNavigation from '@/components/MagicalNavigation';

const blogPosts = [
  {
    id: 1,
    title: "10 AI Tools That Will Transform Your Content Creation",
    excerpt: "Discover the most powerful AI tools that can help you create viral content and boost your social media presence.",
    date: "March 15, 2024",
    author: "Haley",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    slug: "ai-tools-content-creation"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Viral YouTube Titles",
    excerpt: "Learn the secrets behind crafting irresistible YouTube titles that get clicks and views using our AI-powered generator.",
    date: "March 12, 2024",
    author: "Haley",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    slug: "viral-youtube-titles"
  },
  {
    id: 3,
    title: "Anime and AI: Creating the Perfect Blend",
    excerpt: "Explore how artificial intelligence is revolutionizing anime content creation and discovery.",
    date: "March 8, 2024",
    author: "Haley",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
    slug: "anime-ai-blend"
  },
  {
    id: 4,
    title: "Predicting Viral Content: The Science Behind the Algorithm",
    excerpt: "Understanding the mechanics of viral content and how our AI prediction tool can give you an edge.",
    date: "March 5, 2024",
    author: "Haley",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    slug: "predicting-viral-content"
  },
  {
    id: 5,
    title: "Building Your Dream Content Strategy with AI",
    excerpt: "A comprehensive guide to leveraging AI tools for creating a content strategy that works.",
    date: "March 1, 2024",
    author: "Haley",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    slug: "ai-content-strategy"
  },
  {
    id: 6,
    title: "The Future of Creative Work: AI as Your Assistant",
    excerpt: "How AI assistants like Haley are changing the landscape of creative work and productivity.",
    date: "February 28, 2024",
    author: "Haley",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    slug: "future-creative-work"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <MagicalNavigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold magic-text mb-4">ViraLux Blog</h1>
            <p className="text-muted-foreground text-lg">
              Insights, tips, and stories from Haley's Dreamland ✨
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group"
              >
                <div className="glass-card overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 group-hover:text-neon-blue transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-neon-blue font-semibold text-sm">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
