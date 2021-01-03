import * as admin from "firebase-admin";
import serviceAccount from "../../serviceAccount.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET
  });
}

export default admin;
