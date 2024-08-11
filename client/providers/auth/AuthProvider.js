import axios from "axios";
import { AuthContextProvider } from "./AuthContext";
import { cookies } from "next/headers";

async function fetchUser() {
  const sessionCookie = cookies().get("dfr_hub_session");
  if (!sessionCookie) {
    return null;
  }

  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/validate`, {
      withCredentials: true,
      headers: {
        Cookie: `${sessionCookie.name}=${sessionCookie.value};`,
      },
    })
    .catch(() => null);
  return res?.data;
}

const AuthProvider = async ({ children }) => {
  const user = await fetchUser();
  return (
    <AuthContextProvider initialUser={user}>{children}</AuthContextProvider>
  );
};

export default AuthProvider;
