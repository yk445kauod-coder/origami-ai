import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { db, ref, get } from "@/lib/firebase";

export type BaristaPersona = "female" | "male";

interface BaristaContextType {
  persona: BaristaPersona;
  setPersona: (p: BaristaPersona) => void;
  baristaName: string;
  baristaAvatar: string;
  instagram: string;
  cafeInfo: {
    name: string;
    location: string;
    hours: string;
    phone: string;
  };
}

const BaristaContext = createContext<BaristaContextType | null>(null);

export function BaristaProvider({ children }: { children: ReactNode }) {
  const [persona] = useState<BaristaPersona>("female");
  const [baristaName, setBaristaName] = useState("Zura");
  const [baristaAvatar, setBaristaAvatar] = useState("https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=Zura&backgroundColor=c0aede&clothingColor=5d3e6e&skinColor=f5d0c5&hairColor=4a3728&topType=LongHairStraight");
  const [instagram, setInstagram] = useState("@azuracafeegy");
  const [cafeInfo, setCafeInfo] = useState({
    name: "Azura Cafe & Restaurant",
    location: "Tivoli Dome, Alexandria, Egypt",
    hours: "10:00 AM - 12:00 AM",
    phone: "+20 100 000 0000"
  });

  useEffect(() => {
    // Poll AI/barista config every 2 minutes — no persistent live connection needed
    let isCancelled = false;
    const fetchConfig = async () => {
      try {
        const snap = await get(ref(db, "ai-config"));
        if (isCancelled || !snap.exists()) return;
        const cfg = snap.val() as any;
        if (cfg.baristaName) setBaristaName(cfg.baristaName);
        if (cfg.baristaAvatar) setBaristaAvatar(cfg.baristaAvatar);
        if (cfg.instagram) setInstagram(cfg.instagram);
        if (cfg.cafeName) setCafeInfo(prev => ({ ...prev, name: cfg.cafeName }));
        if (cfg.cafeLocation) setCafeInfo(prev => ({ ...prev, location: cfg.cafeLocation }));
        if (cfg.cafeHours) setCafeInfo(prev => ({ ...prev, hours: cfg.cafeHours }));
        if (cfg.cafePhone) setCafeInfo(prev => ({ ...prev, phone: cfg.cafePhone }));
      } catch { /* silent */ }
    };
    fetchConfig();
    const interval = setInterval(fetchConfig, 120000);
    return () => { isCancelled = true; clearInterval(interval); };
  }, []);

  const setPersona = (_p: BaristaPersona) => {
    // Locked to female
  };

  return (
    <BaristaContext.Provider value={{ persona, setPersona, baristaName, baristaAvatar, instagram, cafeInfo }}>
      {children}
    </BaristaContext.Provider>
  );
}

export function useBarista() {
  const ctx = useContext(BaristaContext);
  if (!ctx) throw new Error("useBarista must be inside BaristaProvider");
  return ctx;
}
