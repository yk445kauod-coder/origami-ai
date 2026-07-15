import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, off, set, query, orderByChild, limitToLast, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDemo-Egytronic-Chat-2024",
  authDomain: "egytronic-chat.firebaseapp.com",
  databaseURL: "https://egytronic-chat-default-rtdb.firebaseio.com",
  projectId: "egytronic-chat",
  storageBucket: "egytronic-chat.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export interface Message {
  id: string;
  text: string;
  sender: string;
  avatar: string;
  timestamp: number;
  reactions?: Record<string, string[]>;
  isSystem?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'idle';
  customStatus?: string;
}

export const channels: Channel[] = [
  { id: 'general', name: 'عام', icon: '🏠', description: 'غرفة المحادثة العامة' },
  { id: 'gaming', name: 'ألعاب', icon: '🎮', description: 'ناقش الألعاب المفضلة' },
  { id: 'music', name: 'موسيقى', icon: '🎵', description: 'شارك موسيقاك المفضلة' },
  { id: 'tech', name: 'تقنية', icon: '💻', description: 'ناقش أحدث التقنيات' },
  { id: 'art', name: 'فن', icon: '🎨', description: 'شارك إبداعاتك الفنية' },
];

export const createMessage = async (channelId: string, text: string, sender: User) => {
  const messagesRef = ref(db, `channels/${channelId}/messages`);
  const newMessage = {
    id: push(messagesRef).key,
    text,
    sender: sender.name,
    avatar: sender.avatar,
    timestamp: Date.now(),
    reactions: {},
  };
  await push(messagesRef, { ...newMessage, id: push(messagesRef).key });
  return newMessage;
};

export const subscribeToMessages = (
  channelId: string,
  callback: (messages: Message[]) => void,
  limit: number = 50
) => {
  const messagesRef = ref(db, `channels/${channelId}/messages`);
  const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(limit));
  
  onValue(messagesQuery, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      callback([]);
      return;
    }
    const messages: Message[] = Object.entries(data)
      .map(([id, msg]: [string, any]) => ({ ...msg, id }))
      .sort((a, b) => a.timestamp - b.timestamp);
    callback(messages);
  });

  return () => off(messagesRef);
};

export const addReaction = async (channelId: string, messageId: string, emoji: string, userId: string) => {
  const reactionRef = ref(db, `channels/${channelId}/messages/${messageId}/reactions/${emoji}`);
  const snapshot = await new Promise<any>((resolve) => {
    onValue(reactionRef, resolve, { onlyOnce: true });
  });
  const currentUsers: string[] = snapshot.val() || [];
  if (!currentUsers.includes(userId)) {
    await set(reactionRef, [...currentUsers, userId]);
  }
};

export const sendTypingIndicator = async (channelId: string, userId: string, isTyping: boolean) => {
  const typingRef = ref(db, `channels/${channelId}/typing/${userId}`);
  if (isTyping) {
    await set(typingRef, { name: userId, timestamp: Date.now() });
  } else {
    await remove(typingRef);
  }
};

export const subscribeToTyping = (channelId: string, callback: (users: string[]) => void) => {
  const typingRef = ref(db, `channels/${channelId}/typing`);
  onValue(typingRef, (snapshot) => {
    const data = snapshot.val() || {};
    const users = Object.values(data)
      .map((t: any) => t.name)
      .filter(Boolean);
    callback(users);
  });
  return () => off(typingRef);
};
