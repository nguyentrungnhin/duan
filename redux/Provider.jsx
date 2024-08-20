// 'use client'
// import { Provider } from "react-redux";
// import { store } from "./store";

// function Providers({ children }) {
//     return <Provider store={store}>{children}</Provider>;
// }

// export default Providers;
"use client";
import { Provider } from "react-redux";
import { persistor, store } from "./Store";
import { PersistGate } from "redux-persist/integration/react";


export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
