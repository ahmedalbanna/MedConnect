
"use client";

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Mic, Send, Search, UserCircle, MessageSquare } from 'lucide-react'; 
import { cn } from '@/lib/utils';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  sender: 'admin' | 'user';
  content: string;
  timestamp: string; // ISO string
  userAvatarUrl?: string; // Only for user messages
}

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'pharmacy' | 'medical_rep';
}

const mockUsers: User[] = [
  { id: 'user1', name: 'صيدلية النور', email: 'alnoor@example.com', avatarUrl: 'https://placehold.co/40x40.png?text=AN', role: 'pharmacy' },
  { id: 'user2', name: 'أحمد خالد', email: 'ahmed.k@rep.com', avatarUrl: 'https://placehold.co/40x40.png?text=AK', role: 'medical_rep' },
  { id: 'user3', name: 'سارة علي', email: 'sara.a@rep.com', avatarUrl: 'https://placehold.co/40x40.png?text=SA', role: 'medical_rep' },
];

const mockChatHistory: { [userId: string]: Message[] } = {
  user1: [
    { id: 'm1', sender: 'user', content: 'لدي استفسار بخصوص طلبي الأخير.', timestamp: new Date(Date.now() - 600000).toISOString(), userAvatarUrl: 'https://placehold.co/40x40.png?text=AN' },
    { id: 'm2', sender: 'admin', content: 'أهلاً بك، صيدلية النور. كيف يمكنني مساعدتك؟', timestamp: new Date(Date.now() - 540000).toISOString() },
  ],
  user2: [
    { id: 'm3', sender: 'admin', content: 'مرحباً أحمد، هل تم استلام العينات الجديدة؟', timestamp: new Date(Date.now() - 720000).toISOString() },
  ],
};

export default function AdminChatPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [openUserSearch, setOpenUserSearch] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setMessages(mockChatHistory[selectedUser.id] || []);
    } else {
      setMessages([]);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedUser) return;
    const msg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'admin',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, msg]);
    // Update mockChatHistory (in a real app, this would be a DB update)
    if (!mockChatHistory[selectedUser.id]) mockChatHistory[selectedUser.id] = [];
    mockChatHistory[selectedUser.id].push(msg);
    setNewMessage('');
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setOpenUserSearch(false);
  };

  return (
    <div className="flex flex-col flex-1 border rounded-lg shadow-xl overflow-hidden">
      <header className="flex items-center p-3 border-b bg-card shadow-sm sticky top-0 z-10">
        {selectedUser ? (
          <>
            <Avatar className="h-10 w-10 ms-3">
              <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.name} data-ai-hint="profile person" />
              <AvatarFallback>{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
              <p className="text-xs text-muted-foreground">{selectedUser.email} - {selectedUser.role === 'pharmacy' ? 'صيدلية' : 'مندوب طبي'}</p>
            </div>
          </>
        ) : (
          <h2 className="text-lg font-semibold flex-grow">محادثات المسؤول</h2>
        )}
        <Button variant="outline" onClick={() => setOpenUserSearch(true)}>
          <Search size={16} className="ms-2" /> {selectedUser ? 'تغيير المستخدم' : 'اختيار مستخدم'}
        </Button>
      </header>

      <CommandDialog open={openUserSearch} onOpenChange={setOpenUserSearch} dir="rtl">
        <CommandInput placeholder="ابحث عن مستخدم بالاسم أو البريد الإلكتروني..." />
        <CommandList>
          <CommandEmpty>لم يتم العثور على مستخدمين.</CommandEmpty>
          <CommandGroup heading="المستخدمون">
            {mockUsers.map(user => (
              <CommandItem key={user.id} onSelect={() => handleUserSelect(user)} value={`${user.name} ${user.email}`}>
                <Avatar className="h-8 w-8 ms-3">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile person" />
                  <AvatarFallback>{user.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
                <span className="text-xs text-muted-foreground me-auto">{user.email}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <ScrollArea className="flex-1 p-4 space-y-4 bg-muted/20">
        {!selectedUser ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <UserCircle size={48} className="mb-4" />
            <p className="text-lg">الرجاء اختيار مستخدم لبدء المحادثة.</p>
          </div>
        ) : messages.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <MessageSquare size={48} className="mb-4" />
            <p className="text-lg">لا توجد رسائل مع هذا المستخدم. ابدأ محادثة جديدة!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end max-w-[75%] md:max-w-[60%]",
                msg.sender === 'admin' ? 'me-auto flex-row-reverse' : 'ms-auto flex-row'
              )}
            >
              {msg.sender === 'user' && (
                <Avatar className="h-8 w-8 ms-2 self-start shrink-0">
                  <AvatarImage src={msg.userAvatarUrl} alt="User" data-ai-hint="profile person" />
                  <AvatarFallback>{selectedUser?.name.substring(0,1)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "p-3 rounded-xl shadow",
                  msg.sender === 'admin'
                    ? 'bg-primary text-primary-foreground rounded-be-none'
                    : 'bg-card text-card-foreground rounded-bs-none border'
                )}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={cn(
                    "text-xs mt-1",
                    msg.sender === 'admin' ? 'text-primary-foreground/70 text-start' : 'text-muted-foreground text-end'
                  )}
                >
                  {new Date(msg.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <footer className="p-3 border-t bg-card sticky bottom-0">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2 space-x-reverse">
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled={!selectedUser}>
            <Paperclip size={20} />
          </Button>
          <Input
            type="text"
            placeholder={selectedUser ? "اكتب رسالتك هنا..." : "الرجاء اختيار مستخدم أولاً"}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            dir="rtl"
            disabled={!selectedUser}
          />
          <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled={!selectedUser}>
            <Mic size={20} />
          </Button>
          <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!selectedUser || newMessage.trim() === ''}>
            <Send size={20} />
          </Button>
        </form>
      </footer>
    </div>
  );
}
