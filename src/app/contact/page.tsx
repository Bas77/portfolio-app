'use client'
import { useState, FormEvent, JSX, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, MoreHorizontal } from 'lucide-react';
// Import your Firebase config
import { db } from '../lib/firebase'; 
import { 
    collection, 
    onSnapshot, 
    orderBy, 
    query, 
    addDoc, 
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { useSettings } from '../context/settings-context';

// Interface for messages fetched from Firestore
interface PublicMessage {
  id: string;
  name: string;
  message: string;
  timestamp: Timestamp;
  avatarColor?: string;
  avatarInitial?: string;
}
type SummaryScore = {
  value: number;
  type: string;
};

type AttributeScore = {
  summaryScore: SummaryScore;
};

type PerspectiveResponse = {
  attributeScores: Record<string, AttributeScore>;
};
// Helper function to generate a random color for avatars
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setSubmitStatus({ type: 'error', message: 'Please fill out all fields.' });
        return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await addDoc(collection(db, "private"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp(),
      });
      
      setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      console.error("Error sending private message: ", error);
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
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

const PublicMessageForm = ({ messageCount }: { messageCount: number }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (typeof window !== 'undefined') {
        const lastMessageTimestamp = localStorage.getItem('lastPublicMessageTimestamp');
        const currentTime = new Date().getTime();
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

        if (lastMessageTimestamp) {
            const timeSinceLastMessage = currentTime - parseInt(lastMessageTimestamp, 10);
            if (timeSinceLastMessage < oneHour) {
                const timeLeft = Math.ceil((oneHour - timeSinceLastMessage) / (60 * 1000));
                setSubmitStatus({ type: 'error', message: `You can post again in ${timeLeft} minutes.` });
                return; // Stop the submission
            }
        }
    }

    if (!message.trim() || !name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Name and message cannot be empty.' });
      return;
    }

    // Moderate content using Perspective API
    const perspectiveApiKey = process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY;
    if (!perspectiveApiKey) {
      setSubmitStatus({ type: 'error', message: 'Perspective API key is missing. Contact the administrator.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=' + perspectiveApiKey, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: { text: `${name}\n${message}` }, // Combine name and message for moderation
          requestedAttributes: {
            TOXICITY: {},
            SEVERE_TOXICITY: {},
            INSULT: {},
            THREAT: {},
          },
          languages: ['en', 'id'], // Specify language (adjust if multilingual needed)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Moderation API error');
      }

      const data: PerspectiveResponse = await response.json();
const scores = data.attributeScores;
      const isFlagged = Object.entries(scores).some(([, value]) => value.summaryScore.value > 0.5); // Threshold of 0.5
      if (isFlagged) {
        const violations = Object.entries(scores)
          .filter(([, value]) => value.summaryScore.value > 0.5)
          .map(([category]) => category.toLowerCase())
          .join(', ');
        setSubmitStatus({ type: 'error', message: `Content flagged for: ${violations}. Please revise your input.` });
        return;
      }

      // If content passes moderation, proceed with Firestore submission
      await addDoc(collection(db, "public"), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
        avatarColor: getRandomColor(),
        avatarInitial: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('lastPublicMessageTimestamp', new Date().getTime().toString());
      }

      setSubmitStatus({ type: 'success', message: 'Message posted successfully!' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error("Error during moderation or submission: ", error);
      setSubmitStatus({ type: 'error', message: 'Failed to post message due to moderation or server error.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-6 sm:p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Public Message Board</h2>
        <span className="bg-sky-500 text-xs text-white px-2 py-1 rounded-full">{messageCount} messages</span>
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

const RecentMessages = ({ messages }: { messages: PublicMessage[] }) => {
  const [sortOrder, setSortOrder] = useState<"Newest" | "Oldest">("Newest");
  const [showAll, setShowAll] = useState(false); // State for pagination
  const displayLimit = 5;

  // Helper function to format Firestore Timestamps
  const formatTimeAgo = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate();
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) < 5 ? "Just now" : Math.floor(seconds) + " seconds ago";
  };

  const sortedMessages = [...messages].sort((a, b) => {
    const timeA = a.timestamp ? a.timestamp.toMillis() : 0;
    const timeB = b.timestamp ? b.timestamp.toMillis() : 0;
    return sortOrder === "Oldest" ? timeA - timeB : timeB - timeA;
  });
  
  const displayedMessages = showAll ? sortedMessages : sortedMessages.slice(0, displayLimit);

  return (
    <div className="p-6 sm:p-8 rounded-lg shadow-xl mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Recent Messages</h2>
        <div className="flex space-x-2 text-sm">
          <button
            onClick={() => setSortOrder("Newest")}
            className={`px-3 py-1 rounded-md ${sortOrder === "Newest" ? "bg-sky-500 text-white" : "text-slate-400 hover:bg-slate-700"}`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortOrder("Oldest")}
            className={`px-3 py-1 rounded-md ${sortOrder === "Oldest" ? "bg-sky-500 text-white" : "text-slate-400 hover:bg-slate-700"}`}
          >
            Oldest
          </button>
        </div>
      </div>
      {messages.length === 0 ? (
        <p className="text-slate-400 text-center py-4">No public messages yet. Be the first to post!</p>
      ) : (
        <div className="space-y-6">
          {displayedMessages.map((msg) => (
            <div key={msg.id} className="bg-slate-700 p-4 rounded-lg shadow-md">
              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: msg.avatarColor }}
                >
                  {msg.avatarInitial}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sky-400">{msg.name}</h4>
                    <span className="text-xs text-slate-500">#{msg.id.substring(0, 4)}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{formatTimeAgo(msg.timestamp)}</p>
                  <p className="text-slate-300 text-sm leading-relaxed break-words">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        {!showAll && messages.length > displayLimit && (
          <button onClick={() => setShowAll(true)} className="bg-slate-700 hover:bg-slate-600 text-sky-400 font-semibold py-2 px-6 rounded-md transition-colors cursor-pointer">
            View All Messages
          </button>
        )}
        {showAll && messages.length > displayLimit && (
           <button onClick={() => setShowAll(false)} className="bg-slate-700 hover:bg-slate-600 text-sky-400 font-semibold py-2 px-6 rounded-md transition-colors cursor-pointer">
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [activeSection, setActiveSection] = useState<'private' | 'public'>('private');
  const [messages, setMessages] = useState<PublicMessage[]>([]);

  // Effect to listen to Firestore changes
  useEffect(() => {
    const q = query(collection(db, "public"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData: PublicMessage[] = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id } as PublicMessage);
      });
      setMessages(messagesData);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

    // Lenis stuff
    const {isLenisEnabled} = useSettings()
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenisRef = useRef<any>(null)
    const animationFrameRef = useRef<number | null>(null)
  
    useEffect(() => {
      let raf: (time: number) => void;
  
      const initLenis = async () => {
        const Lenis = (await import("lenis")).default;
  
        const wrapper = document.getElementById("lenis-wrapper");
        const content = document.getElementById("lenis-content");
  
        // We probably don't need this
        if (!(wrapper instanceof HTMLElement) || !(content instanceof HTMLElement)) {
          console.warn("Lenis wrapper or content not found.");
          return;
        }
  
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wrapper,
          content,
        });
  
        lenisRef.current = lenis;
  
        // RAF with conditional enable check
        raf = (time: number) => {
          if (isLenisEnabled && lenisRef.current) {
            lenisRef.current.raf(time);
          }
          animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);
  
  
        // Cleanup function
        return () => {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          lenis.destroy?.();
        };
      };
  
      if (isLenisEnabled) {
        const cleanupPromise = initLenis();
        return () => {
          cleanupPromise.then((cleanup) => {
            if (typeof cleanup === "function") cleanup();
          });
        };
      } else {
        // Disable Lenis manually if already running
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        if (lenisRef.current?.destroy) {
          lenisRef.current.destroy();
          lenisRef.current = null;
        }
      }
    }, [isLenisEnabled]);
  return (
    <div id='lenis-wrapper' className="h-screen w-screen overflow-y-auto overflow-x-hidden">
    <div id='lenis-content' className="will-change-transform">
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 md:px-8 lg:px-16 caret-transparent">
      <div className="min-h-screen text-slate-100 font-sans">
        <main className="container mx-auto px-4 py-12 sm:py-16" id="contact">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Message Me</h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
              Send me a private message or leave a public message on the board.
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
            <div className="lg:col-span-5 space-y-8">
              <div className="p-6 sm:p-8 rounded-lg">
                <h2 className="text-2xl font-semibold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <ContactInfoItem icon={<Mail size={20} />} title="Email" value="sebastianramli77@gmail.com" href="mailto:sebastianramli77@gmail.com" />
                  <ContactInfoItem icon={<Phone size={20} />} title="Phone" value="+62 82110855768" href="https://wa.me/6282110855768?text=Hey%2C%20I%27ve%20checked%20out%20your%20website%21" />
                  <ContactInfoItem icon={<MapPin size={20} />} title="Location" value="Alam Sutera, Indonesia" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              {activeSection === 'private' ? (
                <PrivateMessageForm />
              ) : (
                <>
                  <PublicMessageForm messageCount={messages.length} />
                  <RecentMessages messages={messages} />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
    </div>
  );
}