import { useEffect, useState } from "react";
import axios from "axios";
import { useChatContext } from "../../components/Contexts/ChatContext";

export default function usePublicProfileQuery(token, username, conversationId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [publicProfile, setPublicProfile] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { setPublicId } = useChatContext();

  useEffect(() => {
    if (!token || username.trim().length < 1) return;
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "POST",
      url: "http://localhost:4000/inbox/public-profile",
      data: { username: username },
      headers: {
        authorization: "Bearer " + token,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPublicId(res.data[0]._id);
        setPublicProfile(res.data[0]);
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setLoading(false);
        setError(true);
      });
    return () => cancel();
  }, [token, username]);

  return { loading, error, publicProfile, hasMore };
}
