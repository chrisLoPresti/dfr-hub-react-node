import { AuthContextProvider } from "./AuthContext";
import { cookies } from "next/headers";
import { apiInstance } from "@/lib/api";

async function fetchUser() {
  const sessionCookie = cookies().get("dfr_hub_session");
  if (!sessionCookie) {
    return null;
  }

  const res = await apiInstance
    .get("/api/auth/validate", {
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
