import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from 'config/firebaseConfig';
import { getDatabase, ref, get, set } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export const signUp = async (email: string, password: string, role: string): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await set(ref(db, 'users/' + user.uid), {
      email: email,
      role: role
    });

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    } else {
      console.error('An unknown error occurred');
      throw new Error('An unknown error occurred');
    }
  }
};

export const signIn = async (email: string, password: string): Promise<{ role: string, uid: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    const userRef = ref(db, `users/${uid}/role`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const role = snapshot.val();
      return { role, uid };
    } else {
      throw new Error('Role does not exist.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const handleLogout = (): Promise<void> => {
  return auth.signOut();
};

