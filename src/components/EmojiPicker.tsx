import React, { useState, useMemo } from 'react';
import pixelEmojis from '../data/pixelEmojis.json';
import './EmojiPicker.css';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const categoryIcons: Record<string, string> = {
  smileys: '😀',
  gestures: '👍',
  hearts: '❤️',
  animals: '🐱',
  food: '🍕',
  activities: '🎮',
  symbols: '⭐',
  egypt: '🗿',
  reactions: '😂',
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('smileys');

  const filteredEmojis = useMemo(() => {
    if (!searchQuery) {
      return pixelEmojis.emojis[activeCategory as keyof typeof pixelEmojis.emojis]?.emojis || [];
    }
    
    const query = searchQuery.toLowerCase();
    const allEmojis: any[] = [];
    
    Object.values(pixelEmojis.emojis).forEach((category: any) => {
      category.emojis.forEach((emoji: any) => {
        if (
          emoji.name.toLowerCase().includes(query) ||
          emoji.tags.some((tag: string) => tag.toLowerCase().includes(query))
        ) {
          allEmojis.push(emoji);
        }
      });
    });
    
    return allEmojis;
  }, [searchQuery, activeCategory]);

  return (
    <div className="emoji-picker">
      <div className="emoji-search">
        <input
          type="text"
          className="emoji-search-input"
          placeholder="ابحث عن إيموجي..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="emoji-categories">
        {Object.entries(categoryIcons).map(([key, icon]) => (
          <button
            key={key}
            className={`emoji-category-btn ${activeCategory === key ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(key);
              setSearchQuery('');
            }}
            title={pixelEmojis.emojis[key as keyof typeof pixelEmojis.emojis]?.name || key}
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="emoji-grid-container scrollbar-pixel">
        {searchQuery ? (
          <>
            <div className="emoji-category-title">نتائج البحث</div>
            <div className="emoji-grid">
              {filteredEmojis.map((emoji: any) => (
                <button
                  key={emoji.id}
                  className="emoji-item"
                  onClick={() => onSelect(emoji.emoji)}
                  title={emoji.name}
                >
                  {emoji.emoji}
                </button>
              ))}
            </div>
            {filteredEmojis.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                لا توجد نتائج
              </div>
            )}
          </>
        ) : (
          <>
            <div className="emoji-category-title">
              {pixelEmojis.emojis[activeCategory as keyof typeof pixelEmojis.emojis]?.name || activeCategory}
            </div>
            <div className="emoji-grid">
              {filteredEmojis.map((emoji: any) => (
                <button
                  key={emoji.id}
                  className="emoji-item"
                  onClick={() => onSelect(emoji.emoji)}
                  title={emoji.name}
                >
                  {emoji.emoji}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="emoji-footer">
        <span className="emoji-pack-info">Egytronic Pixel Pack v{pixelEmojis.version}</span>
        <button className="emoji-close-btn" onClick={onClose}>إغلاق</button>
      </div>
    </div>
  );
};
