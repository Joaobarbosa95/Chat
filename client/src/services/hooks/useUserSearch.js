import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserSearch(token, username) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userSearch, setUserSearch] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setUserSearch([]);
    setNotFound(false);
  }, [username]);

  useEffect(() => {
    if (!token) return;
    if (username.trim().length < 1) return;
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "POST",
      url: "http://localhost:4000/inbox/dialogue-search",
      data: { username: username.trim().toLowerCase() },
      headers: {
        authorization: "Bearer " + token,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setLoading(false);
        if (res.data.length === 0) return setNotFound(true);
        setUserSearch(res.data);
        setHasMore(res.data.length > 0);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setLoading(false);
        setError(true);
      });

    return () => cancel();
  }, [token, username]);

  return { loading, error, userSearch, hasMore, notFound };
}
