# Render Environment Variables

## Required Variables (Add these in Render Dashboard)

Go to: **Render Dashboard → Your Service → Environment → Add Environment Variable**

### 1. MONGODB_URI (Required)
```
Key: MONGODB_URI
Value: mongodb+srv://quickmart:quick%40mart@cluster0.ospmsor.mongodb.net/quickmart?retryWrites=true&w=majority&appName=Cluster0
```

### 2. JWT_SECRET (Required)
```
Key: JWT_SECRET
Value: quickmart_jwt_secret_key_2024_production_ready
```

### 3. PORT (Required)
```
Key: PORT
Value: 10000
```
Note: Render uses port 10000 by default

### 4. NODE_ENV (Required)
```
Key: NODE_ENV
Value: production
```

---

## Optional Variables (For Email Functionality)

### 5. EMAIL_USER (Optional - for OTP emails)
```
Key: EMAIL_USER
Value: your-email@gmail.com
```

### 6. EMAIL_PASS (Optional - for OTP emails)
```
Key: EMAIL_PASS
Value: your-gmail-app-password
```

**How to get Gmail App Password:**
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable it)
3. Security → App Passwords
4. Generate new password for "Mail"
5. Copy the 16-character password
6. Use it as EMAIL_PASS value

---

## Alternative: Custom SMTP (Instead of Gmail)

If you want to use a different email provider:

```
Key: SMTP_HOST
Value: smtp.your-provider.com

Key: SMTP_PORT
Value: 587

Key: SMTP_SECURE
Value: false

Key: SMTP_USER
Value: your-smtp-username

Key: SMTP_PASS
Value: your-smtp-password
```

---

## How to Add Variables in Render:

1. **Login to Render**: https://dashboard.render.com
2. **Select your service**: Click on "quickmart-backend"
3. **Go to Environment**: Click "Environment" in left sidebar
4. **Add variables**: Click "Add Environment Variable" button
5. **Enter Key and Value**: Copy from above
6. **Save**: Click "Save Changes"
7. **Auto-redeploy**: Render will automatically redeploy

---

## Verification:

After adding variables and redeploying, check logs for:
- ✅ `✅ MongoDB connected successfully`
- ✅ `🚀 QuickMart API Server running on port 10000`
- ✅ `📧 Using Gmail Configuration` (if email configured)

---

## Troubleshooting:

### MongoDB Connection Failed?
- Check MONGODB_URI is correct
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MongoDB Atlas cluster is running

### Email Not Working?
- OTP will still work (logged to console)
- Check Render logs for OTP values
- Add EMAIL_USER and EMAIL_PASS to enable email sending

### Server Not Starting?
- Verify all required variables are set
- Check Render logs for specific errors
- Ensure PORT is set to 10000
