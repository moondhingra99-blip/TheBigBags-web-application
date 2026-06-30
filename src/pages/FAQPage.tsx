import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, Shield, Truck, RotateCcw, Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export const FAQPage: React.FC = () => {
  const { faqs } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const logisticsFAQs = [
    { q: 'What is your shipping policy?', a: 'We offer free delivery Pan-India for all orders above ₹1,999. For orders below that, a flat logistics fee of ₹150 applies.' },
    { q: 'How do returns and refunds work?', a: 'If you are not completely satisfied with your bag design or fit, request an exchange or return within 7 days of delivery. Bags must be in original unused condition with all cards and dustbags intact.' },
    { q: 'Can I claim stitch repairs under warranty?', a: 'Yes. Our 2-year family warranty covers any manufacturing defects, zipper failures, or stitch failures. Simply log a direct support ticket in your customer dashboard.' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 font-sans">
      
      {/* Header Banner */}
      <div className="text-center space-y-2 mb-12">
        <span className="font-mono text-xs uppercase text-brand-gold font-bold tracking-widest">Customer Help Desk</span>
        <h1 className="font-display font-black text-2xl sm:text-4xl tracking-tight uppercase">Support &amp; FAQ Hub</h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          Need details about our warranty, shipping times, or leather sourcing? Pooja and Neha are here to clarify any questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Accordion FAQs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* General FAQs accordion block */}
          <div className="space-y-4">
            <h3 className="font-display font-black text-lg text-brand-black uppercase tracking-tight border-b border-gray-100 pb-2">
              Frequently Asked Questions
            </h3>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
              {faqs.map((f, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={idx} className="p-4 space-y-2">
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-800 hover:text-brand-gold transition-colors focus:outline-none cursor-pointer"
                    >
                      <span>{f.question}</span>
                      <span className="text-brand-gold font-black text-lg">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <p className="text-xs text-gray-600 leading-relaxed font-sans pl-1 pt-1 border-t border-gray-50 mt-1">
                        {f.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logistics policies */}
          <div className="space-y-4">
            <h3 className="font-display font-black text-lg text-brand-black uppercase tracking-tight border-b border-brand-taupe/40 pb-2">
              Shipping &amp; Return Declarations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {logisticsFAQs.map((faq, i) => (
                <div key={i} className="p-4 bg-brand-cream rounded-sm space-y-2 border border-brand-taupe shadow-xs">
                  <h4 className="text-xs font-bold text-brand-black">{faq.q}</h4>
                  <p className="text-[11px] text-brand-gray leading-relaxed font-sans">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Declarations */}
          <div className="p-5 bg-brand-linen border border-brand-taupe rounded-sm space-y-3">
            <h4 className="text-xs font-bold text-brand-black flex items-center gap-1.5 uppercase">
              <Shield className="h-4 w-4 text-brand-gold" />
              <span>Privacy &amp; Terms Security Charter</span>
            </h4>
            <p className="text-[10px] sm:text-xs text-brand-gray leading-relaxed font-sans">
              The Big Bags respects your private transactions. All payments made through simulated credit portals (Razorpay, Stripe) are protected by standard industry SSL tokens. We never store or share your card details, addresses, or phone registers with external third-party advertising modules.
            </p>
          </div>

        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-4">
          <div className="bg-brand-linen border border-brand-taupe p-6 rounded-sm shadow-xs space-y-6">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-black border-b border-gray-100 pb-2">
              Send Direct Message
            </h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-600">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="Rahul Sharma"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-600">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="rahul@gmail.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-600">Message Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your query in detail..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              {contactSuccess && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded font-bold text-[10px] animate-pulse">
                  Message Sent! We will email you back shortly.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-brand-black hover:bg-brand-gold text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>

            {/* Direct office contacts */}
            <div className="border-t border-gray-50 pt-5 space-y-3 text-xs text-gray-500">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-gold" />
                <a href="mailto:support@thebigbags.com" className="hover:underline text-gray-700 font-semibold">support@thebigbags.com</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-gold" />
                <a href="tel:+919876543210" className="hover:underline text-gray-700 font-semibold">+91 98765 43210</a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-gold mt-0.5" />
                <p className="leading-tight font-sans">
                  The Big Bags Workshop, Sector 37 Industrial Area, Gurugram, Haryana, India.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
