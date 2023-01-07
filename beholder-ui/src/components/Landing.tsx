import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { WalletReadyState } from "@solana/wallet-adapter-base";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";
import { clearUser, setUser, useAppDispatch } from "../store";
import useCustomWallet from "../hooks/useCustomWallet";
import { loginUser } from "../services/user-service";

const LandingFrameMessage = () => {
  const style = {
    margin: "auto",
    padding: "10% 35% 10% 15%",
    color: "white",
  };
  return (
    <div style={style}>
      <div className="text-[96px]">Beholder</div>
      <div className="text-[36px]">
        ML powered trait identification for web3 based images.
      </div>
      <br />
    </div>
  );
};

export const Landing = () => {
  const { signMessage, publicKey, connected, wallet, connect } = useWallet();
  const [selected, setSelected] = useState<string | undefined>(
    wallet?.adapter?.name
  );

  const { handleSign } = useCustomWallet();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createConnection = async () => {
    dispatch(clearUser());

    type solanaResponseType = { nonce: number; signedMessage: string } | null;
    let solanaResponse: solanaResponseType = null;

    if (publicKey && wallet) {
      solanaResponse = await handleSign(publicKey, signMessage);

      const walletId = publicKey.toString();

      if (solanaResponse) {
        const response = await loginUser(
          walletId,
          publicKey,
          solanaResponse.nonce,
          signMessage
        );

        if (response) {
          dispatch(setUser({ wallet: walletId }));
          navigate("/home");
        }

        if (!response) {
          //show dialog that login failed
        }
      }
    }
  };

  useEffect(() => {
    if (wallet?.adapter?.connected) {
      createConnection();
    }

    // Make sure we only connect if the name has changed, and don't autoconnect on the initial render
    if (wallet?.adapter?.name === selected) return;
    setSelected(wallet?.adapter?.name);

    if (
      (wallet?.adapter?.name &&
        wallet?.adapter?.readyState === WalletReadyState.Installed) ||
      wallet?.adapter?.readyState === WalletReadyState.Loadable
    ) {
      connect().catch(() => {}); // Ignore this error because it'll be handled by the provider

      return;
    }

    // We don't need to worry about disconnecting if this changes, the provider handles that
  }, [wallet?.adapter?.name, selected, wallet?.adapter?.readyState, connect]);

  return (
    <div className="w-full h-full fixed flex flex-col dark:bg-black-Black1  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full h-full flex flex-col min-w-[1400px] min-h-[900px]">
        <div className="w-full h-full fixed bg-no-repeat">
          <div className="grid grid-cols-1 justify-items-end py-5 px-20">
            <>
              {connected && wallet ? (
                <div className="flex flex-row gap-3">
                  <button
                    className="bg-white text--black-Black1 dark:hover:text-white w-28 h-10 rounded-full font-semibold
        dark:hover:bg-black-Black1 dark:text-black-Black1"
                    data-cy="walletBtn"
                    style={{
                      boxShadow: "0px 4px 0px rgba(20, 20, 21, 0.1)",
                    }}
                    onClick={() => {
                      createConnection();
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="bg-white text--black-Black1 dark:hover:text-white w-28 h-10 rounded-full font-semibold
        dark:hover:bg-black-Black1 dark:text-black-Black1"
                    data-cy="walletBtn"
                    style={{
                      boxShadow: "0px 4px 0px rgba(20, 20, 21, 0.1)",
                    }}
                    onClick={() => {
                      wallet.adapter.disconnect();
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <WalletMultiButton
                  className="bg-white text--black-Black1 dark:hover:text-white w-28 h-10 rounded-full font-semibold
        dark:hover:bg-black-Black1 dark:text-black-Black1"
                  style={{
                    boxShadow: "0px 4px 0px rgba(20, 20, 21, 0.1)",
                  }}
                  onClick={() => {
                    createConnection();
                  }}
                >
                  {wallet ? "Login" : "Choose Wallet"}
                </WalletMultiButton>
              )}
            </>
          </div>
          <div className="h-full w-full flex flex-col justify-center items-center">
            {/* <img
              alt="Alpha Based Logo"
              className="w-2/3 mb-12 object-contain"
              src={basedWordLogo}
            /> */}
            <LandingFrameMessage />
          </div>
        </div>
      </div>
    </div>
  );
};
