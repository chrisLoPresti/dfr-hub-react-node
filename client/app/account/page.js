"use client";

import { useUser } from "@/hooks/useUser";

const Account = () => {
  const { user } = useUser();
  return <div>{user?.first_name}</div>;
};

export default Account;
