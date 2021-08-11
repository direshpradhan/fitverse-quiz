import axios from "axios";

export const setupAuthHeadersForServiceCalls = (token: string | null) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  delete axios.defaults.headers.common["Authorization"];
};
