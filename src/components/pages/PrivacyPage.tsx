import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal information you provide to us",
        "Information about your use of RemyAI",
        "Device and connection information",
        "Cooking preferences and dietary restrictions"
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide personalized recipe recommendations",
        "To improve our AI and services",
        "To communicate with you about our services",
        "To ensure the security of your account"
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell your personal information",
        "We may share data with service providers",
        "We may share data for legal compliance",
        "We may share anonymized, aggregate data"
      ]
    },
    {
      title: "Data Security",
      content: [
        "We use industry-standard security measures",
        "Regular security audits and updates",
        "Encrypted data transmission",
        "Secure data storage practices"
      ]
    },
    {
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Correct inaccurate data",
        "Request deletion of your data",
        "Opt-out of marketing communications"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-8">
              Privacy Policy
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                Last updated: March 15, 2024
              </p>

              <p className="text-gray-600 mb-8">
                At RemyAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
              </p>

              {sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                  Contact Us About Privacy
                </h3>
                <p className="text-gray-600">
                  If you have any questions about our Privacy Policy, please contact our Data Protection Officer at{' '}
                  <a 
                    href="mailto:privacy@remyai.com"
                    className="text-primary hover:text-primary-hover"
                  >
                    privacy@remyai.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}