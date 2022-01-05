import axios from "axios";
import { useState, useEffect } from "react";

export default useDialogueQuery = (dialoguesPage) => {
  const [dialogues, setDialogues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;

    axios({
      method: "GET",
      url: "http://localhost:4000/dialogues",
      params: { dialoguesPage: dialoguesPage },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        // setDialogues()
        setHasMore(res.data.length > 4);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(e);
      });

    return () => cancel();
  }, [dialoguesPage]);

  return { dialogues, loading, error, hasMore };
};
