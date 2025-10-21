const BASE_URL = "http://127.0.0.1:5000";

// ---- TOKEN HELPERS ----
export function setToken(token) {
  localStorage.setItem("chama_token", token);
}

export function getToken() {
  return localStorage.getItem("chama_token");
}

export function clearToken() {
  localStorage.removeItem("chama_token");
}

export function authHeaders() {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

// ---- AUTH ----
export async function registerUser(payload) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Registration failed: ${err}`);
  }

  return res.json();
}

export async function loginUser(payload) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  if (data.access_token) {
    setToken(data.access_token);
  }

  return data;
}

// ---- MEMBERS ----
export async function getMembers() {
  const res = await fetch(`${BASE_URL}/members`, {
    method: "GET",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    clearToken();
    throw new Error("Unauthorized – please log in again.");
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch members: ${err}`);
  }

  return res.json();
}

export async function addMember(payload) {
  const res = await fetch(`${BASE_URL}/members`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to add member: ${err}`);
  }

  return res.json();
}

export async function updateMember(id, data) {
  const res = await fetch(`${BASE_URL}/members/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update member");
  return res.json();
}

export async function deleteMember(id) {
  const res = await fetch(`${BASE_URL}/members/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete member");
  return res.json();
}
