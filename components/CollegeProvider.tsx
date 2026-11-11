"use client";

import { createContext, useContext } from "react";
import type { CollegeConfig } from "@/config/types";

const CollegeContext = createContext<CollegeConfig | null>(null);

/** Passes the server-selected college config to client components. */
export function CollegeProvider({
  college,
  children,
}: {
  college: CollegeConfig;
  children: React.ReactNode;
}) {
  return <CollegeContext.Provider value={college}>{children}</CollegeContext.Provider>;
}

export function useCollege() {
  const ctx = useContext(CollegeContext);
  if (!ctx) throw new Error("useCollege must be used inside <CollegeProvider>");
  return ctx;
}
