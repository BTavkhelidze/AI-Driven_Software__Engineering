const API_Base = 'http://localhost:5000/api';

async function handleResponse(res) {
  if (res.status === 401) throw new Error('UnAuthorized');
  if (!res.ok) {
    const text = await res.Text().catch(() => 'Unknown Error');
    throw new Error(text);
  }

  return res.json();
}

export async function fetchCurrentUser() {
  const res = await fetch(`${API_Base}/users/profile`, {
    credentials: 'include',
  });

  return handleResponse(res);
}

export async function loginUser(data) {
  const res = await fetch(`${API_Base}/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function registerUser(data) {
  const res = await fetch(`${API_Base}/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function logoutUser() {
  const res = await fetch(`${API_Base}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(res);
}