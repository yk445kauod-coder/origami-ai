import type { Channel } from '../lib/firebase';
import { Hash, Volume2, Search, Plus, Bell, Settings } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  channels: Channel[];
  selectedChannel: string;
  onSelectChannel: (channelId: string) => void;
  unreadCounts: Record<string, number>;
  isMobile?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  channels,
  selectedChannel,
  onSelectChannel,
  unreadCounts,
  isMobile,
  onClose,
}) => {
  return (
    <div className={`sidebar ${isMobile ? 'mobile open' : ''}`}>
      <div className="sidebar-header pixel-box">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text pixel-text">Egytronic</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" title="الإشعارات">
            <Bell size={18} />
          </button>
          <button className="icon-btn" title="الإعدادات">
            <Settings size={18} />
          </button>
        </div>
      </div>

      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input 
          type="text" 
          placeholder="ابحث..." 
          className="search-input"
        />
      </div>

      <div className="channels-section">
        <div className="section-header">
          <span className="pixel-text">القنوات</span>
          <button className="add-btn" title="إضافة قناة">
            <Plus size={14} />
          </button>
        </div>

        <div className="channels-list">
          {channels.map((channel) => (
            <button
              key={channel.id}
              className={`channel-item ${selectedChannel === channel.id ? 'active' : ''}`}
              onClick={() => {
                onSelectChannel(channel.id);
                if (isMobile && onClose) onClose();
              }}
            >
              <Hash size={18} className="channel-icon" />
              <span className="channel-name">{channel.name}</span>
              {unreadCounts[channel.id] > 0 && (
                <span className="unread-badge">{unreadCounts[channel.id]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="voice-section">
        <div className="voice-header">
          <Volume2 size={16} />
          <span>صوت متصل</span>
        </div>
        <div className="voice-users">
          <div className="voice-user">
            <div className="avatar-small online">🧔</div>
            <span>أحمد</span>
          </div>
          <div className="voice-user">
            <div className="avatar-small online">👩</div>
            <span>سارة</span>
          </div>
        </div>
      </div>

      <div className="user-panel pixel-box">
        <div className="avatar-small online">👤</div>
        <div className="user-info">
          <span className="username pixel-text">زائر</span>
          <span className="user-status">متصل</span>
        </div>
        <div className="user-actions">
          <button className="icon-btn" title="الميكروفون">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
          <button className="icon-btn" title="سماعات">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z"/>
              <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
