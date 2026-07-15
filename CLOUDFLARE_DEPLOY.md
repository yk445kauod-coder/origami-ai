# Cloudflare Pages Deployment Guide

## Quick Deploy

### Option 1: Direct Upload
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Workers & Pages
3. Create an application → Pages → Direct Upload
4. Upload the `dist` folder from this project

### Option 2: Git Integration
1. Connect your GitHub repository
2. Set the following:
   - **Production branch**: `main` (or your deployment branch)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

### Option 3: Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy dist --project-name=egytronic-chat
```

## API Deployment (via cURL)

```bash
# Get your Account ID from Cloudflare Dashboard
ACCOUNT_ID="708d1cc2fd5a22a9e495dfe415c9f921"

# Upload files
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/assets/upload" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -F "file=@dist/index.html" \
  -F "manifest=@dist/_routes.json"
```

## Environment Variables

For Cloudflare Pages, you may need to set:
- `NODE_VERSION`: 18 or higher
- `NPM_VERSION`: 9 or higher

## Deployment URL

After deployment, your app will be available at:
- `https://3000445.pages.dev` (if using Cloudflare Pages)
- Or your custom domain if configured

## Troubleshooting

1. **Build fails**: Ensure Node.js version is 18+
2. **Assets not loading**: Check that base URL is set to `./` in `vite.config.ts`
3. **Firebase errors**: Verify Firebase configuration is correct

## Firebase Realtime Database

The app uses the same Firebase configuration as the reference app. No additional setup required!

Database URL: `https://my-result-db-default-rtdb.firebaseio.com`
Chat path: `egytronic_chat_v2`
