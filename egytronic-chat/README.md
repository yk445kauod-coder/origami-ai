# Egytronic Chat - تطبيق دردشة بيكسل آرت 🎮

<div align="center">
  <img src="https://img.shields.io/badge/Egytronic-Chat-9b59b6?style=for-the-badge" alt="Egytronic Chat">
  <img src="https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge" alt="React">
  <img src="https://img.shields.io/badge/Firebase-Realtime%20DB-FFA611?style=for-the-badge" alt="Firebase">
  <img src="https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=for-the-badge" alt="TypeScript">
</div>

## 🎯 نظرة عامة

**Egytronic Chat** هو تطبيق دردشة عصرية بتصميم Pixel Art مستوحى من Discord، مصمم ومطور بواسطة شركة **Egytronic**. يتميز بتصميم فريد وجذاب مع تأثيرات بيكسل آرت klassische.

## ✨ المميزات

- 🎨 **تصميم Pixel Art** - واجهة مستخدم فريدة بأسلوب الألعاب الكلاسيكية
- 💬 **دردشة فورية** - محادثات حقيقية باستخدام Firebase Realtime Database
- 📱 **متجاوب بالكامل** - يعمل على جميع الأجهزة (سطح المكتب، التابلت، الموبايل)
- 😀 **حزمة Emoji مخصصة** - أكثر من 70 إيموجي في حزمة بيكسل آرت
- ⚡ **سريع وبسيط** - مصمم للأداء العالي

## 🚀 التشغيل المحلي

```bash
# تثبيت التبعيات
npm install

# تشغيل في وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة النسخة الإنتاجية
npm run preview
```

## 📁 هيكل المشروع

```
egytronic-chat/
├── public/
│   └── favicon.svg          # أيقونة الموقع
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx      # الشريط الجانبي
│   │   ├── ChatArea.tsx     # منطقة الدردشة
│   │   └── EmojiPicker.tsx  # منتقي الإيموجي
│   ├── data/
│   │   └── pixelEmojis.json # حزمة الإيموجي
│   ├── lib/
│   │   └── firebase.ts      # إعدادات Firebase
│   ├── styles/
│   │   └── pixel.css        # أنماط البيكسل
│   ├── App.tsx              # المكون الرئيسي
│   └── main.tsx             # نقطة الدخول
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔧 الإعداد

### Firebase Configuration

التطبيق يستخدم Firebase Realtime Database. لتكوين مشروعك الخاص:

1. أنشئ مشروع جديد في [Firebase Console](https://console.firebase.google.com/)
2. فعّل **Realtime Database**
3. انسخ إعدادات المشروع في `src/lib/firebase.ts`

### قواعد Firebase (RTDB)

```json
{
  "rules": {
    "channels": {
      "$channelId": {
        "messages": {
          ".read": true,
          ".write": true
        },
        "typing": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

## 🌐 النشر

### GitHub Pages

```bash
npm run deploy
```

### Cloudflare Pages

1. اربط مستودع GitHub مع Cloudflare Pages
2. اضبط أمر البناء: `npm run build`
3. دليل الإخراج: `dist`

## 👥 المساهمة

المساهمات مرحب بها! يرجى قراءة [إرشادات المساهمة](CONTRIBUTING.md) قبل إرسال pull request.

## 📄 الرخصة

MIT License - راجع ملف [LICENSE](LICENSE) للتفاصيل.

---

<div align="center">
  <p>صُنع بـ ❤️ بواسطة <a href="https://egytronic.pages.dev">Egytronic</a></p>
  <p>egytronic.pages.dev | 3000445.pages.dev</p>
</div>
