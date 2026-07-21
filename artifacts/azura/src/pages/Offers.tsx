import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { db, ref, get } from "@/lib/firebase";
import { Gift, Tag, Percent, Clock, ArrowRight, Sparkles } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  badge?: string;
  badgeAr?: string;
  discount?: number;
  validUntil?: number;
  active: boolean;
  order: number;
  createdAt: number;
}

const DEFAULT_OFFERS: Offer[] = [
  {
    id: "welcome-offer",
    title: "Welcome Offer",
    titleAr: "عرض الترحيب",
    description: "Get 10% off your first order!",
    descriptionAr: "احصل على خصم 10% على طلبك الأول!",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    badge: "NEW",
    badgeAr: "جديد",
    discount: 10,
    active: true,
    order: 1,
    createdAt: Date.now(),
  },
];

export default function Offers() {
  const { lang, isRTL } = useLang();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  const tr = (en: string, ar: string) => (lang === "ar" ? ar : en);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const offersRef = ref(db, "offers");
        const snap = await get(offersRef);
        
        if (snap.exists()) {
          const data = snap.val() as Record<string, Omit<Offer, "id">>;
          const loadedOffers = Object.entries(data)
            .map(([id, o]) => ({ id, ...o }))
            .filter((o) => o.active)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
          setOffers(loadedOffers.length > 0 ? loadedOffers : DEFAULT_OFFERS);
        } else {
          setOffers(DEFAULT_OFFERS);
        }
      } catch {
        setOffers(DEFAULT_OFFERS);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  const isExpired = (validUntil?: number) => {
    if (!validUntil) return false;
    return Date.now() > validUntil;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FDF5E6] to-[#FAF0E6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <p className="text-primary font-semibold">{tr("Loading offers...", "جاري تحميل العروض...")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF5E6] to-[#FAF0E6]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10" />
        <div className="relative px-4 pt-6 pb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4 shadow-lg shadow-amber-500/30">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {tr("Special Offers", "عروض مميزة")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {tr("Discover our exclusive deals and discounts", "اكتشف عروضنا الحصرية والخصومات المميزة")}
          </p>
        </div>
      </div>

      {/* Offers List */}
      <div className="px-4 pb-8 space-y-4">
        {offers.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              {tr("No offers available", "لا توجد عروض حالياً")}
            </h2>
            <p className="text-sm text-gray-500">
              {tr("Check back soon for exciting deals!", "تابعنا للحصول على عروض مميزة!")}
            </p>
          </div>
        ) : (
          offers.map((offer, idx) => (
            <div
              key={offer.id}
              className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Offer Image */}
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={tr(offer.title, offer.titleAr)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Badge */}
                {offer.badge && (
                  <div className="absolute top-3 start-3 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {tr(offer.badge, offer.badgeAr || offer.badge)}
                  </div>
                )}

                {/* Discount Badge */}
                {offer.discount && (
                  <div className="absolute top-3 end-3 w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex flex-col items-center justify-center text-white shadow-lg">
                    <span className="text-lg font-black leading-none">{offer.discount}%</span>
                    <span className="text-[8px] font-bold">{tr("OFF", "خصم")}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 start-0 end-0 p-4 text-white">
                <h3 className="text-lg font-black mb-1 leading-tight">
                  {tr(offer.title, offer.titleAr)}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 mb-2">
                  {tr(offer.description, offer.descriptionAr)}
                </p>
                
                <div className="flex items-center justify-between">
                  {offer.validUntil && !isExpired(offer.validUntil) && (
                    <div className="flex items-center gap-1.5 text-[10px] text-white/70">
                      <Clock className="w-3 h-3" />
                      <span>{tr("Valid until", "صالح حتى")} {formatDate(offer.validUntil)}</span>
                    </div>
                  )}
                  {isExpired(offer.validUntil) && (
                    <div className="flex items-center gap-1.5 text-[10px] text-red-300">
                      <Clock className="w-3 h-3" />
                      <span>{tr("Expired", "انتهى")}</span>
                    </div>
                  )}
                  
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold hover:bg-white/30 transition-colors">
                    <span>{tr("Learn More", "اعرف المزيد")}</span>
                    <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </div>
  );
}
