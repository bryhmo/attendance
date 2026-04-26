# ◈ AttendQR — Firebase Edition

> Real-time QR-code attendance system powered by Firebase Auth + Firestore.  
> Teacher generates a QR → students on **any device, anywhere** scan it → attendance updates live for everyone.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?style=flat-square&logo=firebase)
![License](https://img.shields.io/badge/License-MIT-00ff88?style=flat-square)

---

## 🏗️ Architecture

```
Teacher's phone/laptop          Firebase Cloud          Student's phone
─────────────────────           ──────────────          ───────────────
Generate QR Session   ──────►  Firestore DB   ◄──────  Scan QR Code
See live check-ins    ◄──────  (real-time)    ──────►  Marked present instantly
```

- **Firebase Authentication** — secure login for teachers and students
- **Cloud Firestore** — real-time database; all devices sync in under 1 second
- **No backend server needed** — Firebase handles everything

---

## 📁 Project Structure

```
attendqr-firebase/
├── public/
│   └── index.html
├── src/
│   ├── firebase.js        ← YOUR FIREBASE CREDENTIALS GO HERE
│   ├── App.jsx            ← Main application
│   └── index.js           ← Entry point
├── firestore.rules        ← Firestore security rules
├── package.json
└── README.md
```

---

## 🚀 Setup Guide (Step by Step)

### STEP 1 — Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"**
3. Name it `attendqr` → click Continue
4. Disable Google Analytics (not needed) → click **"Create project"**
5. Wait for it to initialize → click **"Continue"**

---

### STEP 2 — Enable Firebase Authentication

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Click **"Email/Password"** provider → toggle it **ON** → click **"Save"**

---

### STEP 3 — Create User Accounts

You need to create an account for every teacher and student.

1. In Authentication → click **"Add user"** for each person:

| Email | Password | Role |
|---|---|---|
| adebayo@school.edu | teacher123 | Teacher |
| okonkwo@school.edu | teacher123 | Teacher |
| amara@school.edu | student123 | Student |
| chidi@school.edu | student123 | Student |
| fatima@school.edu | student123 | Student |
| emeka@school.edu | student123 | Student |
| ngozi@school.edu | student123 | Student |
| tunde@school.edu | student123 | Student |
| halima@school.edu | student123 | Student |
| seun@school.edu | student123 | Student |

> You can also change these passwords to anything stronger you want.

---

### STEP 4 — Enable Cloud Firestore

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** → click Next
4. Pick a region closest to you (e.g. `europe-west1` for Nigeria) → click **"Enable"**

---

### STEP 5 — Set Firestore Security Rules

1. In Firestore → click the **"Rules"** tab
2. Replace everything with the contents of `firestore.rules` in this project:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sessions/{classId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null;
      allow delete: if false;
    }
  }
}
```

3. Click **"Publish"**

---

### STEP 6 — Get Your Firebase Config

1. In Firebase Console → click the ⚙️ gear icon → **"Project settings"**
2. Scroll down to **"Your apps"** → click the **`</>`** (Web) icon
3. Register your app — name it `attendqr-web` → click **"Register app"**
4. Copy the `firebaseConfig` object — it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "attendqr.firebaseapp.com",
  projectId: "attendqr",
  storageBucket: "attendqr.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

### STEP 7 — Paste Config into the App

Open `src/firebase.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey:            "PASTE_YOUR_API_KEY_HERE",
  authDomain:        "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId:         "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket:     "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId:             "PASTE_YOUR_APP_ID_HERE",
};
```

---

### STEP 8 — Install and Run

```bash
npm install
npm start
```

App opens at **http://localhost:3000** ✅

---

## 🌐 Deploy to Vercel

```bash
git init
git add .
git commit -m "AttendQR Firebase edition"
git remote add origin https://github.com/YOUR_USERNAME/attendqr-firebase.git
git push -u origin main
```

Then go to [vercel.com](https://vercel.com) → Import your repo → Deploy.

> ⚠️ **Important:** After deploying, go to Firebase Console → Authentication → **"Authorized domains"**  
> Add your Vercel URL (e.g. `attendqr-firebase.vercel.app`) so Firebase allows logins from it.

---

## 🧪 How to Test (Multi-Device)

1. Open the app on **Device 1** (laptop) → login as **Teacher** → Generate QR
2. Open the app on **Device 2** (phone) → login as **Student** → tap Camera → scan the QR
3. Watch the teacher's screen — the student's name appears **instantly** in real time ✅

---

## 🔑 Demo Credentials

| Name | Email | Password | Role |
|---|---|---|---|
| Dr. Adebayo | adebayo@school.edu | teacher123 | Teacher |
| Prof. Okonkwo | okonkwo@school.edu | teacher123 | Teacher |
| Amara Okafor | amara@school.edu | student123 | Student |
| Chidi Nwosu | chidi@school.edu | student123 | Student |
| (+ 6 more students) | ...@school.edu | student123 | Student |

---

## ⚠️ Troubleshooting

| Problem | Fix |
|---|---|
| "auth/invalid-credential" | Make sure you created all users in Firebase Auth (Step 3) |
| "Missing or insufficient permissions" | Publish Firestore rules from Step 5 |
| Login works locally but not on Vercel | Add your Vercel domain to Firebase Auth → Authorized domains |
| QR scan says "no matching session" | Both devices must be logged in and on the internet |
| Camera not working | Allow camera permission; use HTTPS (Vercel provides this automatically) |

---

## 🔮 Future Upgrades

- [ ] Admin panel to manage users without Firebase console
- [ ] Push notifications for low attendance warnings
- [ ] Weekly/monthly attendance reports
- [ ] Student self-registration with email verification
- [ ] Multi-school / multi-campus support

---

## 📄 License

MIT — free to use, modify, and deploy.

---

*AttendQR Firebase Edition — Real-time attendance, anywhere in the world.*
