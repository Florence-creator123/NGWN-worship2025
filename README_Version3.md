```markdown
# WORSHIP DIARY (Expo / React Native) — Firebase edition

A cross-platform mobile app scaffold for a church called "WORSHIP DIARY".
This version adds Firebase Authentication (Email/Password) and Cloud Firestore
for syncing diary entries and prayer posts across devices.

What is included
- Expo + React Native app shell
- Firebase integration (Auth + Firestore)
- Sign up / Sign in / Sign out flows
- Diary (Devotionals) saved per user in Firestore (realtime)
- Prayer Wall saved per user in Firestore (realtime)
- Events & Sermons as example static lists (can be moved to Firestore)
- Realtime updates for entries while user is online

Quick start (local)
1. Install Expo CLI if needed:
   npm install -g expo-cli

2. Create a Firebase project
   - Go to https://console.firebase.google.com/
   - Create a project
   - In Build -> Authentication, enable "Email/Password"
   - In Build -> Firestore Database, create a Firestore database in production or test mode
   - (Optional) In Storage, configure rules if you want to upload media later

3. Copy your Firebase config values (from Project settings -> SDK setup) into
   `firebase/config.js` below.

4. Install dependencies:
   npm install

5. Run the app:
   expo start
   Open in Expo Go or run on simulators.

Firebase security (recommended)
- Configure Firestore rules so users can only read/write their own documents, e.g.:
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /entries/{entryId} {
        allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      }
      match /prayers/{prayerId} {
        allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      }
      // Add rules for events/sermons as needed
    }
  }

Next recommended improvements
- Add media upload for sermons (Firebase Storage)
- Add admin role and admin-only screens for creating events/sermons
- Add app icon and theming
- Configure CI/CD and create release builds (EAS / Expo build or native builds)

If you want, I can:
- Push this scaffold to a GitHub repo under your account and open a PR.
- Implement media upload and admin roles.
- Add production-ready Firestore rules and testing.

Made for: Florence-creator123 / WORSHIP DIARY
```