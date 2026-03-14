import React from 'react';

export default function DeliverableBrief({ type }: { type: 'csm' | 'timeline' }) {
  if (type === 'csm') {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
        <h2 className="text-2xl font-semibold mb-4 text-slate-900">Deliverables: "My Accounts Today" Dashboard</h2>
        
        <h3 className="text-slate-800">Brief Framing: What does "needs attention today" mean?</h3>
        <p className="text-slate-600">
          "Needs attention today" means the account has crossed a specific threshold of risk or opportunity that requires human intervention <strong>within the next 24-48 hours</strong> to prevent churn or ensure success. It is not a list of all accounts, nor is it a general analytics view. It is an actionable, prioritized inbox.
        </p>

        <h3 className="text-slate-800">Explanation of Prioritisation Decisions</h3>
        <ul className="text-slate-600">
          <li><strong>Hierarchy by Urgency:</strong> Critical risks (e.g., dropping engagement + negative feedback) are surfaced at the very top with high-contrast visual indicators (Red/Rose).</li>
          <li><strong>Action-Oriented:</strong> Every prioritized account has a clear "Next Action" button. The CSM shouldn't have to guess what to do next.</li>
          <li><strong>Contextual Snippets:</strong> Instead of showing raw data tables, the dashboard synthesizes the <em>reason</em> for attention into a human-readable sentence.</li>
        </ul>

        <h3 className="text-slate-800">What was intentionally excluded and why</h3>
        <ul className="text-slate-600">
          <li><strong>Healthy Accounts:</strong> Excluded from the main view to reduce cognitive load. They are accessible via a secondary "View all healthy accounts" button.</li>
          <li><strong>Deep Analytics Charts:</strong> Excluded from this top-level view. The goal is workflow prioritization, not data exploration. If a CSM needs to dig deeper, they can click into the account.</li>
          <li><strong>Complex Navigation:</strong> Kept to a single-column primary feed to mimic an inbox, which is a familiar and efficient pattern for processing tasks.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] p-8 rounded-2xl shadow-sm border border-[#E5E5E0] prose prose-stone max-w-none">
      <h2 className="text-2xl font-serif mb-4 text-[#1A1A18]">Deliverables: Reimagining the User Timeline</h2>
      
      <h3 className="text-[#2C2C2A] font-serif">Brief Framing: What is the purpose of a mental health timeline?</h3>
      <p className="text-[#5C5C58]">
        A mental health timeline shouldn't just be an audit log of features used. Its purpose is to act as a <strong>mirror for self-reflection</strong>, helping users connect the dots between their actions (e.g., therapy, journaling) and their outcomes (e.g., mood, anxiety levels), ultimately reinforcing positive habits.
      </p>

      <h3 className="text-[#2C2C2A] font-serif">Explanation of Emotional and Structural Decisions</h3>
      <ul className="text-[#5C5C58]">
        <li><strong>Emotional Tone:</strong> Used a warm, organic color palette (off-whites, soft greens, warm grays) and serif typography to feel like a premium, personal journal rather than a clinical medical record.</li>
        <li><strong>Pattern Recognition (Insights):</strong> Interleaved AI-driven "Insights" directly into the timeline. Instead of making the user do the work of finding patterns, the system gently points them out (e.g., "You log anxiety on Tuesdays").</li>
        <li><strong>Privacy by Default:</strong> Journal entries are blurred by default. This creates a sense of safety, especially if the user opens the app in a public place or around others.</li>
      </ul>

      <h3 className="text-[#2C2C2A] font-serif">Maintaining Design System</h3>
      <p className="text-[#5C5C58]">
        The design uses consistent border radii (rounded-3xl for a soft, approachable feel), a strict typographic hierarchy (Serif for narrative/headers, Sans for metadata), and a muted, low-contrast border system to avoid harsh lines that can feel rigid or stressful.
      </p>
    </div>
  );
}
