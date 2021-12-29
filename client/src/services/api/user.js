async function fetchPublicProfile(user, otherUser) {
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

module.exports = { fetchPublicProfile };
