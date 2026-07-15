# ☁️ Cloudflare Pages - دليل النشر الكامل

## 🚀 الطريقة الأولى: رفع مباشر (أسهل)

### الخطوات:
1. اذهب إلى **Cloudflare Dashboard**: https://dash.cloudflare.com/
2. من القائمة الجانبية اختر **Workers & Pages**
3. اضغط **Create application**
4. اختر **Pages**
5. اختر **Upload assets directly**
6. ارفع مجلد `dist` كامل

---

## 🔗 الطريقة الثانية: ربط Git (موصى به للإنتاج)

### الخطوة 1: إنشاء المشروع
1. اذهب إلى **Cloudflare Dashboard**: https://dash.cloudflare.com/
2. من القائمة الجانبية اختر **Workers & Pages**
3. اضغط **Create application**
4. اختر **Pages**
5. اختر **Connect to Git**

### الخطوة 2: ربط GitHub
```
GitHub account: yk445kauod-coder
Repository: origami-ai
Production branch: main
```

### الخطوة 3: إعدادات البناء (Build Configuration)

اضغط على **Build settings** واملأ:

```
┌─────────────────────────────────────────────────────┐
│  Build settings                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Framework preset:        None (Optional) ▼          │
│                                                     │
│  Build command:          npm install && npm run build│
│                                                     │
│  Build output directory: dist                        │
│                                                     │
│  Root directory:           / (Leave as /)            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### الخطوة 4: متغيرات البيئة (Environment Variables)

اضغط **Environment variables** وأضف:

```
┌─────────────────────────────────────────────────────┐
│  Name               │  Value                        │
├─────────────────────────────────────────────────────┤
│  NODE_VERSION      │  18                          │
│  NPM_VERSION       │  9                           │
│  CI                │  true                         │
└─────────────────────────────────────────────────────┘
```

> 💡 اضغط **Add variable** لكل متغير

### الخطوة 5: إعدادات Pages Functions (اختياري)

```
⚡ Enable Pages Functions: OFF (هذا تطبيق Static)
```

### الخطوة 6: النقر النهائي

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│           [ Save and Deploy ]  ← اضغط هنا          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📋 ملخص الإعدادات الكاملة

| الإعداد | القيمة |
|---------|--------|
| **Project Name** | `egytronic-chat` |
| **Production Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Build Output Directory** | `dist` |
| **Root Directory** | `/` |
| **NODE_VERSION** | `18` |
| **NPM_VERSION** | `9` |

---

## ⏱️ بعد النشر

### الرابط:
```
https://3000445.pages.dev
```

### الحالات:
| الحالة | المعنى |
|--------|--------|
| ✅ Success | تم النشر بنجاح |
| ⏳ Building | جاري البناء |
| ❌ Failed | فشل - راجع Logs |

### عرض Logs:
1. اضغط على **Deployment** في المشروع
2. اضغط على **View logs** لمشاهدة تفاصيل البناء

---

## 🔧 إذا فشل البناء

### مشكلة: Build failed
```
✅ الحل: تأكد من Build command:
npm install && npm run build
```

### مشكلة: Assets not loading
```
✅ الحل: تأكد من Output directory:
dist
```

### مشكلة: 404 errors
```
✅ الحل: تأكد أن base في vite.config.ts:
base: './'
```

---

## 🌐 ربط دومين مخصص (اختياري)

1. في المشروع اذهب إلى **Custom domains**
2. اضغط **Set up a custom domain**
3. أدخل: `3000445.pages.dev`
4. اضغط **Check DNS configuration**
5. انتظر حتى يتم التحقق (عادة 1-2 دقيقة)

---

## 📁 هيكل الملفات للنشر

```
egytronic-chat/
│
├── dist/                      ← هذا المجلد ترفعه
│   ├── index.html
│   ├── favicon.svg
│   └── assets/
│       ├── index-xxxxx.css
│       └── index-xxxxx.js
│
├── src/
│   ├── App.tsx
│   ├── App.css
│   └── ...
│
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🔄 تحديث التطبيق

### الطريقة 1: Git (تلقائي)
```
，只需要 Push على Git - النشر تلقائي ✅
```

### الطريقة 2: Manual
```
1. Build محلي: npm run build
2. اذهب إلى Cloudflare Dashboard
3. Deployments → latest → Retry deployment
```

---

## 📞 معلومات المشروع

| العنصر | القيمة |
|--------|--------|
| **App Name** | Egytronic Chat |
| **Company** | Egytronic |
| **App URL** | https://3000445.pages.dev |
| **Website** | https://egytronic.pages.dev |
| **GitHub** | github.com/yk445kauod-coder/origami-ai |

---

**Egytronic** © 2025
