import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagicalNavigation from '@/components/MagicalNavigation';

const PrivacyPolicy = () => {
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

        <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold magic-text mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">1. Information We Collect</h2>
              <p className="mb-4">
                At ViraLux | Haley's Dreamland, we collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (email, username)</li>
                <li>Usage data and preferences</li>
                <li>Content you create or share</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our services</li>
                <li>Personalize your experience</li>
                <li>Communicate with you about updates and features</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">3. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">4. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Opt-out of marketing communications</li>
                <li>Update your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:viraluxsuppurt@gmail.com" className="text-neon-blue hover:underline">
                  viraluxsuppurt@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
