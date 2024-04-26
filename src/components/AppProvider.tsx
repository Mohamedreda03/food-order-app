"use client";
import { store, persistor } from "@/rtk/store";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
