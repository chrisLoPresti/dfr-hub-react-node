"use client";

const { useUser } = require("@/hooks/useUser");
const { useEffect } = require("react");

const Logout = () => {
  const { logout } = useUser();

  useEffect(() => {
    logout();
  }, []);

  return null;
};

export default Logout;
