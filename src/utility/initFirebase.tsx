import FIREBASE_CONFIG from "./FIREBASE_CONFIG";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, remove, set, update } from "firebase/database";

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);

export function setNewUserNode(userId: string, email: string | null) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), { email: email });
  set(ref(db, "users/" + userId + "/bookmarks"), { 0: false });
}
export function writeUserBookmark(userId: string, title: string) {
  const db = getDatabase();
  update(ref(db, "users/" + userId + "/bookmarks"), {
    [title]: true,
  });
}
export function removeUserBookmark(userId: string, title: string) {
  const db = getDatabase();
  update(ref(db, "users/" + userId + "/bookmarks"), {
    [title]: null,
  });
}
