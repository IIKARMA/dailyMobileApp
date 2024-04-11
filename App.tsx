/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import RootStack from "./src/navigation/RootStack";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "react-native-toast-notifications";

import { Provider } from "react-redux";
import { persistor, store } from "@src/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableLatestRenderer } from "react-native-maps";
import { SheetProvider } from "react-native-actions-sheet";
import "@src/components/MultiSelect/sheet.tsx";
import { Portal, PortalProvider } from "@gorhom/portal";
enableLatestRenderer();
function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider>
            <RootStack />
          </ToastProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
