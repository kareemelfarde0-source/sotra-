import { AdminUser, AdminRole } from '../types';
import { fetchAdminUsersFromFirestore, saveAdminUserToFirestore } from '../firebase/db';

export const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    id: 'user-admin',
    username: 'admin',
    password: 'SOTRA20260',
    role: 'admin',
    nameAr: 'المدير العام (Super Admin)',
    nameEn: 'Super Administrator'
  },
  {
    id: 'user-orders',
    username: 'orders',
    password: 'orders123',
    role: 'orders',
    nameAr: 'مسؤول الطلبات والشحن',
    nameEn: 'Orders & Shipping Manager'
  },
  {
    id: 'user-data-entry',
    username: 'data_entry',
    password: 'data123',
    role: 'data_entry',
    nameAr: 'مدخل بيانات المنتجات',
    nameEn: 'Data Entry Specialist'
  },
  {
    id: 'user-management',
    username: 'manager',
    password: 'manage123',
    role: 'management',
    nameAr: 'إدارة المتجر والمبيعات',
    nameEn: 'Operations & Management'
  }
];

const KEY_ADMIN_USERS = 'sotra_admin_users';
const KEY_CURRENT_USER = 'sotra_current_admin_user';
const KEY_REMEMBERED = 'sotra_remembered_admin_credentials';

export function getAdminUsers(): AdminUser[] {
  try {
    const raw = localStorage.getItem(KEY_ADMIN_USERS);
    if (!raw) return DEFAULT_ADMIN_USERS;
    const list: AdminUser[] = JSON.parse(raw);
    if (!list.find((u) => u.username === 'admin')) {
      return [DEFAULT_ADMIN_USERS[0], ...list];
    }
    return list;
  } catch {
    return DEFAULT_ADMIN_USERS;
  }
}

export function saveAdminUsers(users: AdminUser[]) {
  try {
    localStorage.setItem(KEY_ADMIN_USERS, JSON.stringify(users));
    // Also sync to Firestore
    for (const u of users) {
      saveAdminUserToFirestore(u).catch(console.error);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function syncAdminUsersFromFirestore(): Promise<AdminUser[]> {
  try {
    const firestoreUsers = await fetchAdminUsersFromFirestore();
    if (firestoreUsers && firestoreUsers.length > 0) {
      localStorage.setItem(KEY_ADMIN_USERS, JSON.stringify(firestoreUsers));
      return firestoreUsers;
    }
  } catch (e) {
    console.error(e);
  }
  return getAdminUsers();
}

export function authenticateAdmin(
  usernameInput: string,
  passwordInput: string
): AdminUser | null {
  const users = getAdminUsers();
  const trimmedUser = usernameInput.trim();
  const trimmedPass = passwordInput.trim();

  // Primary fallback for standard admin
  if (trimmedUser === 'admin' && trimmedPass === 'SOTRA20260') {
    const foundAdmin = users.find((u) => u.username === 'admin') || DEFAULT_ADMIN_USERS[0];
    setCurrentAdminUser(foundAdmin);
    return foundAdmin;
  }

  const found = users.find(
    (u) => u.username.toLowerCase() === trimmedUser.toLowerCase() && u.password === trimmedPass
  );

  if (found) {
    setCurrentAdminUser(found);
    return found;
  }

  return null;
}

export function getCurrentAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(KEY_CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentAdminUser(user: AdminUser | null) {
  try {
    if (user) {
      localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(user));
      localStorage.setItem('sotra_admin_auth', 'true');
    } else {
      localStorage.removeItem(KEY_CURRENT_USER);
      localStorage.removeItem('sotra_admin_auth');
    }
  } catch (e) {
    console.error(e);
  }
}

export function getRememberedCredentials(): { username: string; password: string; remember: boolean } {
  try {
    const raw = localStorage.getItem(KEY_REMEMBERED);
    return raw ? JSON.parse(raw) : { username: '', password: '', remember: false };
  } catch {
    return { username: '', password: '', remember: false };
  }
}

export function saveRememberedCredentials(username: string, password: string, remember: boolean) {
  try {
    if (remember) {
      localStorage.setItem(KEY_REMEMBERED, JSON.stringify({ username, password, remember: true }));
    } else {
      localStorage.removeItem(KEY_REMEMBERED);
    }
  } catch (e) {
    console.error(e);
  }
}

// Role-based visible tabs mapping
export function getAllowedTabsForRole(role: AdminRole): string[] {
  switch (role) {
    case 'admin':
      return [
        'products',
        'categories',
        'look_coordination',
        'bundles',
        'orders',
        'customers',
        'settings',
        'backup',
        'users'
      ];
    case 'orders':
      return ['orders', 'customers'];
    case 'data_entry':
      return ['products', 'categories', 'look_coordination', 'bundles'];
    case 'management':
      return ['orders', 'products', 'categories', 'customers'];
    default:
      return ['products'];
  }
}
