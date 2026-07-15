import { useState, useEffect, useRef, useCallback } from 'react';
import { useChat } from './hooks/useChat';
import type { Message, PixelEmoji } from './types/chat';
import pixelEmojis from './data/pixelEmojis.json';
import './App.css';

// Parse timestamp from Firebase
const parseTimestamp = (ts: any): Date => {
  if (ts && typeof ts === 'object' && '.sv' in ts) {
    return new Date();
  }
  if (typeof ts === 'number') {
    return new Date(ts);
  }
  return new Date();
};

function App() {
  const { 
    user, 
    messages, 
    isLoading, 
    isTyping, 
    sendMessage, 
    editMessage, 
    deleteMessage, 
    addReaction,
    handleTyping 
  } = useChat();

  const [inputValue, setInputValue] = useState('');
  const [replyData, setReplyData] = useState<{ text: string; type: string } | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setShowContextMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSend = useCallback(async () => {
    if (editId) {
      await editMessage(editId, inputValue);
      setEditId(null);
    } else {
      await sendMessage('text', inputValue, replyData || undefined);
    }
    setInputValue('');
    setReplyData(null);
  }, [inputValue, editId, replyData, sendMessage, editMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape') {
      setReplyData(null);
      setEditId(null);
      setInputValue('');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, msg: Message, id: string) => {
    e.preventDefault();
    if (msg.sender !== user?.uid) return;
    setSelectedMsg(msg);
    setSelectedId(id);
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleAction = (action: string) => {
    if (!selectedMsg || !selectedId) return;
    
    switch (action) {
      case 'reply':
        setReplyData({ text: selectedMsg.content, type: selectedMsg.type });
        inputRef.current?.focus();
        break;
      case 'edit':
        setEditId(selectedId);
        setInputValue(selectedMsg.content);
        inputRef.current?.focus();
        break;
      case 'delete':
        deleteMessage(selectedId);
        break;
    }
    setShowContextMenu(false);
  };

  const handleReaction = async (emoji: string) => {
    if (!selectedId) return;
    await addReaction(selectedId, emoji, selectedMsg?.reactions);
    setShowContextMenu(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (file.type.startsWith('image/')) {
        setImagePreview(dataUrl);
      }
      await sendMessage(
        file.type.startsWith('image/') ? 'image' : 'video', 
        dataUrl
      );
      setImagePreview(null);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const insertEmoji = (emoji: PixelEmoji) => {
    setInputValue(prev => prev + emoji.shortcodes[0]);
    inputRef.current?.focus();
  };

  const formatTime = (ts: any) => {
    const date = parseTimestamp(ts);
    return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  };

  const isMe = (msg: Message) => msg.sender === user?.uid;

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-pixel-logo">
          <div className="pixel-loader"></div>
        </div>
        <p className="loading-text">Egytronic Chat</p>
        <p className="loading-subtext">Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="mobile-sidebar-toggle"
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Server/Channel Sidebar */}
      <aside className={`sidebar ${showMobileSidebar ? 'mobile-open' : ''}`}>
        <div className="server-header">
          <div className="server-logo">
            <span className="pixel-icon">EG</span>
          </div>
          <h2>Egytronic</h2>
        </div>
        
        <div className="channel-section">
          <div className="section-header">
            <i className="fas fa-chevron-down"></i>
            <span>القنوات النصية</span>
          </div>
          <div className="channel active">
            <i className="fas fa-hashtag"></i>
            <span>general</span>
          </div>
          <div className="channel">
            <i className="fas fa-hashtag"></i>
            <span>chat</span>
          </div>
          <div className="channel">
            <i className="fas fa-hashtag"></i>
            <span>random</span>
          </div>
        </div>

        <div className="user-panel">
          <div className="user-avatar">
            <div className="avatar-placeholder">P</div>
            <div className="status-indicator online"></div>
          </div>
          <div className="user-info">
            <span className="username">{user?.displayName}</span>
            <span className="user-status">Online</span>
          </div>
          <div className="user-actions">
            <button><i className="fas fa-microphone"></i></button>
            <button><i className="fas fa-headphones"></i></button>
            <button><i className="fas fa-cog"></i></button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main">
        {/* Chat Header */}
        <header className="chat-header">
          <div className="header-info">
            <i className="fas fa-hashtag"></i>
            <h1>general</h1>
          </div>
          <div className="header-actions">
            <div className={`typing-indicator ${isTyping ? 'active' : ''}`}>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span>جاري الكتابة...</span>
            </div>
            <a href="https://egytronic.pages.dev" target="_blank" rel="noopener noreferrer" className="brand-link">
              Egytronic
            </a>
          </div>
        </header>

        {/* Messages Area */}
        <div className="messages-container">
          <div className="welcome-message">
            <div className="welcome-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <h2>مرحباً بك في Egytronic Chat!</h2>
            <p>هذا هو بداية محادثتك الجديدة. ابدأ بإرسال رسالة!</p>
          </div>

          {messages.map((msg, index) => {
            const msgId = msg.id || `msg-${index}`;
            const showAvatar = index === 0 || messages[index - 1]?.sender !== msg.sender;
            
            return (
              <div 
                key={msgId}
                className={`message-group ${isMe(msg) ? 'own' : ''}`}
                onContextMenu={(e) => handleContextMenu(e, msg, msgId)}
              >
                {showAvatar && (
                  <div className="message-avatar">
                    <div className="avatar-placeholder">
                      {isMe(msg) ? 'ME' : 'U'}
                    </div>
                  </div>
                )}
                <div className="message-content">
                  {showAvatar && (
                    <div className="message-header">
                      <span className="sender-name">
                        {isMe(msg) ? 'أنت' : `Player ${msg.sender.slice(0, 4)}`}
                      </span>
                      <span className="message-time">{formatTime(msg.ts)}</span>
                    </div>
                  )}
                  <div className={`message-bubble ${isMe(msg) ? 'own' : ''}`}>
                    {msg.replyOf && (
                      <div className="reply-preview">
                        <i className="fas fa-reply"></i>
                        <span>{msg.replyOf.text.slice(0, 50)}...</span>
                      </div>
                    )}
                    {msg.type === 'text' && (
                      <p>{msg.content}</p>
                    )}
                    {msg.type === 'image' && (
                      <img 
                        src={msg.content} 
                        alt="Shared image" 
                        className="message-image"
                        onClick={() => setImagePreview(msg.content)}
                      />
                    )}
                    {msg.edited && <span className="edited-badge">معدلة</span>}
                    <span className="message-timestamp">{formatTime(msg.ts)}</span>
                  </div>
                  {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                    <div className="reactions-bar">
                      {[...new Set(Object.values(msg.reactions))].map((emoji, i) => (
                        <span key={i} className="reaction">
                          {emoji}
                          <span className="reaction-count">
                            {Object.values(msg.reactions!).filter(e => e === emoji).length}
                          </span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Reply Area */}
        {replyData && (
          <div className="reply-area">
            <i className="fas fa-reply"></i>
            <span>الرد: {replyData.text.slice(0, 30)}...</span>
            <button onClick={() => setReplyData(null)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {/* Image Preview Modal */}
        {imagePreview && (
          <div className="image-preview-modal" onClick={() => setImagePreview(null)}>
            <img src={imagePreview} alt="Preview" />
            <button className="close-preview">
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {/* Input Area */}
        <footer className="chat-input-area">
          <div className="input-wrapper">
            <button 
              className="attach-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <i className="fas fa-plus"></i>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,video/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            
            <div className="text-input-container">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  handleTyping();
                }}
                onKeyDown={handleKeyDown}
                placeholder="أرسل رسالة..."
                rows={1}
              />
            </div>
            
            <button 
              className="emoji-btn"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <i className="fas fa-smile"></i>
            </button>
            
            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </footer>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="emoji-picker-overlay" onClick={() => setShowEmojiPicker(false)}>
            <div className="emoji-picker" onClick={(e) => e.stopPropagation()}>
              <div className="emoji-picker-header">
                <h3>Pixel Art Emojis</h3>
                <button onClick={() => setShowEmojiPicker(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="emoji-grid">
                {(pixelEmojis.emojis as PixelEmoji[]).map((emoji) => (
                  <button
                    key={emoji.id}
                    className="emoji-item"
                    onClick={() => insertEmoji(emoji)}
                    title={emoji.name}
                    dangerouslySetInnerHTML={{ __html: emoji.svg }}
                  />
                ))}
              </div>
              <div className="emoji-picker-footer">
                <span>Powered by Egytronic</span>
              </div>
            </div>
          </div>
        )}

        {/* Context Menu */}
        {showContextMenu && (
          <div 
            ref={contextMenuRef}
            className="context-menu"
            style={{ top: contextMenuPos.y, left: contextMenuPos.x }}
          >
            <button onClick={() => handleAction('reply')}>
              <i className="fas fa-reply"></i>
              <span>رد</span>
            </button>
            <button onClick={() => handleAction('edit')}>
              <i className="fas fa-edit"></i>
              <span>تعديل</span>
            </button>
            <button onClick={() => handleAction('delete')} className="danger">
              <i className="fas fa-trash"></i>
              <span>حذف</span>
            </button>
            <div className="reaction-picker">
              <span onClick={() => handleReaction('❤️')}>❤️</span>
              <span onClick={() => handleReaction('😂')}>😂</span>
              <span onClick={() => handleReaction('😮')}>😮</span>
              <span onClick={() => handleReaction('😢')}>😢</span>
              <span onClick={() => handleReaction('👍')}>👍</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
