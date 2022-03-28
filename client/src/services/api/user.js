import axios from "./axiosInstance";

export async function fetchPublicProfile(user, otherUser) {
  // replace with only token
  const bearer = "Bearer " + user?.token;

  const res = await axios({
    url: "/inbox/public-profile",
    headers: {
      authorization: bearer,
    },
    data: JSON.stringify({ username: otherUser }),
  });

  return res.data;
}

export async function validateToken(token) {
  const bearer = "Bearer " + token;

  const res = await axios({
    method: "POST",
    url: "/user/validate",
    withCredentials: true,
    headers: {
      authorization: bearer,
    },
  });

  return res.data;
}

export async function login(username, password) {
  const res = await axios({
    method: "POST",
    url: "/user/login",
    data: JSON.stringify({
      username: username.trim().toLowerCase(),
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res)
    .catch((e) => e.response.data);

  return res;
}

export async function logout(user) {
  localStorage.removeItem("SessionID");
  localStorage.removeItem("ChatToken");
  user.username = null;
  user.token = null;
  user.socket.disconnect();
  user.socket = null;
}

export async function updateUnseeMessages(token, conversationId) {
  await axios({
    method: "POST",
    url: "/inbox/update-messages-status",
    data: { conversationId: conversationId },
    headers: {
      authorization: token,
    },
  });
}
