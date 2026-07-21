import { type ReactNode, useEffect, useState, memo, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { db, ref, onValue, off } from "@/lib/firebase";
import { X, Bell } from "lucide-react";
import { 
  HomeIcon, 
  SparklesIcon, 
  FilmIcon, 
  ChatBubbleLeftRightIcon, 
  UserIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import { 
  HomeIcon as HomeIconSolid, 
  SparklesIcon as SparklesIconSolid, 
  FilmIcon as FilmIconSolid, 
  ChatBubbleLeftRightIcon as ChatIconSolid, 
  UserIcon as UserIconSolid,
  GiftIcon as GiftIconSolid,
} from "@heroicons/react/24/solid";

const ALL_NAV = [
  { path: "/menu",    key: "menu",    label: "القائمة",  labelEn: "Menu",    icon: HomeIcon,    iconActive: HomeIconSolid,    alwaysOn: true },
  { path: "/offers",  key: "offers",  label: "العروض",   labelEn: "Offers",  icon: GiftIcon,    iconActive: GiftIconSolid,    alwaysOn: false },
  { path: "/barista", key: "barista", label: "المساعد",  labelEn: "AI",       icon: SparklesIcon, iconActive: SparklesIconSolid, alwaysOn: false },
  { path: "/reels",   key: "reels",   label: "الفيديو",  labelEn: "Reels",    icon: FilmIcon,    iconActive: FilmIconSolid,     alwaysOn: false },
  { path: "/support", key: "support", label: "الدعم",    labelEn: "Support",  icon: ChatBubbleLeftRightIcon, iconActive: ChatIconSolid, alwaysOn: false },
  { path: "/profile", key: "profile", label: "حسابي",    labelEn: "Profile",  icon: UserIcon,    iconActive: UserIconSolid,     alwaysOn: true },
];

interface Broadcast {
  id: string; title: string; titleAr: string;
  message: string; messageAr: string;
  type: "info" | "promo" | "alert"; emoji: string; createdAt: number;
}

interface FeatureFlags {
  baristaEnabled: boolean;
  reelsEnabled: boolean;
  supportEnabled: boolean;
}

const BROADCAST_TYPE_STYLE: Record<string, string> = {
  info:  "bg-primary/5 border-primary/20 text-primary",
  promo: "bg-primary/5 border-primary/20 text-primary",
  alert: "bg-destructive/10 border-destructive/20 text-destructive",
};

const DEFAULT_BROADCAST: Broadcast = {
  id: "welcome-new",
  title: "✨ Welcome to NEW Azura App!",
  titleAr: "✨ مرحباً بكم في تطبيق أزورا الجديد!",
  message: "🎬 Check out our NEW Video Reels! Swipe through delicious dishes 🍽️",
  messageAr: "🎬 شاهد Reels الجديدة! اسحب لرؤية الأطباق اللذيذة 🍽️",
  type: "promo",
  emoji: "🎉",
  createdAt: Date.now(),
};

export default function Layout({ children }: { children: ReactNode }) {
  const { lang, isRTL } = useLang();
  const { profile } = useAuth();
  const [location] = useLocation();
  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [allBroadcasts, setAllBroadcasts] = useState<Broadcast[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({
    baristaEnabled: true,
    reelsEnabled: true,
    supportEnabled: true,
  });

  const isActive = (p: string) => location === p || (p === "/menu" && (location === "/" || location === ""));

  const getReadIds = (): string[] => JSON.parse(localStorage.getItem("azura-read-broadcasts") || "[]");
  const saveReadIds = (ids: string[]) => localStorage.setItem("azura-read-broadcasts", JSON.stringify(ids));

  // Listen for feature flags
  useEffect(() => {
    const ffRef = ref(db, "feature-flags");
    onValue(ffRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val() as Partial<FeatureFlags>;
        setFeatureFlags({
          baristaEnabled: data.baristaEnabled !== false,
          reelsEnabled: data.reelsEnabled !== false,
          supportEnabled: data.supportEnabled !== false,
        });
      }
    });
    return () => off(ref(db, "feature-flags"));
  }, []);

  // Listen for broadcasts
  useEffect(() => {
    const bRef = ref(db, "broadcast");
    onValue(bRef, (snap) => {
      const readIds = getReadIds();
      if (!snap.exists()) {
        setAllBroadcasts([DEFAULT_BROADCAST]);
        if (!readIds.includes("welcome-new")) setBroadcast(DEFAULT_BROADCAST);
        return;
      }
      const data = snap.val() as Record<string, Omit<Broadcast, "id">>;
      const all = Object.entries(data)
        .map(([id, v]) => ({ id, ...v }))
        .filter((b) => b.title && b.title.trim() !== "" && b.title !== "<title>" && b.message && b.message.trim() !== "" && b.message !== "<message>")
        .sort((a, b) => b.createdAt - a.createdAt);
      setAllBroadcasts(all.length > 0 ? all : [DEFAULT_BROADCAST]);
      const latest = all.filter((b) => !readIds.includes(b.id))[0];
      if (latest) setBroadcast(latest);
    });
    return () => off(ref(db, "broadcast"));
  }, []);

  const unreadCount = allBroadcasts.filter(b => !getReadIds().includes(b.id)).length;

  const dismissBroadcast = () => {
    if (!broadcast) return;
    const readIds = getReadIds();
    saveReadIds([...readIds, broadcast.id]);
    setBroadcast(null);
  };

  const markAllRead = () => {
    saveReadIds(allBroadcasts.map(b => b.id));
    setBroadcast(null);
    setNotifOpen(false);
  };

  // Filter nav based on feature flags - memoized
  const NAV = useMemo(() => 
    ALL_NAV.filter(item => {
      if (item.alwaysOn) return true;
      if (item.key === "barista") return featureFlags.baristaEnabled;
      if (item.key === "reels") return featureFlags.reelsEnabled;
      if (item.key === "support") return featureFlags.supportEnabled;
      return true;
    }), [featureFlags]);

  // Memoized broadcast style
  const broadcastStyle = useMemo(() => 
    BROADCAST_TYPE_STYLE[broadcast?.type || "info"] || BROADCAST_TYPE_STYLE.info,
    [broadcast?.type]);

  return (
    <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-2.5"
        style={{ background: "hsl(var(--card))", boxShadow: "var(--shadow-sm)", borderBottom: "1px solid rgba(93,62,35,0.08)" }}>
        <div className="flex items-center gap-3">
          <Link href="/menu">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <img src="/logo.jpg" alt="Azura" className="w-9 h-9 rounded-full object-cover" style={{ boxShadow: "var(--shadow-sm)" }} loading="lazy" />
              <div>
                <h1 className="text-sm font-bold text-primary leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  Azura Cafe
                </h1>
                <p className="text-[10px] text-muted-foreground leading-none">
                  Tivoli Dome, Alexandria
                </p>
              </div>
            </div>
          </Link>
          
          {/* Social Media Links */}
          <div className="flex items-center gap-1.5 ml-2 border-l border-border/30 pl-3">
            <a
              href="https://instagram.com/azuracafeegy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center text-white text-[10px] font-bold hover:scale-110 transition-transform shadow-sm"
              title="Instagram @azuracafeegy"
              aria-label="Follow us on Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@azuracafee"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
              title="TikTok @azuracafee"
              aria-label="Follow us on TikTok"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a
              href="https://web.facebook.com/p/Azura-cafe-restaurant-61577762257966"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
              title="Facebook Azura Cafe"
              aria-label="Follow us on Facebook"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {profile?.tableNumber && (
            <span className="text-[11px] font-bold text-primary px-2.5 py-1 rounded-full" style={{ background: "hsl(var(--muted))", boxShadow: "var(--shadow-xs)" }}>
              {lang === "ar" ? `طاولة ${profile.tableNumber}` : `Table ${profile.tableNumber}`}
            </span>
          )}
          <button
            onClick={() => setNotifOpen(true)}
            className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-muted active:scale-95"
            aria-label="Notifications"
          >
            <Bell size={18} className="text-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -end-0.5 min-w-[16px] h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-extrabold flex items-center justify-center px-1 shadow-sm">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Notification Drawer */}
      {notifOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end" onClick={() => setNotifOpen(false)}>
          <div
            className="bg-background rounded-t-3xl px-4 pt-4 pb-8 space-y-3 max-h-[72vh] overflow-y-auto shadow-2xl"
            style={{ borderTop: "1px solid hsl(var(--border))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-muted mx-auto mb-2" />
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-foreground text-base">
                {lang === "ar" ? "الإشعارات" : "Notifications"}
              </h2>
              <button onClick={markAllRead} className="text-xs font-semibold text-primary py-1 px-2 rounded-lg hover:bg-primary/10 transition-all">
                {lang === "ar" ? "مسح الكل" : "Mark all read"}
              </button>
            </div>
            {allBroadcasts.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-8">
                {lang === "ar" ? "لا توجد إشعارات" : "No notifications yet"}
              </p>
            ) : (
              allBroadcasts.map((b) => {
                const isUnread = !getReadIds().includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`rounded-2xl px-3 py-3 border flex items-start gap-3 transition-all ${BROADCAST_TYPE_STYLE[b.type] || BROADCAST_TYPE_STYLE.info} ${isUnread ? "ring-1 ring-primary/30" : "opacity-60"}`}
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{b.emoji || "✨"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-sm leading-tight">
                          {lang === "ar" ? (b.titleAr || b.title) : b.title}
                        </p>
                        {isUnread && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                      </div>
                      <p className="text-xs opacity-80 leading-snug mt-0.5">
                        {lang === "ar" ? (b.messageAr || b.message) : b.message}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Broadcast Banner */}
      {broadcast && (
        <div className={`mx-3 mt-2 rounded-xl px-4 py-3 border text-sm overflow-hidden relative ${BROADCAST_TYPE_STYLE[broadcast.type] || BROADCAST_TYPE_STYLE.info}`}>
          <div className="flex items-center gap-3">
            <span className="text-xl flex-shrink-0">{broadcast.emoji || "✨"}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm leading-tight">
                {lang === "ar" ? (broadcast.titleAr || broadcast.title) : broadcast.title}
              </p>
              <p className="text-xs opacity-80 leading-snug mt-0.5">
                {lang === "ar" ? (broadcast.messageAr || broadcast.message) : broadcast.message}
              </p>
            </div>
            <button 
              onClick={dismissBroadcast} 
              className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-black/5 flex items-center justify-center transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="page-enter">{children}</div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 px-1 pb-safe">
        <div 
          className="mx-3 mb-2 rounded-2xl overflow-hidden shadow-lg bg-background border"
        >
          <div className="flex items-stretch justify-around py-2 px-1">
            {NAV.map((item) => {
              const active = isActive(item.path);
              const Icon = active ? item.iconActive : item.icon;
              const displayLabel = lang === "ar" ? item.label : item.labelEn;
              
              return (
                <Link key={item.path} href={item.path} className="flex-1">
                  <button 
                    className="relative flex flex-col items-center justify-center gap-1 px-1 py-1.5 w-full"
                  >
                    {active && (
                      <div 
                        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full"
                        style={{ background: "hsl(22,55%,28%)" }}
                      />
                    )}
                    <div className="relative">
                      <div 
                        className={`p-1.5 rounded-xl ${active ? "bg-primary/20" : ""}`}
                      >
                        <Icon 
                          className={`w-5 h-5 ${active ? "text-primary" : "text-muted-foreground"}`} 
                        />
                      </div>
                    </div>
                    <span 
                      className={`text-[10px] font-semibold leading-none ${active ? "text-primary font-bold" : "text-muted-foreground"}`}
                    >
                      {displayLabel}
                    </span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
