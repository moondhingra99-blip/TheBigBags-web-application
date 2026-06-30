import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Send, Sparkles, User, ShieldAlert, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatAssistant: React.FC = () => {
  const { products, setView } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello there! I'm Neha, co-founder of The Big Bags. 🌸 My sister Pooja and I grew up in our father's bag factory and are here to help you choose the perfect bag. What occasion are you shopping for today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
        if (data.demoMode) {
          setShowDemoBanner(true);
        } else {
          setShowDemoBanner(false);
        }
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Oops, my stitching got a little tangled. Could you try asking me again?" }]);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: "I had a connection issue. Pooja and I are working on checking the wires. Please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const quickPrompts = [
    'Recommend a durable laptop bag',
    'Which bag is best for travel?',
    'Tell me about your family story',
    'What is your warranty policy?'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-brand-black text-white p-4 flex items-center justify-between border-b border-brand-gold/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-gold flex items-center justify-center font-display font-black text-brand-black text-sm relative">
                  NP
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-brand-black" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-wide">Pooja & Neha</h3>
                  <p className="text-[10px] text-brand-gold font-mono tracking-widest uppercase">AI Shopping Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-900 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-black text-white' : 'bg-brand-gold text-brand-black'}`}>
                      {msg.role === 'user' ? 'U' : 'NP'}
                    </div>

                    <div className={`rounded-xl p-3 text-xs leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-brand-black text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'}`}>
                      {/* Splitting paragraphs and rendering lists nicely */}
                      {msg.content.split('\n').map((paragraph, idx) => {
                        if (paragraph.trim().startsWith('-') || paragraph.trim().startsWith('*')) {
                          return (
                            <li key={idx} className="list-disc ml-4 my-1 pl-1">
                              {paragraph.replace(/^[-*]\s*/, '')}
                            </li>
                          );
                        }
                        return <p key={idx} className="mb-1.5 last:mb-0">{paragraph}</p>;
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center">
                    <div className="h-7 w-7 rounded-full bg-brand-gold text-brand-black flex items-center justify-center text-[10px] font-bold">
                      NP
                    </div>
                    <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-brand-gold animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-brand-gold animate-bounce [animation-delay:0.2s]" />
                      <span className="h-2 w-2 rounded-full bg-brand-gold animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions Templates */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(p)}
                    className="flex-shrink-0 px-3 py-1.5 bg-white border border-gray-200 hover:border-brand-gold text-[10px] text-gray-600 font-medium rounded-full transition-colors cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Demo mode secret banner */}
            {showDemoBanner && (
              <div className="px-4 py-1.5 bg-brand-linen border-t border-brand-taupe text-[10px] text-brand-black font-medium flex items-center justify-between gap-2">
                <span>Running in Demo Mode. Provide GEMINI_API_KEY for live AI reasoning.</span>
                <button 
                  onClick={() => setShowDemoBanner(false)}
                  className="text-brand-gold font-bold hover:underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Input Form Footer */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                placeholder="Ask Pooja & Neha anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-gray-200 text-xs px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-brand-gold"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-brand-black hover:bg-brand-gold text-white disabled:bg-gray-100 disabled:text-gray-300 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating action button trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-brand-black text-white hover:bg-brand-gold shadow-2xl flex items-center justify-center cursor-pointer border border-brand-gold/20"
        id="chat-assistant-trigger"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </div>
  );
};
