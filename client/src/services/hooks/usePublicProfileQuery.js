import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import axiosParent from "axios";
import { useChatContext } from "../../Contexts/ChatContext";

const { CancelToken, isCancel } = axiosParent;

export default function usePublicProfileQuery(token, username, conversationId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [publicProfile, setPublicProfile] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { setPublicId } = useChatContext();

  useEffect(() => {
    if (!token || username?.trim().length < 1) return;
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "POST",
      url: "/inbox/public-profile",
      data: { username: username },
      headers: {
        authorization: "Bearer " + token,
      },
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPublicId(res.data[0]._id);
        setPublicProfile(res.data[0]);
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (isCancel(e)) return;
        setLoading(false);
        setError(true);
      });
    return () => cancel();
  }, [token, username]);

  return { loading, error, publicProfile, hasMore };
}
