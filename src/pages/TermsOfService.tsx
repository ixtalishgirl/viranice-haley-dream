import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagicalNavigation from '@/components/MagicalNavigation';

const TermsOfService = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold magic-text mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">1. Acceptance of Terms</h2>
              <p>
                By accessing and using ViraLux | Haley's Dreamland, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">2. Use of Services</h2>
              <p className="mb-4">You agree to use our services only for lawful purposes. You must not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute malware or harmful content</li>
                <li>Harass or harm other users</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">3. User Content</h2>
              <p>
                You retain ownership of content you create using our tools. By using our services, you grant us a license to display, distribute, and promote your content within our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">4. AI Tools Usage</h2>
              <p>
                Our AI-powered tools are provided "as is" for creative and informational purposes. Results may vary, and we do not guarantee specific outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">5. Limitation of Liability</h2>
              <p>
                ViraLux shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-neon-blue">7. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at:{' '}
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

export default TermsOfService;
