import { useState, useEffect } from 'react';
import { channels } from './lib/firebase';
import type { User } from './lib/firebase';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { Menu, X } from 'lucide-react';
import './styles/pixel.css';
import './App.css';

const defaultUser: User = {
  id: `user_${Date.now()}`,
  name: 'زائر جديد',
  avatar: '👤',
  status: 'online',
  customStatus: 'مستعد للدردشة!',
};

function App() {
  const [selectedChannelId, setSelectedChannelId] = useState(channels[0].id);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentUser] = useState<User>(defaultUser);
  const [unreadCounts] = useState<Record<string, number>>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setShowSidebar(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectedChannel = channels.find(c => c.id === selectedChannelId) || channels[0];

  return (
    <div className="app">
      {isMobile && (
        <button className="mobile-overlay-close" onClick={() => setShowSidebar(false)}>
          {showSidebar && <X size={24} />}
        </button>
      )}
      
      {isMobile && showSidebar && <div className="mobile-overlay" onClick={() => setShowSidebar(false)} />}
      
      <Sidebar
        channels={channels}
        selectedChannel={selectedChannelId}
        onSelectChannel={setSelectedChannelId}
        unreadCounts={unreadCounts}
        isMobile={isMobile}
        onClose={() => setShowSidebar(false)}
      />
      
      {isMobile && (
        <button className="mobile-menu-toggle" onClick={() => setShowSidebar(true)}>
          <Menu size={24} />
        </button>
      )}
      
      <ChatArea
        channel={selectedChannel}
        currentUser={currentUser}
        onOpenSidebar={() => setShowSidebar(true)}
      />
    </div>
  );
}

export default App;
