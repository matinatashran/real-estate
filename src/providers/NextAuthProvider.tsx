"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: ReactNode;
}

const NextAuthProvider = ({ children }: IProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
