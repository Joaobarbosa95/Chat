import axios from "axios";

export async function fetchPublicProfile(user, otherUser) {
  const url = "http://localhost:4000/inbox/public-profile";

  const bearer = "Bearer " + user?.token;

  const opts = {
    method: "POST",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: otherUser }),
  };

  const res = await fetch(url, opts);
  const data = await res.json();
  return data;
}

export async function validateToken(token) {
  const url = "http://localhost:4000/user/validate";

  const bearer = "Bearer " + token;

  const opts = {
    method: "POST",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: bearer,
    },
  };

  const res = await fetch(url, opts);
  const data = await res.json();
  return data;
}

export async function login(username, password) {
  const url = "http://localhost:4000/user/login";
  const options = {
    method: "POST",
    body: JSON.stringify({
      username: username.trim().toLowerCase(),
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

export async function logout(user) {
  localStorage.removeItem("SessionID");
  localStorage.removeItem("ChatToken");
  user.username = null;
  user.token = null;
  user.socket.disconnect();
}

export async function updateUnseeMessages(token, conversationId) {
  await axios({
    method: "POST",
    url: "http://localhost:4000/inbox/update-messages-status",
    data: { conversationId: conversationId },
    headers: {
      authorization: token,
    },
  });
}
