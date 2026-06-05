const AUTH_STORAGE_KEY = "yourselfpilates_auth";
const AUTH_CHANGE_EVENT = "authChange";

const dispatchAuthChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
};

const safeStorage = {
  get: (key) => {
    try {
      if (typeof window === "undefined") return null;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage error:", error);
    }
  },
  remove: (key) => {
    try {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Storage error:", error);
    }
  },
};

export function storeAuthData(authData) {
  const dataToStore = {
    token: authData.token,
    email: authData.email,
    fullName: authData.full_name,
    role: authData.role,
    userId: authData.user_id,
    timestamp: Date.now(),
  };

  safeStorage.set(AUTH_STORAGE_KEY, dataToStore);
  dispatchAuthChange();
}

export function getAuthData() {
  return safeStorage.get(AUTH_STORAGE_KEY);
}

export function getAccessToken() {
  return getAuthData()?.token || null;
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function clearAuthData() {
  safeStorage.remove(AUTH_STORAGE_KEY);
  dispatchAuthChange();
}

export function getUserInfo() {
  const authData = getAuthData();
  if (!authData) return null;

  return {
    email: authData.email,
    fullName: authData.fullName,
    role: authData.role,
    userId: authData.userId,
  };
}

export function onAuthChange(callback) {
  if (typeof window === "undefined") return () => {};

  const handleChange = () => callback(isAuthenticated(), getUserInfo());

  window.addEventListener(AUTH_CHANGE_EVENT, handleChange);
  window.addEventListener("storage", (e) => {
    if (e.key === AUTH_STORAGE_KEY) handleChange();
  });

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}
