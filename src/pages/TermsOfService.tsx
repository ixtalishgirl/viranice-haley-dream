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

          <div className="space-y-8 text-foreground leading-relaxed">
            <section className="animate-fade-in bg-gradient-to-r from-neon-blue/5 to-neon-pink/5 p-6 rounded-lg border border-neon-blue/20">
              <p className="text-lg font-semibold mb-4">
                PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING VIRALUX | HALEY'S DREAMLAND. BY ACCESSING OR USING OUR PLATFORM, YOU AGREE TO BE BOUND BY THESE TERMS AND ALL APPLICABLE LAWS AND REGULATIONS.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">1. Acceptance of Terms & Agreement to Comply</h2>
              <p className="mb-4 text-lg">
                These Terms of Service ("Terms," "Agreement") constitute a legally binding agreement between you ("User," "you," or "your") and ViraLux | Haley's Dreamland ("ViraLux," "we," "us," or "our") governing your access to and use of our website, platform, AI-powered services, and related content (collectively, the "Services").
              </p>
              <p className="mb-4">
                By creating an account, accessing our platform, or using any of our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, along with our Privacy Policy, Cookie Policy, and any additional terms and conditions that may apply to specific features or services.
              </p>
              <p className="mb-4">
                <strong className="text-neon-pink">IF YOU DO NOT AGREE TO THESE TERMS, DO NOT ACCESS OR USE OUR SERVICES.</strong> Your continued use of the Services constitutes your acceptance of any modifications to these Terms.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 mt-6 text-neon-pink">1.1 Eligibility Requirements</h3>
              <ul className="list-disc pl-8 space-y-3">
                <li>You must be at least 13 years old (or 16 in the European Economic Area) to use our Services</li>
                <li>You must provide accurate, current, and complete information during registration</li>
                <li>You must have the legal capacity to enter into binding contracts</li>
                <li>Your use must comply with all applicable local, state, national, and international laws</li>
                <li>You must not be previously suspended or banned from using our Services</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">2. Account Registration & Security</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">2.1 Account Creation</h3>
              <p className="mb-4">
                To access certain features of ViraLux, you must create an account by providing:
              </p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Valid email address</li>
                <li>Secure password meeting our requirements</li>
                <li>Username and display name</li>
                <li>Optional profile information</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">2.2 Account Security</h3>
              <p className="mb-4">You are responsible for:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Maintaining the confidentiality of your password and account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access or security breaches</li>
                <li>Ensuring your account information remains accurate and up-to-date</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">2.3 Account Termination</h3>
              <p className="mb-4">
                We reserve the right to suspend or terminate your account at any time, without prior notice, for violations of these Terms, suspicious activity, or at our sole discretion. You may also terminate your account at any time by contacting us at <a href="mailto:viraluxsupport@gmail.com" className="text-neon-blue hover:underline">viraluxsupport@gmail.com</a>.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">3. Acceptable Use Policy</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">3.1 Permitted Uses</h3>
              <p className="mb-4">You may use ViraLux Services to:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Generate creative content ideas and predictions using our AI features</li>
                <li>Create and optimize YouTube titles, descriptions, and thumbnails</li>
                <li>Discover and explore anime content recommendations</li>
                <li>Interact with Haley Assistant for platform guidance</li>
                <li>Share and collaborate on content within the platform</li>
                <li>Access educational resources and blog content</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">3.2 Prohibited Activities</h3>
              <p className="mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li><strong>Illegal Activities:</strong> Use our Services for any unlawful purpose or in violation of any local, state, national, or international law</li>
                <li><strong>Intellectual Property Infringement:</strong> Upload, post, or transmit content that infringes patents, trademarks, copyrights, trade secrets, or other proprietary rights</li>
                <li><strong>Harmful Content:</strong> Distribute viruses, malware, spyware, ransomware, or any malicious code that could harm our Services or users</li>
                <li><strong>Harassment & Abuse:</strong> Harass, threaten, intimidate, impersonate, or harm other users or third parties</li>
                <li><strong>Spam & Manipulation:</strong> Send unsolicited messages, engage in spamming, or manipulate our algorithms unfairly</li>
                <li><strong>Unauthorized Access:</strong> Attempt to gain unauthorized access to our systems, servers, networks, or user accounts</li>
                <li><strong>Data Scraping:</strong> Use automated bots, scrapers, or crawlers to extract data from our platform without permission</li>
                <li><strong>Reverse Engineering:</strong> Decompile, disassemble, reverse engineer, or attempt to derive source code from our Services</li>
                <li><strong>Commercial Exploitation:</strong> Resell, redistribute, or commercialize our Services without authorization</li>
                <li><strong>False Information:</strong> Provide false, misleading, or fraudulent information during registration or use</li>
                <li><strong>Prohibited Content:</strong> Post content containing hate speech, violence, pornography, child exploitation, or other objectionable material</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">4. User-Generated Content & Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">4.1 Your Content Ownership</h3>
              <p className="mb-4">
                You retain all ownership rights to the content you create using our AI tools, including but not limited to titles, descriptions, ideas, and creative works ("User Content"). We do not claim ownership of your User Content.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">4.2 License Grant to ViraLux</h3>
              <p className="mb-4">
                By submitting User Content to our platform, you grant ViraLux a worldwide, non-exclusive, royalty-free, transferable, sublicensable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with providing and promoting our Services. This license exists only for the purpose of operating, developing, providing, and improving the Services.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">4.3 Content Responsibility</h3>
              <p className="mb-4">You represent and warrant that:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>You own or have obtained all necessary rights, licenses, and permissions for your User Content</li>
                <li>Your User Content does not violate any third-party rights, including intellectual property rights</li>
                <li>Your User Content complies with these Terms and all applicable laws</li>
                <li>You will indemnify ViraLux against any claims arising from your User Content</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">4.4 ViraLux Intellectual Property</h3>
              <p className="mb-4">
                All content, features, and functionality on ViraLux (including but not limited to text, graphics, logos, images, software, AI algorithms, and compilation) are the exclusive property of ViraLux and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">5. AI Tools & Services</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">5.1 Nature of AI Services</h3>
              <p className="mb-4">
                Our AI-powered tools use advanced machine learning algorithms to generate predictions, suggestions, and creative content. These tools are provided for creative, informational, and entertainment purposes.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">5.2 No Guarantees</h3>
              <p className="mb-4">
                <strong>WE DO NOT GUARANTEE OR WARRANT:</strong>
              </p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>The accuracy, completeness, or reliability of AI-generated content</li>
                <li>That using our tools will result in viral content, increased views, or specific outcomes</li>
                <li>That our predictions will be correct or profitable</li>
                <li>Uninterrupted or error-free operation of our AI services</li>
                <li>That AI-generated content will be unique or free from third-party claims</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">5.3 User Responsibility</h3>
              <p className="mb-4">
                You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>AI-generated content should be reviewed and edited before use</li>
                <li>You are solely responsible for how you use AI-generated content</li>
                <li>You should verify any information before relying on it for important decisions</li>
                <li>AI tools are assistive technologies, not replacements for human judgment</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">5.4 Fair Usage Policy</h3>
              <p className="mb-4">
                We reserve the right to limit excessive usage of our AI tools to ensure fair access for all users. Abusive or automated usage patterns may result in rate limiting or account suspension.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">6. Subscription & Payment Terms</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">6.1 Subscription Plans</h3>
              <p className="mb-4">
                ViraLux offers various subscription tiers with different features and usage limits. Current pricing and features are available on our platform and may be updated from time to time with reasonable notice.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">6.2 Payment Processing</h3>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>All payments are processed securely through third-party payment providers</li>
                <li>You authorize us to charge your payment method for all fees incurred</li>
                <li>You agree to provide current, complete, and accurate billing information</li>
                <li>Prices are in USD unless otherwise stated</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">6.3 Billing & Renewal</h3>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
                <li>You will be charged at the beginning of each billing cycle</li>
                <li>We may change subscription fees with 30 days' notice to existing subscribers</li>
                <li>No refunds for partial months or unused services unless required by law</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">6.4 Cancellation</h3>
              <p className="mb-4">
                You may cancel your subscription at any time through your account settings or by contacting support. Cancellation will take effect at the end of the current billing period. No refunds will be provided for the remaining term of a cancelled subscription unless required by applicable law.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">7. Disclaimers & Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">7.1 "AS IS" Service</h3>
              <p className="mb-4 font-semibold">
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">7.2 No Warranty</h3>
              <p className="mb-4">We do not warrant that:</p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>The Services will meet your requirements or expectations</li>
                <li>The Services will be uninterrupted, timely, secure, or error-free</li>
                <li>Results obtained from using the Services will be accurate or reliable</li>
                <li>Any errors in the Services will be corrected</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">7.3 Limitation of Liability</h3>
              <p className="mb-4 font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, VIRALUX AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Loss of profits, revenue, data, or use</li>
                <li>Loss of or damage to reputation</li>
                <li>Business interruption</li>
                <li>Personal injury or property damage</li>
                <li>Cost of substitute services</li>
              </ul>
              <p className="mb-4">
                OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">7.4 Exceptions</h3>
              <p className="mb-4">
                Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability. In such jurisdictions, our liability will be limited to the maximum extent permitted by law.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">8. Indemnification</h2>
              <p className="mb-4 text-lg">
                You agree to indemnify, defend, and hold harmless ViraLux and its officers, directors, employees, contractors, agents, licensors, service providers, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, debts, and expenses (including attorney's fees) arising from:
              </p>
              <ul className="list-disc pl-8 space-y-3 mb-6">
                <li>Your use of or access to the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights, including intellectual property rights</li>
                <li>Your User Content</li>
                <li>Any harm caused by your actions to any other user or third party</li>
              </ul>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">9. Dispute Resolution & Arbitration</h2>
              
              <h3 className="text-xl font-semibold mb-4 text-neon-pink">9.1 Informal Resolution</h3>
              <p className="mb-4">
                Before initiating any formal dispute resolution, you agree to contact us at <a href="mailto:viraluxsupport@gmail.com" className="text-neon-blue hover:underline">viraluxsupport@gmail.com</a> to attempt to resolve the dispute informally for at least 30 days.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">9.2 Governing Law</h3>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-neon-pink">9.3 Class Action Waiver</h3>
              <p className="mb-4">
                You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">10. Modifications to Terms & Services</h2>
              <p className="mb-4">
                We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with or without notice. We may also modify these Terms at any time by posting updated Terms on our website. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.
              </p>
              <p className="mb-4">
                Material changes will be notified via email to registered users at least 30 days before they take effect.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">11. Third-Party Links & Services</h2>
              <p className="mb-4">
                Our Services may contain links to third-party websites, services, or resources. We do not endorse and are not responsible for the content, products, services, or practices of any third parties. Your interactions with third parties are solely between you and the third party.
              </p>
            </section>

            <section className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">12. Severability & Waiver</h2>
              <p className="mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect. Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
              </p>
            </section>

            <section className="animate-fade-in bg-gradient-to-r from-neon-blue/10 to-neon-pink/10 p-6 rounded-lg border border-neon-blue/20">
              <h2 className="text-3xl font-bold mb-6 text-neon-blue">13. Contact Information</h2>
              <p className="mb-4 text-lg">
                For questions, concerns, or support regarding these Terms of Service, please contact us:
              </p>
              <div className="space-y-3 text-lg">
                <p><strong className="text-neon-pink">Email:</strong> <a href="mailto:viraluxsupport@gmail.com" className="text-neon-blue hover:underline font-semibold">viraluxsupport@gmail.com</a></p>
                <p><strong className="text-neon-pink">Subject Line:</strong> "Terms of Service Inquiry" or "Legal Question"</p>
                <p><strong className="text-neon-pink">Response Time:</strong> We aim to respond to all inquiries within 48-72 hours</p>
              </div>
            </section>

            <section className="animate-fade-in mt-8 p-6 bg-accent/5 rounded-lg border-2 border-neon-pink/30">
              <p className="text-center text-sm text-muted-foreground italic">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-center text-sm text-muted-foreground italic mt-2">
                By using ViraLux | Haley's Dreamland, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
