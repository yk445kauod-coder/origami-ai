export interface User {
  uid: string;
  displayName?: string;
  photoURL?: string;
}

export interface Message {
  id?: string;
  sender: string;
  type: 'text' | 'image' | 'video';
  content: string;
  ts?: number | { ".sv": "timestamp" };
  edited?: boolean;
  replyOf?: {
    text: string;
    type: string;
  };
  reactions?: Record<string, string>;
}

export interface ChatState {
  messages: Message[];
  user: User | null;
  isLoading: boolean;
  replyData: Message | null;
  editId: string | null;
  isTyping: boolean;
  selectedMessage: Message | null;
  selectedId: string | null;
}

export interface PixelEmoji {
  id: string;
  name: string;
  unified: string;
  shortcodes: string[];
  category: string;
  svg: string;
}

export interface EmojiCategory {
  id: string;
  name: string;
  icon: string;
}

export interface EmojiPack {
  name: string;
  version: string;
  author: string;
  description: string;
  emojis: PixelEmoji[];
  categories: EmojiCategory[];
  metadata: {
    generatedAt: string;
    version: string;
    license: string;
    author: string;
    website: string;
    appUrl: string;
  };
}
