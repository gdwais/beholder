import { Wallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { sign } from "tweetnacl";

export enum AuthType {
  PhantomWallet = "Phantom",
  LedgerWallet = "Ledger",
  BraveWallet = "Brave",
  SolflareWallet = "Solflare",
  SlopeWallet = "Slope",
  None = "None",
}

const useCustomWallet = () => {
  const getWalletType = (wallet: Wallet | null) => {
    let authType = AuthType.None;

    if (wallet?.adapter?.name) {
      switch (wallet.adapter.name) {
        case "Brave":
          authType = AuthType.BraveWallet;
          break;
        case "Phantom":
          authType = AuthType.PhantomWallet;
          break;
        case "Slope":
          authType = AuthType.SlopeWallet;
          break;
        case "Solflare":
          authType = AuthType.SolflareWallet;
          break;
        case null:
          authType = AuthType.None;
          break;
        default:
          break;
      }
    }

    return authType;
  };

  const handleSign = async (
    publicKey: PublicKey,
    signMessage: any
  ): Promise<{
    nonce: number;
    signedMessage: string;
    publicKey: any;
  } | null> => {
    // `publicKey` will be null if the wallet isn't connected
    if (!publicKey) return null;

    // `signMessage` will be undefined if the wallet doesn't support it
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");

    // Encode anything as bytes
    const nonce = Math.round(Math.random() * 100000);
    const message = new TextEncoder().encode(
      `Sign this message for authenticating with your wallet. Nonce: ${nonce}`
    );
    // Sign the bytes using the wallet
    const signature = await signMessage(message);

    // Verify that the bytes were signed using the private key that matches the known public key
    if (!sign.detached.verify(message, signature, publicKey.toBytes()))
      throw new Error("Invalid signature!");

    return { nonce, signedMessage: bs58.encode(signature), publicKey };
  };

  return {
    handleSign,
    getWalletType,
  };
};

export default useCustomWallet;
