
"use client";

import { useState, useEffect, useRef, use } from 'react'; // Imported 'use'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Mic, Send, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'me' | 'other';
  content: string;
  timestamp: string; // ISO string
  avatarUrl?: string;
}

const mockMessages: Message[] = [
  { id: '1', sender: 'other', content: 'مرحباً! كيف يمكنني مساعدتك اليوم؟', timestamp: new Date(Date.now() - 300000).toISOString(), avatarUrl: 'https://placehold.co/40x40.png?text=S' },
  { id: '2', sender: 'me', content: 'أهلاً، أود الاستفسار عن المنتج X.', timestamp: new Date(Date.now() - 240000).toISOString() },
  { id: '3', sender: 'other', content: 'بالتأكيد، المنتج X متوفر حالياً. هل لديك أي أسئلة محددة حوله؟', timestamp: new Date(Date.now() - 180000).toISOString(), avatarUrl: 'https://placehold.co/40x40.png?text=S' },
  { id: '4', sender: 'me', content: 'نعم، أود معرفة السعر وتاريخ انتهاء الصلاحية المتوقع.', timestamp: new Date(Date.now() - 120000).toISOString() },
  { id: '5', sender: 'other', content: 'سعر الوحدة 50 ريال سعودي، وتاريخ الانتهاء بعد سنتين من تاريخ الإنتاج.', timestamp: new Date(Date.now() - 60000).toISOString(), avatarUrl: 'https://placehold.co/40x40.png?text=S' },
];

// params.id would come from the URL
// Changed params type to Promise<{ id: string }> and renamed to paramsPromise
export default function ChatPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise); // Unwrap the promise using React.use()

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Now use the resolved `params`
  const otherPartyName = params.id === 'chat1' ? 'صيدلية الشفاء' : 'مندوب شركة الأمل الطبية';
  const otherPartyAvatar = params.id === 'chat1' ? 'https://placehold.co/40x40.png?text=S' : 'https://placehold.co/40x40.png?text=A';


  useEffect(() => {
    // Ensure params is resolved before using params.id
    if (params?.id) {
      setMessages(mockMessages);
    }
  }, [params?.id]); // Use resolved params.id

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const msg: Message = {
      id: (messages.length + 1).toString(),
      sender: 'me',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <header className="flex items-center p-3 border-b bg-card shadow-sm sticky top-0 z-10">
        <Link href="/chat" legacyBehavior>
          <a className="md:hidden text-primary hover:text-primary/80">
            <ChevronLeft size={24} />
          </a>
        </Link>
        <Avatar className="h-10 w-10 ml-3">
          <AvatarImage src={otherPartyAvatar} alt={otherPartyName} data-ai-hint="profile person" />
          <AvatarFallback>{otherPartyName ? otherPartyName.substring(0, 2).toUpperCase() : ''}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{otherPartyName}</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end max-w-[75%] md:max-w-[60%]",
              msg.sender === 'me' ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'
            )}
          >
            {msg.sender === 'other' && (
              <Avatar className="h-8 w-8 ml-2 self-start shrink-0">
                <AvatarImage src={msg.avatarUrl} alt="Sender" data-ai-hint="profile person"/>
                <AvatarFallback>{otherPartyName ? otherPartyName.substring(0,1) : ''}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "p-3 rounded-xl shadow",
                msg.sender === 'me'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-card text-card-foreground rounded-bl-none border'
              )}
            >
              <p className="text-sm">{msg.content}</p>
              <p className={cn(
                  "text-xs mt-1",
                  msg.sender === 'me' ? 'text-primary-foreground/70 text-left' : 'text-muted-foreground text-right'
                )}
              >
                {new Date(msg.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-3 border-t bg-card sticky bottom-0">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 space-x-reverse">
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Paperclip size={20} />
          </Button>
          <Input
            type="text"
            placeholder="اكتب رسالتك هنا..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            dir="rtl"
          />
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Mic size={20} />
          </Button>
          <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Send size={20} />
          </Button>
        </form>
      </footer>
    </div>
  );
}
