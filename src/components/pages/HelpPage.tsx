import React from 'react';
import { ArrowLeft, HelpCircle, Search, MessageCircle, Book, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function HelpPage() {
  const helpTopics = [
    {
      icon: Search,
      title: "Getting Started",
      description: "Learn the basics of using RemyAI",
      items: [
        "Creating your account",
        "Setting up preferences",
        "Navigating the chat interface"
      ]
    },
    {
      icon: MessageCircle,
      title: "Using the AI Chef",
      description: "Make the most of your AI cooking assistant",
      items: [
        "Asking effective questions",
        "Understanding recipe suggestions",
        "Customizing recommendations"
      ]
    },
    {
      icon: Book,
      title: "Recipe Management",
      description: "Organize and save your favorite recipes",
      items: [
        "Saving recipes",
        "Creating collections",
        "Sharing with friends"
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

          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              How can we help?
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions and learn how to make the most of RemyAI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpTopics.map((topic, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <topic.icon className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  {topic.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {topic.description}
                </p>
                <ul className="space-y-2">
                  {topic.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}