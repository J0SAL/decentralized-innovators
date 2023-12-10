import { ethers } from "ethers";
import { PrimeSdk } from "@etherspot/prime-sdk";
import { printOp } from "@etherspot/prime-sdk";
import { sleep } from "@etherspot/prime-sdk";

const value = "0.01"; // transfer value

const REACT_APP_WALLET_PRIVATE_KEY = process.env.REACT_APP_WALLET_PRIVATE_KEY;
const REACT_APP_CHAIN_ID = process.env.REACT_APP_CHAIN_ID;

export async function gasless(recipient) {
  console.log(REACT_APP_CHAIN_ID, REACT_APP_WALLET_PRIVATE_KEY);
  // initializating sdk...
  const primeSdk = new PrimeSdk(
    { privateKey: REACT_APP_WALLET_PRIVATE_KEY },
    {
      chainId: Number(REACT_APP_CHAIN_ID),
      projectKey: "public-prime-testnet-key",
    }
  );

  console.log("address: ", primeSdk.state.walletAddress);

  // get address of EtherspotWallet...
  const address = await primeSdk.getCounterFactualAddress();
  console.log("\x1b[33m%s\x1b[0m", `EtherspotWallet address: ${address}`);

  // clear the transaction batch
  await primeSdk.clearUserOpsFromBatch();

  // add transactions to the batch
  const transactionBatch = await primeSdk.addUserOpsToBatch({
    to: recipient,
    value: ethers.utils.parseEther(value),
  });
  console.log("transactions: ", transactionBatch);

  // get balance of the account address
  const balance = await primeSdk.getNativeBalance();

  console.log("balances: ", balance);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await primeSdk.estimate({
    url: "https://arka.etherspot.io/",
    api_key: "arka_public_key",
    context: { mode: "sponsor" },
  });
  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // sign the UserOp and sending to the bundler...
  const uoHash = await primeSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log("Waiting for transaction...");
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while (userOpsReceipt == null && Date.now() < timeout) {
    await sleep(2);
    userOpsReceipt = await primeSdk.getUserOpReceipt(uoHash);
  }
  console.log("\x1b[33m%s\x1b[0m", `Transaction Receipt: `, userOpsReceipt);
}
