# Cloudflare Pages Deployment Guide

## Quick Deploy

### Option 1: Direct Upload (Recommended)
1. Go to Cloudflare Dashboard
2. Navigate to Workers & Pages → Create application → Pages → Direct Upload
3. Upload the `dist` folder

### Option 2: Git Integration
1. Connect your GitHub repository
2. Configure build settings

### Option 3: Wrangler CLI
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy dist --project-name=egytronic-chat
```

## Build Settings

```
Build command: npm install && npm run build
Build output directory: dist
Root directory: /
```

## Commands

```bash
# Build
npm run build

# Deploy
wrangler pages deploy dist --project-name=egytronic-chat
```

## After Deployment
- App URL: https://3000445.pages.dev
- Company: Egytronic
