import api from "./axios";

export const studentApi = {
  register: async ({ email, full_name, password, confirm_password, contact_number, region }) => {
    const { data } = await api.post("/api/user/student/register/", {
      email,
      full_name,
      password,
      confirm_password,
      contact_number,
      ...(region ? { region } : {}),
    });
    return data;
  },

  verifyEmail: async (email, otp) => {
    const { data } = await api.post("/api/user/student/verify-email/", {
      email,
      otp,
    });
    return data;
  },

  login: async (email, password) => {
    const { data } = await api.post("/api/user/student/login/", {
      email,
      password,
    });
    return data;
  },

  resendOtp: async (email) => {
    const { data } = await api.post("/api/user/student/resend-otp/", { email });
    return data;
  },

  refreshToken: async (refresh) => {
    const { data } = await api.post("/api/user/student/token/refresh/", {
      refresh,
    });
    return data;
  },
};

export const authApi = {
  login: async (email, password) => {
    const { data } = await api.post("/api/user/login/", { email, password });
    return data;
  },

  requestResetOtp: async (email) => {
    const { data } = await api.post("/api/user/request-reset-otp/", { email });
    return data;
  },

  confirmResetOtp: async (email, otp) => {
    const { data } = await api.post("/api/user/confirm-reset-otp/", {
      email,
      otp,
    });
    return data;
  },

  resetPasswordWithOtp: async (email, otp, new_password) => {
    const { data } = await api.post("/api/user/reset-password-with-otp/", {
      email,
      otp,
      new_password,
    });
    return data;
  },
};

let mePromise = null;
export const userApi = {
  getMe: async () => {
    if (mePromise) return mePromise;

    mePromise = api
      .get("/api/user/me/")
      .then((res) => res.data)
      .finally(() => {
        mePromise = null;
      });

    return mePromise;
  },
};

export const subscriptionsApi = {
  getPacks: async () => {
    const { data } = await api.get("/api/subscriptions/packs/");

    return data.results.map((pack) => ({
      id: pack.id,
      name: pack.title,
      title: pack.title,
      description: pack.description,
      // Only pass image when it's a non-empty string; null/empty → undefined so
      // PackageCard shows the "No image" placeholder instead of crashing.
      image: pack.image || undefined,
      is_public: pack.is_public,
      price: `Preço: ${parseFloat(pack.price).toFixed(2)}€`,
      link: "/agendar-espaco",
    }));
  },

  subscribe: async (packId, paymentData) => {
    const { data } = await api.post(
      `/api/subscriptions/packs/${packId}/subscribe/`,
      paymentData
    );
    return data;
  },

  getOrders: async () => {
    const { data } = await api.get("/api/subscriptions/orders/");
    return data;
  },

  payOrder: async (orderId, paymentData) => {
    const { data } = await api.post(
      `/api/subscriptions/orders/${orderId}/pay/`,
      paymentData
    );
    return data;
  },

  deleteOrder: async (orderId) => {
    const { data } = await api.delete(`/api/subscriptions/orders/${orderId}/`);
    return data;
  },

  updateOrder: async (orderId, payload) => {
    const { data } = await api.patch(
      `/api/subscriptions/orders/${orderId}/`,
      payload
    );
    return data;
  },
};

export const bookingApi = {
  getAvailableSlots: async (date) => {
    const { data } = await api.get(`/api/booking/bookings/available_slots/?date=${date}`);
    return data;
  },

  getProfessors: async (regionId) => {
    const url = regionId ? `/api/user/professors/?region=${regionId}` : '/api/user/professors/';
    const { data } = await api.get(url);
    return data;
  },

  createBooking: async (payload) => {
    const { data } = await api.post('/api/booking/bookings/', payload);
    return data;
  },

  studentBook: async (payload) => {
    const { data } = await api.post('/api/booking/bookings/student_book/', payload);
    return data;
  },
};

export const regionsApi = {
  getRegions: async () => {
    const { data } = await api.get('/api/subscriptions/regions/');
    return Array.isArray(data) ? data : (data.results ?? []);
  },
};

export const loginUser = authApi.login;
export const fetchPacks = subscriptionsApi.getPacks;
export const fetchOrders = subscriptionsApi.getOrders;
export const deleteSubscriptionOrder = subscriptionsApi.deleteOrder;
export const updateSubscriptionOrder = subscriptionsApi.updateOrder;
