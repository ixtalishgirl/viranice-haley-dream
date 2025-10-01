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

          <div className="space-y-8 text-foreground leading-relaxed">
            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">1. Introduction & Scope</h2>
              <p className="mb-4 text-lg">
                Welcome to ViraLux | Haley's Dreamland ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI-powered services, including our viral prediction tools, YouTube title generators, anime content discovery features, and AI assistant capabilities.
              </p>
              <p className="mb-4">
                We are committed to protecting your privacy and ensuring transparency about our data practices. This policy applies to all users of our platform, whether you're a visitor, registered user, or subscriber. By accessing or using ViraLux, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
              <p className="mb-4">
                This Privacy Policy is designed to comply with international data protection regulations including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other applicable privacy laws worldwide.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">2.1 Information You Provide Directly</h3>
              <p className="mb-4">We collect information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li><strong>Create an Account:</strong> Email address, username, password (encrypted), display name, profile picture, and demographic information (age, location, preferences)</li>
                <li><strong>Use Our Tools:</strong> Content you input into our AI tools (video titles, descriptions, keywords, images), search queries, tool preferences, and generation history</li>
                <li><strong>Communicate with Us:</strong> Messages sent through contact forms, support tickets, chat interactions with Haley Assistant, feedback submissions, and survey responses</li>
                <li><strong>Subscribe to Services:</strong> Payment information (processed securely through third-party payment processors), billing address, subscription preferences, and purchase history</li>
                <li><strong>Participate in Community:</strong> Forum posts, comments, ratings, reviews, shared content, and social interactions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">2.2 Information Collected Automatically</h3>
              <p className="mb-4">When you access ViraLux, we automatically collect certain information:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li><strong>Device Information:</strong> IP address, browser type and version, device type and model, operating system, screen resolution, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on pages, click patterns, scroll depth, navigation paths, referral sources</li>
                <li><strong>Performance Data:</strong> Tool usage statistics, generation success rates, loading times, error logs, API response times</li>
                <li><strong>Cookies and Tracking:</strong> Session cookies, preference cookies, analytics cookies, advertising cookies (with your consent)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">2.3 Information from Third Parties</h3>
              <ul className="list-disc pl-8 space-y-3">
                <li><strong>Social Media Integration:</strong> Profile information when you connect your social media accounts</li>
                <li><strong>Analytics Providers:</strong> Aggregated usage statistics and demographic data</li>
                <li><strong>Payment Processors:</strong> Transaction confirmation and payment status</li>
                <li><strong>API Partners:</strong> Data from integrated AI services and content platforms</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">3. How We Use Your Information</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">3.1 Primary Uses</h3>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li><strong>Service Delivery:</strong> Provide and maintain our AI-powered tools, process your requests, generate content predictions, deliver personalized recommendations</li>
                <li><strong>Account Management:</strong> Create and manage your account, authenticate users, process subscriptions, handle billing and payments</li>
                <li><strong>Personalization:</strong> Customize your experience, remember your preferences, provide relevant content suggestions, optimize tool performance</li>
                <li><strong>Communication:</strong> Send service updates, respond to inquiries, provide customer support, deliver newsletters and marketing communications (with consent)</li>
                <li><strong>Improvement & Development:</strong> Analyze usage patterns, develop new features, improve AI algorithms, enhance user experience, conduct research</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">3.2 Legal Basis for Processing (GDPR)</h3>
              <ul className="list-disc pl-8 space-y-3">
                <li><strong>Contractual Necessity:</strong> Processing necessary to fulfill our services to you</li>
                <li><strong>Legitimate Interests:</strong> Improving our services, security, and business operations</li>
                <li><strong>Consent:</strong> Marketing communications, cookies, and optional features</li>
                <li><strong>Legal Obligations:</strong> Compliance with applicable laws and regulations</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">4. Data Sharing & Disclosure</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">4.1 Third-Party Service Providers</h3>
              <p className="mb-4">We may share your information with trusted third-party service providers who assist us in:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Cloud hosting and data storage services</li>
                <li>AI and machine learning infrastructure providers</li>
                <li>Payment processing and billing services</li>
                <li>Analytics and performance monitoring tools</li>
                <li>Email delivery and communication platforms</li>
                <li>Customer support and ticketing systems</li>
                <li>Security and fraud prevention services</li>
              </ul>
              <p className="mb-6 italic">All service providers are contractually obligated to protect your data and use it only for specified purposes.</p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">4.2 Legal Requirements</h3>
              <p className="mb-4">We may disclose your information when required by law or to:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Comply with legal obligations, court orders, or government requests</li>
                <li>Enforce our Terms of Service and other agreements</li>
                <li>Protect our rights, property, or safety, and that of our users</li>
                <li>Investigate fraud, security issues, or technical problems</li>
                <li>Respond to claims of illegal content or violations</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">4.3 Business Transfers</h3>
              <p className="mb-4">
                In the event of a merger, acquisition, reorganization, sale of assets, or bankruptcy, your information may be transferred to the acquiring entity. We will notify you via email and/or prominent notice on our website of any such change in ownership.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">5. Data Security & Protection</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">5.1 Security Measures</h3>
              <p className="mb-4">We implement comprehensive security measures to protect your information:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li><strong>Encryption:</strong> SSL/TLS encryption for data in transit, AES-256 encryption for sensitive data at rest</li>
                <li><strong>Access Controls:</strong> Multi-factor authentication, role-based access, principle of least privilege</li>
                <li><strong>Infrastructure Security:</strong> Secure cloud hosting, firewalls, intrusion detection systems, DDoS protection</li>
                <li><strong>Monitoring:</strong> 24/7 security monitoring, automated threat detection, regular security audits</li>
                <li><strong>Compliance:</strong> Regular security assessments, penetration testing, compliance certifications</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">5.2 Data Retention</h3>
              <p className="mb-4">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Account data is retained while your account is active and for a reasonable period thereafter for backup and legal purposes.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">5.3 Limitations</h3>
              <p className="mb-4">
                While we strive to protect your information, no security system is impenetrable. We cannot guarantee absolute security of your data transmitted to our platform. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">6. Your Rights & Choices</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">6.1 Data Subject Rights</h3>
              <p className="mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li><strong>Right to Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal information ("right to be forgotten")</li>
                <li><strong>Right to Restriction:</strong> Limit how we use your information</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to certain types of processing, including direct marketing</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent at any time</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">6.2 Exercising Your Rights</h3>
              <p className="mb-4">
                To exercise any of these rights, please contact us at <a href="mailto:viraluxsuppurt@gmail.com" className="text-neon-blue hover:underline font-semibold">viraluxsuppurt@gmail.com</a>. We will respond to your request within 30 days (or as required by applicable law). We may need to verify your identity before processing certain requests.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">6.3 Cookie Preferences</h3>
              <p className="mb-4">
                You can control cookies through your browser settings. Note that disabling cookies may limit functionality on our platform. You can also opt-out of interest-based advertising through industry opt-out mechanisms.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">7. Children's Privacy</h2>
              <p className="mb-4 text-lg">
                ViraLux is not intended for children under the age of 13 (or 16 in the European Economic Area). We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately at <a href="mailto:viraluxsuppurt@gmail.com" className="text-neon-blue hover:underline font-semibold">viraluxsuppurt@gmail.com</a>, and we will take prompt steps to delete such information.
              </p>
              <p className="mb-4">
                Parents and guardians should monitor their children's internet usage and help enforce this Privacy Policy by instructing their children never to provide personal information without permission.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">8. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to, stored, and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer your information internationally, we ensure appropriate safeguards are in place, such as:
              </p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Privacy Shield frameworks (where applicable)</li>
                <li>Adequacy decisions by relevant authorities</li>
                <li>Your explicit consent to the transfer</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">9. AI & Machine Learning</h2>
              <p className="mb-4">
                Our platform uses artificial intelligence and machine learning technologies to provide intelligent content predictions and recommendations. Here's how we handle AI-related data:
              </p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li><strong>Training Data:</strong> We use aggregated, anonymized data to improve our AI models</li>
                <li><strong>User Content:</strong> Content you input into our tools is processed by AI but not shared publicly without your consent</li>
                <li><strong>Automated Decisions:</strong> Our AI makes content suggestions, but you retain full control over final decisions</li>
                <li><strong>Transparency:</strong> We're committed to explainable AI and will provide information about how our algorithms work upon request</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">10. Updates to This Privacy Policy</h2>
              <p className="mb-4 text-lg">
                We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or for other operational reasons. We will notify you of any material changes by:
              </p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Posting the updated policy on this page with a new "Last Updated" date</li>
                <li>Sending you an email notification (for significant changes)</li>
                <li>Displaying a prominent notice on our platform</li>
              </ul>
              <p className="mb-4">
                We encourage you to review this Privacy Policy periodically. Your continued use of ViraLux after any changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section className="animate-fade-in bg-gradient-to-r from-neon-blue/10 to-neon-pink/10 p-6 rounded-lg border border-neon-blue/20">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">11. Contact Information & Data Protection Officer</h2>
              <p className="mb-4 text-lg">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please don't hesitate to contact us:
              </p>
              <div className="space-y-3 text-lg">
                <p><strong className="text-neon-pink">Email:</strong> <a href="mailto:viraluxsuppurt@gmail.com" className="text-neon-blue hover:underline font-semibold">viraluxsuppurt@gmail.com</a></p>
                <p><strong className="text-neon-pink">Subject Line:</strong> "Privacy Policy Inquiry" or "Data Rights Request"</p>
                <p><strong className="text-neon-pink">Response Time:</strong> We aim to respond to all inquiries within 48-72 hours</p>
              </div>
              <p className="mt-6 text-sm text-muted-foreground italic">
                For EU residents: You have the right to lodge a complaint with your local supervisory authority if you believe our processing of your personal data violates applicable law.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
