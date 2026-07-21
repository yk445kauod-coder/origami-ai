import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  auth, 
  db, 
  signInAnonymously, 
  onAuthStateChanged,
  ref, 
  push, 
  set, 
  onChildAdded, 
  onChildChanged, 
  onChildRemoved, 
  onValue,
  serverTimestamp,
  update,
  remove,
  CHAT_PATH,
  TYPING_PATH
} from '../firebase';
import type { User, Message } from '../types/chat';

export function useChat() {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Sign in anonymously
    signInAnonymously(auth).catch(console.error);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || 'Player',
          photoURL: firebaseUser.photoURL || undefined
        });
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const rootRef = ref(db, CHAT_PATH);

    // Listen for new messages
    const unsubAdded = onChildAdded(rootRef, (snap) => {
      const data = snap.val();
      if (data) {
        setMessages(prev => [...prev, { ...data, id: snap.key }]);
      }
    });

    // Listen for message updates (edit/reactions)
    const unsubChanged = onChildChanged(rootRef, (snap) => {
      const data = snap.val();
      if (data) {
        setMessages(prev => prev.map(msg => 
          msg.id === snap.key ? { ...data, id: snap.key } : msg
        ));
      }
    });

    // Listen for deleted messages
    const unsubRemoved = onChildRemoved(rootRef, (snap) => {
      setMessages(prev => prev.filter(msg => msg.id !== snap.key));
    });

    // Listen for typing indicator
    const unsubTyping = onValue(ref(db, TYPING_PATH), (snap) => {
      const dict = snap.val() || {};
      const active = Object.keys(dict).some(k => k !== user.uid && dict[k]);
      setIsTyping(active);
    });

    return () => {
      unsubAdded();
      unsubChanged();
      unsubRemoved();
      unsubTyping();
    };
  }, [user]);

  const sendMessage = useCallback(async (
    type: 'text' | 'image' | 'video', 
    content: string, 
    replyOf?: { text: string; type: string }
  ) => {
    if (!user) return;
    if (type === 'text' && !content.trim()) return;

    const msg = {
      sender: user.uid,
      type,
      content: content.trim(),
      ts: serverTimestamp(),
    };

    if (replyOf) {
      (msg as any).replyOf = replyOf;
    }

    await push(ref(db, CHAT_PATH), msg);
    await setTyping(false);
  }, [user]);

  const editMessage = useCallback(async (id: string, content: string) => {
    if (!user) return;
    await update(ref(db, `${CHAT_PATH}/${id}`), { 
      content, 
      edited: true 
    });
  }, [user]);

  const deleteMessage = useCallback(async (id: string) => {
    if (!user) return;
    await remove(ref(db, `${CHAT_PATH}/${id}`));
  }, [user]);

  const addReaction = useCallback(async (id: string, emoji: string, currentReactions?: Record<string, string>) => {
    if (!user) return;
    const newReactions = { ...currentReactions, [user.uid]: emoji };
    await update(ref(db, `${CHAT_PATH}/${id}`), { reactions: newReactions });
  }, [user]);

  const setTyping = useCallback(async (typing: boolean) => {
    if (!user) return;
    await set(ref(db, `${TYPING_PATH}/${user.uid}`), typing);
  }, [user]);

  const handleTyping = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setTyping(true);
    typingTimeoutRef.current = window.setTimeout(() => {
      setTyping(false);
    }, 2000);
  }, [setTyping]);

  return {
    user,
    messages,
    isLoading,
    isTyping,
    sendMessage,
    editMessage,
    deleteMessage,
    addReaction,
    setTyping,
    handleTyping
  };
}
