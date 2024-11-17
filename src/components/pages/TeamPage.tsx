import React from 'react';
import { ArrowLeft, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Jimmy Lauchoy",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "Passionate about combining AI with culinary arts to make cooking accessible and enjoyable for everyone.",
      social: {
        linkedin: "https://linkedin.com/in/jimmylauchoy",
        github: "https://github.com/lauchoy",
        twitter: "https://twitter.com/jlauchoy"
      }
    },
    {
      name: "Watsonx",
      role: "Head of AI",
      image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "Leading the development of our AI algorithms to create personalized recipe recommendations.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "Bolt",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1675897634504-bf03f1a2a66a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      bio: "Building robust and scalable solutions to make RemyAI's technology accessible to users worldwide.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
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
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-600">
              The passionate individuals behind RemyAI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-heading font-bold text-gray-900 mb-1">
                    {member.name}
                  </h2>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}