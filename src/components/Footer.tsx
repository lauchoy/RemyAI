import React from 'react';
import { ChefHat, Linkedin, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-4">
            <div className="flex items-center">
              <ChefHat className="w-8 h-8 text-primary" />
              <span className="ml-2 text-xl font-heading font-bold text-textColor">RemyAI</span>
            </div>
            <p className="mt-4 text-sm font-body text-textColor/70">
              Your personal AI chef assistant, making cooking delightful and personalized.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="font-heading text-sm font-semibold text-textColor uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/help" className="text-sm font-body text-textColor/70 hover:text-primary transition-colors">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm font-body text-textColor/70 hover:text-primary transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-sm font-semibold text-textColor uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/team" className="text-sm font-body text-textColor/70 hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm font-body text-textColor/70 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm font-body text-textColor/70 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-sm font-semibold text-textColor uppercase tracking-wider">
              Follow us
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a 
                  href="https://linkedin.com/in/jimmylauchoy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-sm font-body text-textColor/70 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/lauchoy/remyAI/tree/main" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-sm font-body text-textColor/70 hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/jlauchoy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center text-sm font-body text-textColor/70 hover:text-primary transition-colors"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm font-body text-center text-textColor/60">
            © 2024 Jimmy Lauchoy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}