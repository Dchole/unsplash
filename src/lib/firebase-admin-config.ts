import * as admin from "firebase-admin";
import serviceAccount from "../../serviceAccount.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any)
  });
}

export default admin;
