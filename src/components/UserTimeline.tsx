import React, { useState } from 'react';
import { Book, Calendar, ChevronRight, Eye, EyeOff, MessageCircle, Moon, Sparkles, Sun, Video } from 'lucide-react';
import { motion } from 'motion/react';

const timelineData = [
  {
    period: "This Week",
    items: [
      {
        id: 1,
        type: "insight",
        date: "Today",
        title: "Pattern Noticed",
        description: "You've logged 'Anxious' on 3 Tuesday mornings in a row. Consider exploring this in your next session.",
        icon: Sparkles,
        color: "bg-indigo-50 text-indigo-600 border-indigo-100",
        action: "Add to Session Notes"
      },
      {
        id: 2,
        type: "journal",
        date: "Yesterday, 8:30 PM",
        title: "Evening Reflection",
        description: "I felt really overwhelmed at work today, but taking a 5-minute breathing break helped me reset before the big presentation. I need to remember to breathe more often.",
        isPrivate: true,
        icon: Book,
        color: "bg-stone-50 text-stone-600 border-stone-100"
      }
    ]
  },
  {
    period: "Last Week",
    items: [
      {
        id: 3,
        type: "session",
        date: "Thu, Oct 15",
        title: "Therapy Session with Dr. Sarah",
        description: "Discussed boundary setting and workplace stress. Homework: Practice saying 'no' to one non-essential request.",
        icon: Video,
        color: "bg-emerald-50 text-emerald-600 border-emerald-100",
        action: "Review Full Notes"
      },
      {
        id: 4,
        type: "mood",
        date: "Wed, Oct 14",
        title: "Mood Check-in",
        description: "Feeling Calm. Triggers: Good sleep, exercise.",
        icon: Sun,
        color: "bg-amber-50 text-amber-600 border-amber-100"
      }
    ]
  }
];

export default function UserTimeline() {
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set());

  const toggleReveal = (id: number) => {
    const newSet = new Set(revealedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRevealedItems(newSet);
  };

  return (
    <div className="min-h-full bg-[#FAF9F6] text-[#2C2C2A] font-sans p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-serif text-[#1A1A18] mb-3">Your Journey</h1>
          <p className="text-[#6B6B66] text-lg">Reflect on your progress and patterns.</p>
        </header>

        <div className="space-y-12 relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-[#E5E5E0] z-0 hidden sm:block"></div>

          {timelineData.map((group, groupIdx) => (
            <div key={groupIdx} className="relative z-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[#8F8F8A] mb-6 sm:ml-16">
                {group.period}
              </h2>
              
              <div className="space-y-6">
                {group.items.map((item, itemIdx) => {
                  const isRevealed = revealedItems.has(item.id);
                  const isPrivate = item.isPrivate;

                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (groupIdx * 0.2) + (itemIdx * 0.1) }}
                      key={item.id} 
                      className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                    >
                      <div className="hidden sm:flex flex-col items-center mt-1">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 bg-white ${item.color}`}>
                          <item.icon size={24} strokeWidth={1.5} />
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F0F0EB]">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3 sm:hidden mb-2">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center border bg-white ${item.color}`}>
                              <item.icon size={18} strokeWidth={1.5} />
                            </div>
                            <span className="text-sm font-medium text-[#8F8F8A]">{item.date}</span>
                          </div>
                          <span className="hidden sm:block text-sm font-medium text-[#8F8F8A]">{item.date}</span>
                          
                          {isPrivate && (
                            <button 
                              onClick={() => toggleReveal(item.id)}
                              className="text-[#8F8F8A] hover:text-[#2C2C2A] transition-colors p-1"
                              aria-label={isRevealed ? "Hide content" : "Reveal content"}
                            >
                              {isRevealed ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-serif text-[#1A1A18] mb-2">{item.title}</h3>
                        
                        <div className="relative">
                          <p className={`text-[#5C5C58] leading-relaxed transition-all duration-300 ${isPrivate && !isRevealed ? 'blur-sm select-none' : ''}`}>
                            {item.description}
                          </p>
                          {isPrivate && !isRevealed && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button 
                                onClick={() => toggleReveal(item.id)}
                                className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#E5E5E0] rounded-full text-sm font-medium text-[#2C2C2A] shadow-sm hover:bg-white transition-colors"
                              >
                                Tap to reveal
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {item.action && (
                          <button className="mt-5 text-sm font-medium text-[#2C2C2A] inline-flex items-center gap-1 hover:gap-2 transition-all">
                            {item.action} <ChevronRight size={16} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-[#2C2C2A] text-white rounded-full font-medium hover:bg-[#1A1A18] transition-colors shadow-md">
            Log New Entry
          </button>
        </div>
      </div>
    </div>
  );
}
