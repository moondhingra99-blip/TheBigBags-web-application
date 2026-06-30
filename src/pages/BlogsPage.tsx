import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, User, Clock, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const BlogsPage: React.FC = () => {
  const { blogs, selectedBlogId, setView, setSelectedBlogId } = useApp();

  const activeBlog = blogs.find(b => b.id === selectedBlogId);

  const handleBackToBlogs = () => {
    setSelectedBlogId(null);
  };

  if (activeBlog) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 font-sans">
        
        {/* Back navigation */}
        <button
          onClick={handleBackToBlogs}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-gold transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Craft Guides</span>
        </button>

        {/* Article header */}
        <article className="space-y-6">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">
              {activeBlog.category}
            </span>
            <h1 className="font-display font-black text-2xl sm:text-4xl text-brand-black leading-tight uppercase">
              {activeBlog.title}
            </h1>

            {/* Author details */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-y border-gray-100 py-3.5">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-brand-gold" />
                <span className="font-semibold text-gray-600">Written by {activeBlog.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{activeBlog.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{activeBlog.readTime}</span>
              </div>
            </div>
          </div>

          {/* Banner image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            <img 
              src={activeBlog.image} 
              alt={activeBlog.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Text body */}
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-6 font-sans">
            {activeBlog.content.split('\n\n').map((para, idx) => {
              if (para.startsWith('###')) {
                return (
                  <h3 key={idx} className="font-display font-bold text-base sm:text-lg text-brand-black pt-4 uppercase tracking-tight border-b border-gray-50 pb-2">
                    {para.replace('###', '').trim()}
                  </h3>
                );
              }
              if (para.startsWith('-') || para.startsWith('*')) {
                return (
                  <ul key={idx} className="space-y-2 pl-4">
                    {para.split('\n').map((item, itemIdx) => (
                      <li key={itemIdx} className="list-disc leading-relaxed text-gray-600">
                        {item.replace(/^[-*]\s*/, '').trim()}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Workshop footer quote */}
          <div className="p-5 bg-brand-cream border border-brand-gold/15 rounded-2xl space-y-2 mt-12">
            <h4 className="text-xs font-bold text-brand-black flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-brand-gold" />
              <span>A Note From The Big Bags workshop Desk</span>
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed italic font-sans">
              &quot;Thank you for reading our design logs. We believe that an educated buyer makes the best owner. If you have any questions regarding structural leather maintenance or stitching, reach us anytime via the support ticket desk.&quot;
            </p>
          </div>

        </article>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Title */}
      <div className="border-b border-gray-100 pb-4 mb-8">
        <span className="font-mono text-xs uppercase text-brand-gold font-bold tracking-widest">Expert Advice Diaries</span>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">Craftsmanship Guides</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div 
            key={blog.id}
            onClick={() => setSelectedBlogId(blog.id)}
            className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-gold/10 transition-all cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-50 flex-shrink-0">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content card info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-mono uppercase text-brand-gold font-bold tracking-wider">{blog.category}</span>
                  <span className="text-gray-400 font-medium">{blog.readTime}</span>
                </div>
                <h3 className="font-display font-bold text-base text-brand-black group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-sans">
                  {blog.summary}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-50 pt-3">
                <span className="font-semibold text-gray-600">By {blog.author}</span>
                <span className="text-brand-gold font-bold group-hover:underline flex items-center gap-1">
                  <span>Read Guide</span>
                  <BookOpen className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
