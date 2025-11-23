# 🚀 Deployment Guide

Deploy your Figma Template Generator to production.

---

## Option 1: Vercel (Recommended - Free)

### Why Vercel?
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Git integration
- ✅ Instant deployments

### Steps:

1. **Install Vercel CLI**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login to Vercel**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   cd figma-template-generator
   vercel --prod
   \`\`\`

4. **Configure (Optional)**
   - No environment variables needed (users enter API key in UI)
   - If you want server-side API key, add in Vercel dashboard:
     - Go to Settings → Environment Variables
     - Add: \`ANTHROPIC_API_KEY=sk-ant-...\`

5. **Done!**
   - Your app is live at: \`your-app.vercel.app\`
   - Share the URL with users

### Automatic Deployments

Connect GitHub repository:
1. Go to vercel.com
2. Import your GitHub repository
3. Every push to main → auto-deploys

---

## Option 2: Netlify (Free Alternative)

### Steps:

1. **Build the app**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Install Netlify CLI**
   \`\`\`bash
   npm install -g netlify-cli
   \`\`\`

3. **Deploy**
   \`\`\`bash
   netlify deploy --prod
   \`\`\`

4. **Configure**
   - Build command: \`npm run build\`
   - Publish directory: \`.next\`

---

## Option 3: DigitalOcean App Platform

### Steps:

1. Push code to GitHub
2. Go to DigitalOcean App Platform
3. Create new app from GitHub repo
4. Configure:
   - Build Command: \`npm run build\`
   - Run Command: \`npm start\`
5. Deploy

**Cost:** ~$5/month

---

## Option 4: AWS Amplify

### Steps:

1. Push to GitHub
2. Go to AWS Amplify Console
3. Connect repository
4. Configure build settings:
   \`\`\`yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   \`\`\`

---

## Option 5: Self-Hosted (VPS)

### Requirements:
- Ubuntu 22.04+
- Node.js 18+
- Nginx
- PM2

### Steps:

1. **SSH into server**
   \`\`\`bash
   ssh user@your-server-ip
   \`\`\`

2. **Install Node.js**
   \`\`\`bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   \`\`\`

3. **Clone repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd figma-template-generator
   npm install
   \`\`\`

4. **Build**
   \`\`\`bash
   npm run build
   \`\`\`

5. **Install PM2**
   \`\`\`bash
   sudo npm install -g pm2
   \`\`\`

6. **Start with PM2**
   \`\`\`bash
   pm2 start npm --name "figma-generator" -- start
   pm2 save
   pm2 startup
   \`\`\`

7. **Setup Nginx**
   \`\`\`nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

8. **Install SSL with Let's Encrypt**
   \`\`\`bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   \`\`\`

---

## Environment Variables

### Required (if using server-side API key):
\`\`\`
ANTHROPIC_API_KEY=sk-ant-your-key-here
\`\`\`

### Optional:
\`\`\`
NODE_ENV=production
PORT=3000
\`\`\`

---

## Post-Deployment Checklist

- [ ] Test API key input
- [ ] Upload example Figma code
- [ ] Verify template generation
- [ ] Check PDF export works
- [ ] Test on mobile devices
- [ ] Verify all features work
- [ ] Check console for errors
- [ ] Test with different browsers
- [ ] Monitor API costs
- [ ] Set up error tracking (optional)

---

## Monitoring & Analytics

### Vercel Analytics (Free)
\`\`\`bash
npm install @vercel/analytics
\`\`\`

Add to \`app/layout.tsx\`:
\`\`\`tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\`

### Error Tracking (Sentry)

1. Sign up at sentry.io
2. Install:
   \`\`\`bash
   npm install @sentry/nextjs
   \`\`\`
3. Configure:
   \`\`\`bash
   npx @sentry/wizard@latest -i nextjs
   \`\`\`

---

## Performance Optimization

### 1. Enable Caching

Add to \`next.config.js\`:
\`\`\`js
module.exports = {
  // ... existing config
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, immutable',
        },
      ],
    },
  ],
}
\`\`\`

### 2. Optimize Images

Use Next.js Image component for any images added later.

### 3. Enable Compression

Vercel does this automatically. For self-hosted:

Add to Nginx:
\`\`\`nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
\`\`\`

---

## Security Considerations

### 1. API Key Protection

- ✅ Never commit API keys to git
- ✅ Use environment variables
- ✅ Let users provide their own keys

### 2. Rate Limiting

For production, add rate limiting:

\`\`\`bash
npm install express-rate-limit
\`\`\`

### 3. CORS (if needed)

Add to API route:
\`\`\`ts
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
    },
  });
}
\`\`\`

---

## Cost Estimation

### Vercel (Recommended)
- **Free tier**: Unlimited deployments
- **Pro**: $20/month (if needed)

### Anthropic API
- **Per generation**: $0.15-0.25
- **Monthly (100 templates)**: ~$20

### Total for 100 templates/month:
- **Hosting**: Free (Vercel)
- **API**: ~$20
- **Total**: ~$20/month

---

## Scaling Considerations

### For High Traffic:

1. **Cache generated templates**
   - Use Redis or similar
   - Cache API responses

2. **Queue system**
   - Use Bull/BullMQ for job queuing
   - Process templates asynchronously

3. **Load balancing**
   - Multiple Next.js instances
   - Use Vercel Pro for automatic scaling

4. **Database (optional)**
   - Store generated templates
   - User accounts & template library

---

## Troubleshooting Deployment

### Build Fails

Check:
- Node.js version (18+)
- All dependencies installed
- TypeScript errors resolved

### API Not Working

Check:
- Environment variables set correctly
- API key is valid
- Network/firewall settings

### Slow Performance

- Enable caching
- Use CDN for static assets
- Optimize bundle size

---

## Support & Maintenance

### Regular Updates

\`\`\`bash
# Update dependencies monthly
npm update
npm audit fix

# Test after updates
npm run build
npm run dev
\`\`\`

### Monitoring

- Check Vercel analytics
- Monitor API costs
- Review error logs
- User feedback

---

## Next Steps After Deployment

1. **Share with users**
2. **Gather feedback**
3. **Iterate and improve**
4. **Add new features**
5. **Scale as needed**

---

**Questions?** Open an issue on GitHub.
