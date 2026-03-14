import React, { useState } from 'react';
import { 
  Phone, BarChart2, Target, Ticket, Megaphone, 
  RefreshCw, FileEdit, ClipboardList, Calendar, 
  Star, CalendarDays, Mail, ChevronRight, Circle
} from 'lucide-react';
import { clsx } from 'clsx';

// Map string icons from HTML to Lucide components
const iconMap: Record<string, React.ElementType> = {
  "📞": Phone,
  "📊": BarChart2,
  "🎯": Target,
  "🎫": Ticket,
  "📣": Megaphone,
  "🔁": RefreshCw,
  "📝": FileEdit,
  "📋": ClipboardList,
  "📅": Calendar,
  "⭐": Star,
  "🗓": CalendarDays,
  "📩": Mail,
};

const accounts = [
  {
    id: 0, name: "Tata Consultancy Services", type: "Corporate", size: "1,200 employees", renewal: "28 days",
    priority: "critical", tag: "Churn risk",
    signals: [
      { label: "Engagement", value: "31%", delta: "▼ 44% in 14d", neg: true },
      { label: "Sessions", value: "12", delta: "▼ from 38", neg: true },
      { label: "Active users", value: "87", delta: "▼ from 210", neg: true },
      { label: "Renewal", value: "28d", delta: "upcoming", neu: true }
    ],
    why: [
      { color: "#E24B4A", text: "Engagement dropped 44% in 14 days", time: "Today" },
      { color: "#E24B4A", text: "Only 3 therapy sessions booked this month vs 18 last month", time: "Today" },
      { color: "#EF9F27", text: "HR point of contact changed 10 days ago", time: "10d ago" },
      { color: "#EF9F27", text: "Renewal in 28 days — no renewal call scheduled", time: "Overdue" }
    ],
    actions: [
      { icon: "📞", iconClass: "bg-yd-blue-light text-yd-blue", title: "Schedule renewal call", desc: "Contact new HR POC before renewal window closes", cta: "Open calendar" },
      { icon: "📊", iconClass: "bg-yd-amber-light text-[#854F0B]", title: "Share engagement report", desc: "Monthly report not sent — 9 days overdue", cta: "Send report" },
      { icon: "🎯", iconClass: "bg-yd-purple-light text-yd-purple", title: "Activate re-engagement campaign", desc: "Nudge inactive users with a wellness challenge", cta: "Start campaign" }
    ]
  },
  {
    id: 1, name: "IIT Bombay", type: "College", size: "3,400 students", renewal: "60 days",
    priority: "critical", tag: "SLA breach",
    signals: [
      { label: "Response SLA", value: "48h", delta: "▼ breached", neg: true },
      { label: "Open tickets", value: "7", delta: "▲ from 1", neg: true },
      { label: "Satisfaction", value: "3.1", delta: "▼ from 4.4", neg: true },
      { label: "Last contact", value: "9d", delta: "no response", neu: true }
    ],
    why: [
      { color: "#E24B4A", text: "7 unresolved student support tickets > 48h old", time: "Today" },
      { color: "#E24B4A", text: "Satisfaction score fell from 4.4 to 3.1 this week", time: "This week" },
      { color: "#EF9F27", text: "No response from counselling coordinator in 9 days", time: "9d ago" }
    ],
    actions: [
      { icon: "🎫", iconClass: "bg-yd-blue-light text-yd-blue", title: "Resolve open tickets", desc: "7 tickets awaiting CSM response since Monday", cta: "View tickets" },
      { icon: "📞", iconClass: "bg-yd-amber-light text-[#854F0B]", title: "Call counselling coordinator", desc: "Re-establish contact — last reply was 9 days ago", cta: "Call now" }
    ]
  },
  {
    id: 2, name: "Infosys Ltd", type: "Corporate", size: "850 employees", renewal: "90 days",
    priority: "critical", tag: "No engagement",
    signals: [
      { label: "Active users", value: "0", delta: "▼ 2 weeks", neg: true },
      { label: "Last session", value: "18d", delta: "no sessions", neg: true },
      { label: "Campaign", value: "Live", delta: "0 clicks", neg: true },
      { label: "Renewal", value: "90d", delta: "at risk", neu: true }
    ],
    why: [
      { color: "#E24B4A", text: "Zero active users for 2 consecutive weeks", time: "Today" },
      { color: "#E24B4A", text: "Live campaign has 0 clicks after 5 days", time: "5d ago" },
      { color: "#EF9F27", text: "Platform not mentioned in internal comms (per HR)", time: "1w ago" }
    ],
    actions: [
      { icon: "📣", iconClass: "bg-yd-purple-light text-yd-purple", title: "Request internal announcement", desc: "Ask HR to send a platform re-launch email to employees", cta: "Draft email" },
      { icon: "🔁", iconClass: "bg-yd-amber-light text-[#854F0B]", title: "Revise campaign creative", desc: "Current banner has low CTR — swap messaging", cta: "Edit campaign" }
    ]
  },
  {
    id: 3, name: "HDFC Bank", type: "Corporate", size: "600 employees", renewal: "45 days",
    priority: "followup", tag: "Pending notes",
    signals: [
      { label: "Engagement", value: "62%", delta: "stable", neu: true },
      { label: "Last call", value: "7d", delta: "no notes logged", neg: true },
      { label: "Sessions", value: "34", delta: "▲ from 28", pos: true },
      { label: "Renewal", value: "45d", delta: "on track", pos: true }
    ],
    why: [
      { color: "#EF9F27", text: "CSM call 7 days ago — no notes or follow-up logged", time: "7d ago" },
      { color: "#5F5E5A", text: "QBR due in 2 weeks — needs prep", time: "In 14d" }
    ],
    actions: [
      { icon: "📝", iconClass: "bg-yd-blue-light text-yd-blue", title: "Log call notes + action items", desc: "7-day-old call still has no notes in CRM", cta: "Log notes" },
      { icon: "📋", iconClass: "bg-yd-amber-light text-[#854F0B]", title: "Prepare QBR deck", desc: "QBR with HDFC in 14 days — deck not started", cta: "Create deck" }
    ]
  },
  {
    id: 4, name: "Wipro Technologies", type: "Corporate", size: "450 employees", renewal: "120 days",
    priority: "followup", tag: "Campaign due",
    signals: [
      { label: "Engagement", value: "55%", delta: "▼ slight dip", neg: true },
      { label: "Campaign", value: "Pending", delta: "Oct launch", neu: true },
      { label: "Sessions", value: "28", delta: "stable", neu: true },
      { label: "Renewal", value: "120d", delta: "healthy", pos: true }
    ],
    why: [
      { color: "#EF9F27", text: "World Mental Health Day campaign not briefed to HR yet", time: "Today" },
      { color: "#5F5E5A", text: "Campaign goes live in 3 days — needs approval", time: "In 3d" }
    ],
    actions: [
      { icon: "📅", iconClass: "bg-yd-blue-light text-yd-blue", title: "Brief HR on Oct campaign", desc: "Campaign launches in 3 days — HR hasn't been told", cta: "Send brief" }
    ]
  },
  {
    id: 5, name: "Manipal University", type: "College", size: "5,100 students", renewal: "75 days",
    priority: "followup", tag: "Stale data",
    signals: [
      { label: "Active users", value: "412", delta: "last updated 3w", neu: true },
      { label: "Sessions", value: "67", delta: "stable", neu: true },
      { label: "Last report", value: "3w", delta: "overdue", neg: true },
      { label: "Renewal", value: "75d", delta: "on track", pos: true }
    ],
    why: [
      { color: "#EF9F27", text: "Monthly engagement report not sent in 3 weeks", time: "Overdue" },
      { color: "#5F5E5A", text: "Student usage data may be stale — portal not synced", time: "3w ago" }
    ],
    actions: [
      { icon: "📊", iconClass: "bg-yd-amber-light text-[#854F0B]", title: "Send monthly engagement report", desc: "Report 3 weeks overdue — student wellness team waiting", cta: "Send report" }
    ]
  },
  {
    id: 6, name: "Axis Bank", type: "Corporate", size: "380 employees", renewal: "150 days",
    priority: "nudge", tag: "Quick win",
    signals: [
      { label: "Engagement", value: "71%", delta: "▲ healthy", pos: true },
      { label: "Sessions", value: "44", delta: "▲ best month", pos: true },
      { label: "NPS", value: "8.2", delta: "▲ from 7.6", pos: true },
      { label: "Renewal", value: "150d", delta: "healthy", pos: true }
    ],
    why: [
      { color: "#639922", text: "Best engagement month — good moment for a case study ask", time: "Today" },
      { color: "#5F5E5A", text: "HR lead mentioned interest in webinar series last call", time: "2w ago" }
    ],
    actions: [
      { icon: "⭐", iconClass: "bg-yd-blue-light text-yd-blue", title: "Request testimonial / case study", desc: "Highest NPS this quarter — great timing to ask HR", cta: "Draft ask" },
      { icon: "🗓", iconClass: "bg-yd-purple-light text-yd-purple", title: "Propose webinar series", desc: "HR lead expressed interest — follow through", cta: "Schedule call" }
    ]
  },
  {
    id: 7, name: "BITS Pilani", type: "College", size: "2,200 students", renewal: "180 days",
    priority: "nudge", tag: "Re-engage",
    signals: [
      { label: "Active users", value: "180", delta: "stable", neu: true },
      { label: "Journals", value: "22", delta: "▲ new users", pos: true },
      { label: "Sessions", value: "19", delta: "could grow", neu: true },
      { label: "Renewal", value: "180d", delta: "healthy", pos: true }
    ],
    why: [
      { color: "#639922", text: "22 new journal users this month — momentum to build on", time: "This month" },
      { color: "#5F5E5A", text: "Session bookings could double with a targeted nudge", time: "Opportunity" }
    ],
    actions: [
      { icon: "📩", iconClass: "bg-yd-blue-light text-yd-blue", title: "Send peer success story to counsellor", desc: "Nudge counsellor to promote sessions to active journal users", cta: "Share story" }
    ]
  }
];

