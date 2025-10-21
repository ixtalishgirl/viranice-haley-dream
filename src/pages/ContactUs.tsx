import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Send, Clock, Globe, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MagicalNavigation from '@/components/MagicalNavigation';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent! ✨",
      description: "We'll respond within 24-48 hours.",
    });
    setFormData({ name: '', email: '', subject: '', category: 'general', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contact ViraLux Support - Get Help Now</title>
        <meta name="description" content="Contact ViraLux for support, inquiries, or partnerships. Email: viraluxsupport@gmail.com" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <MagicalNavigation />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <Link to="/"><Button variant="ghost" className="mb-8"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold magic-text text-center mb-4">Get in Touch</h1>
            <p className="text-center text-muted-foreground text-lg mb-12">We're here to help! ✨</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Send Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  <Input placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
                  <Textarea placeholder="Message" rows={6} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required />
                  <Button type="submit" className="w-full btn-sakura"><Send className="w-4 h-4 mr-2" />Send</Button>
                </form>
              </div>
              <div className="space-y-6">
                <div className="glass-card p-6"><Mail className="w-8 h-8 text-neon-blue mb-3" /><h3 className="font-bold mb-2">Email</h3><a href="mailto:viraluxsupport@gmail.com" className="text-neon-blue hover:underline">viraluxsupport@gmail.com</a></div>
                <div className="glass-card p-6"><Clock className="w-8 h-8 text-neon-pink mb-3" /><h3 className="font-bold mb-2">Response Time</h3><p className="text-muted-foreground">24-48 hours</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
