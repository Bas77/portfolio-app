'use client'
import { useState, FormEvent, JSX } from 'react';
// import Head from 'next/head';
import { Mail, Phone, MapPin, MoreHorizontal } from 'lucide-react';

// Mock data for public messages
interface MockPublicMessage {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatarColor: string;
  avatarInitial: string;
}

const mockMessages: MockPublicMessage[] = [
  {
    id: "1",
    name: "Marcello Alvisnkie",
    message: "I have a crush on Sebas",
    timestamp: "2 hours ago",
    avatarColor: "#3B82F6", // blue-500
    avatarInitial: "MA"
  },
  {
    id: "2",
    name: "Howard Marco Tantra",
    message: "Gintoro FX",
    timestamp: "5 hours ago",
    avatarColor: "#EC4899", // pink-500
    avatarInitial: "HM"
  },
  {
    id: "3",
    name: "Owen Siau",
    message: "ipsum lorem cok",
    timestamp: "1 day ago",
    avatarColor: "#10B981", // emerald-500
    avatarInitial: "OS"
  }
];



const ContactInfoItem = ({ icon, title, value, href }: { icon: JSX.Element, title: string, value: string, href?: string }) => (
  <div className="flex items-start space-x-3">
    <div className="text-sky-400 mt-1">{icon}</div>
    <div>
      <h3 className="font-semibold text-slate-300">{title}</h3>
      {href ? (
        <a href={href} className="text-slate-400 hover:text-sky-400 transition-colors break-all">{value}</a>
      ) : (
        <p className="text-slate-400 break-all">{value}</p>
      )}
    </div>
  </div>
);

const PrivateMessageForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // Kept for visual feedback
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null); // Kept for visual feedback

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    console.log("Private Message Data (UI Only):", formData); // Log data
    // Simulate submission for UX
    setTimeout(() => {
      setSubmitStatus({ type: 'success', message: 'Message submitted (UI only)!' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Send Private Message</h2>
        <MoreHorizontal className="text-slate-500" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-sky-500 focus:border-sky-500 transition-shadow cursor-text" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-sky-500 focus:border-sky-500 transition-shadow cursor-text" placeholder="your.email@example.com" />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1">Subject</label>
          <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-sky-500 focus:border-sky-500 transition-shadow cursor-text" placeholder="Project inquiry" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
          <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows={4} required className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-sky-500 focus:border-sky-500 transition-shadow cursor-text" placeholder="Tell me about your project..."></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 cursor-pointer">
          {isSubmitting ? 'Sending...' : 'Send Private Message'}
        </button>
        {submitStatus && (
          <p className={`mt-2 text-sm ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {submitStatus.message}
          </p>
        )}
      </form>
    </div>
  );
};

const PublicMessageForm = () => {
  // State for visual feedback only
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Name and message cannot be empty.' });
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    console.log("Public Message Data (UI Only):", { name, email, message });
    // Simulate submission for UX
    setTimeout(() => {
      setSubmitStatus({ type: 'success', message: 'Message posted (UI only)!' });
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="p-6 sm:p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Public Message Board</h2>
        <span className="bg-sky-500 text-xs text-white px-2 py-1 rounded-full">{mockMessages.length} messages</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="publicName" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
            <input type="text" name="publicName" id="publicName" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-sky-500 focus:border-sky-500 transition-shadow cursor-text" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="publicEmail" className="block text-sm font-medium text-slate-300 mb-1">Email (optional)</label>
            <input type="email" name="publicEmail" id="publicEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-sky-500 focus:border-sky-500 transition-shadow cursor-text" placeholder="your@email.com" />
          </div>
        </div>
        <div>
          <label htmlFor="publicMessage" className="block text-sm font-medium text-slate-300 mb-1">Public Message</label>
          <textarea name="publicMessage" id="publicMessage" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-3 focus:ring-sky-500 focus:border-sky-500 transition-shadow cursor-text" placeholder="Share your thoughts publicly..."></textarea>
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 cursor-pointer">
          {isSubmitting ? 'Posting...' : 'Post Public Message'}
        </button>
         {submitStatus && (
          <p className={`mt-2 text-sm ${submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {submitStatus.message}
          </p>
        )}
      </form>
    </div>
  );
};

const RecentMessages = () => {
  const [sortOrder, setSortOrder] = useState<'Newest' | 'Oldest'>('Newest');
  
  // Sort mock messages based on sortOrder (simplified as mock data doesn't have real timestamps)
  const displayedMessages = [...mockMessages].sort((a, b) => {
    if (sortOrder === 'Oldest') {
      // For mock data, we can assume IDs are somewhat sequential or just reverse
      return parseInt(a.id) - parseInt(b.id); 
    }
    return parseInt(b.id) - parseInt(a.id); // Newest first
  });

  return (
    <div className=" p-6 sm:p-8 rounded-lg shadow-xl mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Recent Messages</h2>
        <div className="flex space-x-2 text-sm">
          <button onClick={() => setSortOrder('Newest')} className={`px-3 py-1 rounded-md ${sortOrder === 'Newest' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>Newest</button>
          <button onClick={() => setSortOrder('Oldest')} className={`px-3 py-1 rounded-md ${sortOrder === 'Oldest' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>Oldest</button>
        </div>
      </div>
      {displayedMessages.length === 0 ? (
        <p className="text-slate-400 text-center py-4">No public messages yet.</p>
      ) : (
        <div className="space-y-6">
          {displayedMessages.map((msg) => (
            <div key={msg.id} className="bg-slate-700 p-4 rounded-lg shadow-md">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg`} style={{ backgroundColor: msg.avatarColor }}>
                  {msg.avatarInitial}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sky-400">{msg.name}</h4>
                    <span className="text-xs text-slate-500">#{msg.id}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{msg.timestamp}</p>
                  <p className="text-slate-300 text-sm leading-relaxed break-words">{msg.message}</p>
                  {/* Voting and edit/delete buttons removed for UI only version */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {displayedMessages.length > 0 && (
        <div className="mt-8 text-center">
          <button className="bg-slate-700 hover:bg-slate-600 text-sky-400 font-semibold py-2 px-6 rounded-md transition-colors">
            View All Messages
          </button>
        </div>
      )}
    </div>
  );
};



export default function ContactPage() {
  const [activeSection, setActiveSection] = useState<'private' | 'public'>('private');

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-16 caret-transparent">
      <div className="min-h-screen text-slate-100 font-sans">
        <main className="container mx-auto px-4 py-12 sm:py-16" id="contact">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Get In Touch</h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Send me a private message or view the public message board (UI demonstration).
            </p>
          </header>

          <div className="flex justify-center space-x-2 sm:space-x-4 mb-12">
            <button 
              onClick={() => setActiveSection('private')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-150 ease-in-out text-sm sm:text-base cursor-pointer ${activeSection === 'private' ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              Private Message
            </button>
            <button 
              onClick={() => setActiveSection('public')}
              className={`px-6 py-3 rounded-md font-semibold transition-all duration-150 ease-in-out text-sm sm:text-base cursor-pointer ${activeSection === 'public' ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              Public Board
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Information (Left) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-6 sm:p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <ContactInfoItem icon={<Mail size={20} />} title="Email" value="sebastianramli77@gmail.com" href="mailto:sebastianramli77@gmail.com" />
                  <ContactInfoItem icon={<Phone size={20} />} title="Phone" value="+62 82110855768" href="https://wa.me/6282110855768?text=Hey%2C%20I%27ve%20checked%20out%20your%20website%21" />
                  <ContactInfoItem icon={<MapPin size={20} />} title="Location" value="Alam Sutera, Indonesia" />
                </div>
              </div>
            </div>

            {/* Message Form (Right) */}
            <div className="lg:col-span-7 space-y-8">
              {activeSection === 'private' ? (
                <PrivateMessageForm />
              ) : (
                <>
                  <PublicMessageForm />
                  <RecentMessages />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
