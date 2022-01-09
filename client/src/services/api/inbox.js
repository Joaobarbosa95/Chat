import axios from "axios";

export function dialoguesQuery(token) {
  let cancelQuery;

  const query = new Promise((resolve, reject) => {
    try {
      resolve();
    } catch (e) {
      reject(e);
    }
  });

  return { query, cancelQuery };
}
