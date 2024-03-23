"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import type { AppStore } from "../lib/redux/store";
import { makeStore } from "../lib/redux/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore({});
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
