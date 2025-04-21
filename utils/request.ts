import axios from "axios";
import { API_URL } from "../env";
import { useSession } from "../ctx";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

const { session, signOut } = useSession();

// Request interceptors
instance.interceptors.request.use(
  async (config) => {
    if (session) {
      config.headers.Authorization = `Bearer ${session}`;
    } else {
      console.log("no token found");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptors
instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    const { response = {} } = error;

    switch (response.status) {
      case 401:
        signOut();
        break;

      default:
        toast.error("An error occurred: " + response.statusText);
    }

    return Promise.reject(response.data);
  }
);

export default instance;
