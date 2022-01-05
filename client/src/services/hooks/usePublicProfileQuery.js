import axios from "axios";
import { useState, useEffect } from "react";

export default usePublicProfileQuery = (username) => {
  const [publicProfile, setPublicProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    axios({
      method: "GET",
      url: "http://localhost:4000/public-profile",
      params: { username: username },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        //   setPublicProfile()
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(e);
      });
    return () => cancel();
  }, [username]);

  return { username };
};