type FilterType = 'all' | 'critical' | 'followup' | 'nudge';

export default function CSMDashboard() {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [selectedId, setSelectedId] = useState<number>(0);

  const filteredAccounts = currentFilter === 'all' 
    ? accounts 
    : accounts.filter(a => a.priority === currentFilter);

  const selectedAccount = accounts.find(a => a.id === selectedId) || accounts[0];

  const todayDate = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const getPriorityDot = (priority: string) => {
    switch(priority) {
      case 'critical': return 'bg-yd-red';
      case 'followup': return 'bg-yd-amber';
      case 'nudge': return 'bg-yd-green';
      default: return 'bg-gray-400';
    }
  };

  const getTagStyle = (priority: string) => {
    switch(priority) {
      case 'critical': return 'bg-yd-red-light text-yd-red-dark';
      case 'followup': return 'bg-yd-amber-light text-[#854F0B]';
      case 'nudge': return 'bg-yd-green-light text-[#3B6D11]';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getBadgeText = (priority: string) => {
    switch(priority) {
      case 'critical': return '🔴 Critical';
      case 'followup': return '🟡 Follow-up';
      case 'nudge': return '🟢 Nudge';
      default: return priority;
    }
  };

  return (
    <div className="flex h-screen w-full bg-yd-bg font-sans text-yd-text-primary overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-[272px] min-w-[272px] bg-yd-surface border-r border-yd-border flex flex-col z-10">
        
        {/* Sidebar Header */}
        <div className="pt-[18px] px-[16px] pb-[12px] border-b border-yd-border">
          <h3 className="text-[13px] font-semibold text-yd-text-primary">My accounts today</h3>
          <span className="text-[11px] text-yd-text-tertiary block mt-[2px]">{todayDate}</span>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-[4px] px-[12px] py-[10px] border-b border-yd-border flex-wrap">
          {[
            { id: 'all', label: 'All', count: 8 },
            { id: 'critical', label: 'Critical', count: 3 },
            { id: 'followup', label: 'Follow-up', count: 3 },
            { id: 'nudge', label: 'Nudge', count: 2 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentFilter(tab.id as FilterType)}
              className={clsx(
                "text-[10px] px-[9px] py-[3px] rounded-[20px] border transition-all duration-150",
                currentFilter === tab.id 
                  ? "bg-yd-blue-light text-yd-blue border-yd-blue-mid" 
                  : "bg-transparent text-yd-text-secondary border-yd-border-med hover:bg-yd-surface2"
              )}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Account List */}
        <div className="flex-1 overflow-y-auto">
          {filteredAccounts.map(account => (
            <div 
              key={account.id}
              onClick={() => setSelectedId(account.id)}
              className={clsx(
                "flex items-center gap-[9px] py-[11px] pr-[14px] border-b border-yd-border cursor-pointer transition-colors",
                selectedId === account.id 
                  ? "bg-yd-surface2 border-l-[2px] border-l-yd-blue-mid pl-[12px]" 
                  : "hover:bg-yd-surface2 pl-[14px]"
              )}
            >
              <div className={clsx("w-[7px] h-[7px] rounded-full shrink-0", getPriorityDot(account.priority))}></div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-yd-text-primary truncate">{account.name}</div>
                <div className="text-[10px] text-yd-text-secondary mt-[1px] truncate">{account.type} · {account.size}</div>
              </div>
              <span className={clsx("text-[9px] px-[6px] py-[2px] rounded-[10px] whitespace-nowrap shrink-0 ml-auto", getTagStyle(account.priority))}>
                {account.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Snooze Strip */}
        <div className="px-[14px] py-[8px] bg-yd-surface border-t border-yd-border cursor-pointer hover:bg-yd-surface2 transition-colors">
          <span className="text-[10px] text-yd-text-tertiary">▸ 2 snoozed accounts</span>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 bg-yd-bg">
        
        {/* Main Header */}
        <div className="px-[20px] py-[16px] bg-yd-surface border-b border-yd-border flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-semibold text-yd-text-primary">{selectedAccount.name}</h2>
            <div className="text-[11px] text-yd-text-secondary mt-[2px]">
              {selectedAccount.type} · {selectedAccount.size} · Renewal in {selectedAccount.renewal}
            </div>
          </div>
          <span className={clsx("text-[10px] px-[10px] py-[3px] rounded-[20px] font-semibold", getTagStyle(selectedAccount.priority))}>
            {getBadgeText(selectedAccount.priority)}
          </span>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-[16px] sm:p-[20px] flex flex-col gap-[12px]">
          
          {/* Signals Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[8px]">
            {selectedAccount.signals.map((signal, idx) => (
              <div key={idx} className="bg-yd-surface2 rounded-[6px] px-[12px] py-[10px]">
                <div className="text-[9px] uppercase tracking-[0.05em] text-yd-text-secondary font-mono">{signal.label}</div>
                <div className="text-[22px] font-semibold text-yd-text-primary mt-[2px]">{signal.value}</div>
                <div className={clsx(
                  "text-[10px] mt-[2px]",
                  signal.neg ? "text-yd-red-dark" : signal.pos ? "text-[#3B6D11]" : "text-yd-text-secondary"
                )}>
                  {signal.delta}
                </div>
              </div>
            ))}
          </div>

          {/* Why Section */}
          <div className="bg-yd-surface border border-yd-border rounded-[10px] px-[14px] py-[12px]">
            <h4 className="text-[10px] uppercase tracking-[0.05em] text-yd-text-secondary font-semibold mb-[8px] font-mono">Why this needs attention</h4>
            <div className="flex flex-col">
              {selectedAccount.why.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-[8px] py-[5px] border-b border-yd-border last:border-b-0">
                  <div className="w-[6px] h-[6px] rounded-full shrink-0 mt-[4px]" style={{background: reason.color}}></div>
                  <div className="text-[11px] flex-1 leading-[1.4] text-yd-text-primary">{reason.text}</div>
                  <div className="text-[10px] text-yd-text-tertiary whitespace-nowrap">{reason.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Section */}
          <div className="bg-yd-surface border border-yd-border rounded-[10px] px-[14px] py-[12px]">
            <h4 className="text-[10px] uppercase tracking-[0.05em] text-yd-text-secondary font-semibold mb-[8px] font-mono">Recommended actions</h4>
            <div className="flex flex-col gap-[6px]">
              {selectedAccount.actions.map((action, idx) => {
                const IconComponent = iconMap[action.icon] || Circle;
                return (
                  <div key={idx} className="flex items-center gap-[9px] px-[9px] py-[7px] border border-yd-border rounded-[6px] cursor-pointer hover:bg-yd-surface2 transition-colors">
                    <div className={clsx("w-[28px] h-[28px] rounded-[6px] flex items-center justify-center shrink-0", action.iconClass)}>
                      <IconComponent size={14} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-medium text-yd-text-primary">{action.title}</div>
                      <div className="text-[10px] text-yd-text-secondary mt-[1px] leading-[1.3]">{action.desc}</div>
                    </div>
                    <div className="text-[10px] text-yd-blue font-semibold whitespace-nowrap ml-auto pl-[12px]">
                      {action.cta} →
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>

        {/* Legend Footer */}
        <div className="flex gap-[16px] px-[20px] py-[8px] bg-yd-surface2 border-t border-yd-border mt-auto">
          <div className="flex items-center gap-[5px] text-[10px] text-yd-text-secondary">
            <div className="w-[7px] h-[7px] rounded-full bg-yd-red"></div> Critical — act today
          </div>
          <div className="flex items-center gap-[5px] text-[10px] text-yd-text-secondary">
            <div className="w-[7px] h-[7px] rounded-full bg-yd-amber"></div> Follow-up needed
          </div>
          <div className="flex items-center gap-[5px] text-[10px] text-yd-text-secondary">
            <div className="w-[7px] h-[7px] rounded-full bg-yd-green"></div> Low-effort nudge
          </div>
        </div>

      </div>
    </div>
  );
}
