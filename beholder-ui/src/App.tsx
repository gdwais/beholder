import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { EvaluatorContainer, Landing } from "./components";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { createDefaultAuthorizationResultCache } from "@solana-mobile/wallet-adapter-mobile";
import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
} from "@solana-mobile/wallet-adapter-mobile";
import { Cluster } from "@solana/web3.js";
// import {
//   PhantomWalletAdapter,
//   SlopeWalletAdapter,
//   SolflareWalletAdapter,
//   BraveWalletAdapter,
// } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";

export const App = () => {
  const network = process.env.REACT_APP_SOLANA_ENV!;

  const wallets = useMemo(() => {
    return [
      new SolanaMobileWalletAdapter({
        appIdentity: { name: "Beholder" },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: network as Cluster,
        addressSelector: createDefaultAddressSelector(),
        onWalletNotFound: async (
          _mobileWalletAdapter: SolanaMobileWalletAdapter
        ) => {
          return;
        },
      }),
      // new PhantomWalletAdapter(),
      // new BraveWalletAdapter(),
      // new SlopeWalletAdapter(),
      // new SolflareWalletAdapter({ network: network as WalletAdapterNetwork }),
    ];
  }, [network]);

  return (
    <BrowserRouter>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div className="App">
            <Provider store={store}>
              <Routes>
                <Route element={<Landing />} path="/" />

                <Route element={<EvaluatorContainer />} path="/evaluator" />

                {/* Redirect to root if path doesn't exist */}
                <Route element={<Navigate to="/" replace />} path="/*" />
              </Routes>
            </Provider>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </BrowserRouter>
  );
};

export default App;
