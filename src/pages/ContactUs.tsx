import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MagicalNavigation from '@/components/MagicalNavigation';
import { useToast } from '@/hooks/use-toast';

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent! ✨",
      description: "We'll get back to you soon!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold magic-text mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have questions? We'd love to hear from you! 💖
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-neon-blue" />
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us more..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full btn-sakura">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-neon-blue" />
                  Direct Contact
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Support Email</h3>
                    <a 
                      href="mailto:viraluxsuppurt@gmail.com"
                      className="text-neon-blue hover:underline flex items-center"
                    >
                      viraluxsuppurt@gmail.com
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Response Time</h3>
                    <p className="text-muted-foreground">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Check out our FAQ section or chat with Haley Assistant for instant support!
                </p>
                <Link to="/">
                  <Button className="w-full btn-purple">
                    Chat with Haley ✨
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
