import { useState, useEffect, useRef } from 'react';
import { subscribeToMessages, subscribeToTyping, createMessage, addReaction } from '../lib/firebase';
import type { Message, Channel, User } from '../lib/firebase';
import { Smile, Paperclip, Send, Menu, Users, Hash } from 'lucide-react';
import { EmojiPicker } from './EmojiPicker';
import './ChatArea.css';

interface ChatAreaProps {
  channel: Channel;
  currentUser: User;
  onOpenSidebar?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ channel, currentUser, onOpenSidebar }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToMessages(channel.id, setMessages);
    return () => unsubscribe && unsubscribe();
  }, [channel.id]);

  useEffect(() => {
    const unsubscribe = subscribeToTyping(channel.id, setTypingUsers);
    return () => unsubscribe && unsubscribe();
  }, [channel.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    await createMessage(channel.id, inputText.trim(), currentUser);
    setInputText('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReaction = async (messageId: string, emoji: string) => {
    await addReaction(channel.id, messageId, emoji, currentUser.id);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-area">
      <div className="chat-header pixel-box">
        <div className="chat-header-info">
          {onOpenSidebar && (
            <button className="mobile-menu-btn" onClick={onOpenSidebar}>
              <Menu size={24} />
            </button>
          )}
          <Hash className="chat-header-icon" size={20} />
          <div>
            <div className="chat-header-title">{channel.name}</div>
            <div className="chat-header-desc">{channel.description}</div>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="chat-header-btn">
            <Users size={20} />
          </button>
        </div>
      </div>

      <div className="messages-container scrollbar-pixel">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-avatar">{message.avatar}</div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-author">{message.sender}</span>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
              <div className="message-text">{message.text}</div>
              
              {message.reactions && Object.keys(message.reactions).length > 0 && (
                <div className="message-reactions">
                  {Object.entries(message.reactions).map(([emoji, users]) => (
                    <button
                      key={emoji}
                      className={`reaction ${users.includes(currentUser.id) ? 'active' : ''}`}
                      onClick={() => handleReaction(message.id, emoji)}
                    >
                      <span>{emoji}</span>
                      <span className="reaction-count">{users.length}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="message-actions">
                <button
                  className="message-action-btn"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          {typingUsers.join(', ')} يكتب{typingUsers.length > 1 ? 'ون' : ''}
          <span className="typing-dots">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </span>
        </div>
      )}

      <div className="chat-input-area">
        {showEmojiPicker && (
          <EmojiPicker
            onSelect={(emoji) => {
              setInputText(prev => prev + emoji);
              setShowEmojiPicker(false);
              inputRef.current?.focus();
            }}
            onClose={() => setShowEmojiPicker(false)}
          />
        )}
        <div className="chat-input-container">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder={`رسالة في #${channel.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <div className="input-actions">
            <button className="input-action-btn">
              <Paperclip size={20} />
            </button>
            <button
              className="input-action-btn"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={20} />
            </button>
            <button className="send-btn" onClick={handleSend}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
