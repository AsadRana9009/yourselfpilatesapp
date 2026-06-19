const AUTH_STORAGE_KEY = "yourselfpilates_auth";
const REGION_STORAGE_KEY = "yourselfpilates_login_region";
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
  let dataToStore;

  if (authData.tokens && authData.user) {
    // Student JWT login: { tokens: { access, refresh }, user: { id, email, full_name, role, is_public, ... } }
    dataToStore = {
      accessToken: authData.tokens.access,
      refreshToken: authData.tokens.refresh,
      tokenType: "Bearer",
      email: authData.user.email,
      fullName: authData.user.full_name,
      role: authData.user.role,
      isPublic: authData.user.is_public ?? true,
      userId: String(authData.user.id),
      isVerified: authData.user.is_verified,
      regionId: authData.user.region_id ?? null,
      timestamp: Date.now(),
    };
  } else {
    // DRF token login: { token, email, full_name, role, is_public, user_id }
    dataToStore = {
      accessToken: authData.token,
      tokenType: "Token",
      email: authData.email,
      fullName: authData.full_name,
      role: authData.role,
      isPublic: authData.is_public ?? false,
      userId: authData.user_id,
      regionId: authData.region_id ?? null,
      timestamp: Date.now(),
    };
  }

  safeStorage.set(AUTH_STORAGE_KEY, dataToStore);
  dispatchAuthChange();
}

export function getAuthData() {
  return safeStorage.get(AUTH_STORAGE_KEY);
}

export function getAccessToken() {
  const data = getAuthData();
  // Support both new format (accessToken) and legacy format (token)
  return data?.accessToken || data?.token || null;
}

export function getTokenType() {
  return getAuthData()?.tokenType || "Token";
}

export function getRefreshToken() {
  return getAuthData()?.refreshToken || null;
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function clearAuthData() {
  safeStorage.remove(AUTH_STORAGE_KEY);
  safeStorage.remove(REGION_STORAGE_KEY);
  dispatchAuthChange();
}

export function storeLoginRegion(region) {
  safeStorage.set(REGION_STORAGE_KEY, region ?? null);
}

export function getLoginRegion() {
  return safeStorage.get(REGION_STORAGE_KEY);
}

export function getUserInfo() {
  const authData = getAuthData();
  if (!authData) return null;

  return {
    email: authData.email,
    fullName: authData.fullName,
    role: authData.role,
    isPublic: authData.isPublic ?? null,
    userId: authData.userId,
  };
}

export function getUserRegionId() {
  return getAuthData()?.regionId ?? null;
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
