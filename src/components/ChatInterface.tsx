import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, LogOut, User, HelpCircle, 
  ChevronLeft, ChevronRight, Lightbulb,
  Timer, Sparkles, ChefHat, Egg, Clock
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Tip {
  id: number;
  icon: React.ReactNode;
  title: string;
  content: string;
}

declare global {
  interface Window {
    watsonAssistantChatOptions: any;
  }
}

export default function ChatInterface() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const tips: Tip[] = [
    {
      id: 1,
      icon: <Timer className="w-4 h-4 text-primary" />,
      title: "Quick Meals",
      content: "Try asking for '15-minute recipes' when you're short on time."
    },
    {
      id: 2,
      icon: <Sparkles className="w-4 h-4 text-primary" />,
      title: "Get Creative",
      content: "Ask about substitutions for ingredients you don't have on hand."
    },
    {
      id: 3,
      icon: <Egg className="w-4 h-4 text-primary" />,
      title: "Be Specific",
      content: "Try 'What can I make with eggs and spinach?'"
    },
    {
      id: 4,
      icon: <Clock className="w-4 h-4 text-primary" />,
      title: "Set Time Limits",
      content: "Mention 'Suggest a 15-minute recipe'"
    }
  ];

  useEffect(() => {
    if (!chatContainerRef.current) return;

    // Create a unique namespace for this chat instance
    const namespace = 'remyai-' + Math.random().toString(36).substring(7);

    window.watsonAssistantChatOptions = {
      integrationID: "88646b38-3f56-433c-8717-021ab8c1eb50",
      region: "us-east",
      serviceInstanceID: "bc65cba1-61bf-489a-b944-b26bba3aa2ca",
      element: chatContainerRef.current,
      namespace: namespace,
      themeConfig: {
        corners: 'square',
      },
      layout: {
        showFrame: false,
        hasContentMaxWidth: true,
      },
      onLoad: async (instance: any) => {
        await instance.render();
      }
    };

    const script = document.createElement('script');
    script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js`;
    document.head.appendChild(script);

    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Tips */}
      <div 
        className={`${
          isSidebarExpanded ? 'w-64' : 'w-16'
        } hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300`}
      >
        <div className="p-4">
          <Link to="/" className="flex items-center mb-8">
            <ChefHat className="w-8 h-8 text-primary" />
            {isSidebarExpanded && (
              <span className="ml-2 text-xl font-heading font-bold text-textColor">RemyAI</span>
            )}
          </Link>
          
          <div className="space-y-6">
            {isSidebarExpanded && (
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-heading font-semibold text-gray-900">Tips & Tricks</h3>
              </div>
            )}
            {tips.map((tip) => (
              <div 
                key={tip.id} 
                className={`${
                  isSidebarExpanded ? 'p-4' : 'p-2'
                } bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors`}
                title={!isSidebarExpanded ? `${tip.title}: ${tip.content}` : undefined}
              >
                <div className="flex items-center">
                  {tip.icon}
                  {isSidebarExpanded && (
                    <div className="ml-2">
                      <span className="font-medium text-gray-900">{tip.title}</span>
                      <p className="text-sm text-gray-600 mt-1">{tip.content}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collapse/Expand Button */}
        <button
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          className="absolute bottom-4 -right-3 p-1 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50"
        >
          {isSidebarExpanded ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="lg:hidden flex items-center">
            <ChefHat className="w-8 h-8 text-primary" />
            <span className="ml-2 text-xl font-heading font-bold text-textColor">RemyAI</span>
          </div>
          
          <div className="relative ml-auto">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="User menu"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-600">Signed in as</p>
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => navigate('/settings')}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 w-full"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button
                  onClick={() => navigate('/help')}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 w-full"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-50 w-full border-t border-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1" ref={chatContainerRef}>
          {/* Watson Assistant will render here */}
        </div>
      </div>
    </div>
  );
}