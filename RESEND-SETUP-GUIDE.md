# Professional Email Setup with Resend

## ✅ What Changed

Your QuickMart app now uses **Resend** - a professional transactional email service used by modern apps. This will deliver OTP emails reliably to users' inboxes.

---

## 🚀 Setup Steps (5 minutes)

### Step 1: Create Resend Account

1. Go to: **https://resend.com/signup**
2. Sign up with your email
3. Verify your email address
4. You'll be redirected to the dashboard

### Step 2: Get API Key

1. In Resend dashboard, click **"API Keys"** in the left sidebar
2. Click **"Create API Key"** button
3. Name: `QuickMart Production`
4. Permission: **Full Access** (default)
5. Click **"Add"**
6. **Copy the API key** (starts with `re_...`)
   - ⚠️ Save it now! You won't see it again

### Step 3: Add to Render

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click your **quickmart-backend** service
3. Click **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add this variable:
   ```
   Key: RESEND_API_KEY
   Value: re_your_api_key_here
   ```
6. Click **"Save Changes"**
7. Render will auto-redeploy (wait 2-3 minutes)

### Step 4: Remove Old Gmail Variables (Optional)

You can now remove these (they're not needed anymore):
- `EMAIL_USER`
- `EMAIL_PASS`

---

## 🧪 Testing

### Test OTP Email:

1. Go to your QuickMart registration page
2. Enter email and phone number
3. Click "Send OTP"
4. **Check your email inbox** (should arrive in 2-5 seconds)
5. Enter the OTP to complete registration

### Check Render Logs:

```
✅ Resend email service initialized
📧 Sending OTP to user@example.com...
✅ OTP email sent successfully to user@example.com (ID: xxx)
```

---

## 📧 Email Features

### What Users Will Receive:

- **Professional email** with QuickMart branding
- **Large, clear OTP** code (easy to read)
- **5-minute expiration** warning
- **Security tips** (don't share OTP)
- **Responsive design** (works on mobile)

### Email Preview:

```
From: QuickMart <onboarding@resend.dev>
Subject: Your QuickMart Verification Code

🛒 QuickMart
Fresh Groceries Delivered in Minutes

Verification Code

Hi User,

Thank you for registering with QuickMart! Please use the 
verification code below to complete your registration:

┌─────────────────┐
│    123456       │  ← Big, clear OTP
└─────────────────┘

⚠️ Important:
• This code will expire in 5 minutes
• Do not share this code with anyone
• If you didn't request this code, please ignore this email
```

---

## 🎯 Why Resend?

| Feature | Gmail SMTP | Resend |
|---------|-----------|--------|
| **Reliability** | ❌ Blocked on Render | ✅ Always works |
| **Speed** | ❌ Slow (if works) | ✅ 2-5 seconds |
| **Deliverability** | ⚠️ May go to spam | ✅ Inbox delivery |
| **Free Tier** | ❌ Limited | ✅ 3,000 emails/month |
| **Professional** | ❌ Personal email | ✅ Branded emails |
| **Setup** | ❌ Complex | ✅ 5 minutes |

---

## 📊 Resend Free Tier

- **3,000 emails per month** (free forever)
- **100 emails per day**
- Perfect for startups and testing
- No credit card required

### Usage Estimate:
- 100 registrations/day = 100 OTP emails
- Well within free tier limits

---

## 🔧 Environment Variables

### Required (Add to Render):
```env
RESEND_API_KEY=re_your_api_key_here
```

### Optional (Custom Domain):
```env
RESEND_FROM_EMAIL=QuickMart <noreply@yourdomain.com>
```
*Note: Custom domain requires domain verification in Resend*

### Complete Render Environment:
```env
# Database
MONGODB_URI=mongodb+srv://quickmart:quick%40mart@cluster0.ospmsor.mongodb.net/quickmart?retryWrites=true&w=majority&appName=Cluster0

# Authentication
JWT_SECRET=quickmart_jwt_secret_key_2024_production_ready

# Server
PORT=10000
NODE_ENV=production

# Email (NEW)
RESEND_API_KEY=re_your_api_key_here
```

---

## 🎨 Custom Domain (Optional - Advanced)

Want emails from `noreply@quickmart.com` instead of `onboarding@resend.dev`?

1. **Buy a domain** (Namecheap, GoDaddy, etc.)
2. **Add domain in Resend**:
   - Go to Resend Dashboard → Domains
   - Click "Add Domain"
   - Enter your domain
   - Add DNS records (provided by Resend)
3. **Update environment variable**:
   ```
   RESEND_FROM_EMAIL=QuickMart <noreply@quickmart.com>
   ```

---

## 🐛 Troubleshooting

### OTP Not Received?

1. **Check spam folder** (first time might go to spam)
2. **Verify Resend API key** is correct in Render
3. **Check Render logs** for errors
4. **Test in Resend dashboard** (send test email)

### "Email service not configured" error?

- Verify `RESEND_API_KEY` is set in Render Environment
- Check for typos in the API key
- Redeploy after adding the variable

### Still using Gmail SMTP?

- Make sure you pushed the latest code
- Verify Render deployed the new version
- Check logs for "Resend email service initialized"

---

## 📈 Monitoring

### Check Email Delivery:

1. Go to **Resend Dashboard**
2. Click **"Emails"** in sidebar
3. See all sent emails with status:
   - ✅ Delivered
   - ⏳ Queued
   - ❌ Failed

### View Email Content:

- Click any email in Resend dashboard
- See exactly what user received
- Check delivery time and status

---

## ✅ Success Checklist

- [ ] Created Resend account
- [ ] Got API key from Resend
- [ ] Added `RESEND_API_KEY` to Render
- [ ] Render redeployed successfully
- [ ] Tested registration with real email
- [ ] Received OTP in inbox
- [ ] Completed registration successfully

---

## 🎉 You're Done!

Your QuickMart app now sends professional OTP emails just like Swiggy, Zomato, and other modern apps!

**Users will receive OTP in their email inbox within 2-5 seconds.**

No more connection timeouts or SMTP issues! 🚀
