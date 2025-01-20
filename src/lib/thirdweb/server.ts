import { CHAIN } from "@/constants";
import {
  createThirdwebClient,
  getContractEvents,
  prepareContractCall,
  prepareEvent,
  readContract,
  sendTransaction,
  getContract as twGetContract,
} from "thirdweb";
import { mintTo } from "thirdweb/extensions/erc1155";
import { resolveScheme } from "thirdweb/storage";
import { privateKeyToAccount } from "thirdweb/wallets";

export const twClient = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY!,
});

const personalAccount = privateKeyToAccount({
  client: twClient,
  privateKey: process.env.ADMIN_PRIVATE_KEY!,
});

export const getContract = (address: string) => {
  return twGetContract({
    client: twClient,
    chain: CHAIN,
    address,
  });
};

export async function mintNewPoap(contractAddress: string) {
  const contract = getContract(contractAddress);
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const nextTokenIdToMint = await readContract({
        contract,
        method: "function nextTokenIdToMint() view returns (uint256)",
        params: [],
      });
      console.log(
        `Attempt ${attempt} - Next token ID to mint:`,
        nextTokenIdToMint
      );

      const uri = resolveScheme({
        uri: "ipfs://QmcsiArAmBbjjMgnGj2eYV5NqHLkngW6764cDdXUmEAHd5/matrix%20copy.jpeg",
        client: twClient,
      });

      const tx = mintTo({
        contract,
        to: personalAccount.address,
        supply: BigInt(0),
        nft: {
          name: "Matrix",
          description: "This is Matrix",
          image: uri,
        },
      });

      const txResult = await sendTransaction({
        transaction: tx,
        account: personalAccount,
      });
      return {
        txHash: txResult.transactionHash,
        tokenId: Number(nextTokenIdToMint),
      };
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt === maxAttempts) {
        return { txHash: null, tokenId: null };
      }
      // Wait for 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return { txHash: null, tokenId: null }; // Default return for unexpected cases
}

export async function erc1155MintTo(
  contractAdress: string,
  to: string,
  tokenId: number,
  amount: number = 1,
  uri: string = ""
) {
  console.log(`Minting token ${tokenId} to ${to} (amount: ${amount})`);
  const contract = getContract(contractAdress);
  console.log(`Using contract at address: ${contractAdress}`);

  const tx = prepareContractCall({
    contract,
    method:
      "function mintTo(address to, uint256 tokenId, string uri, uint256 amount)",
    params: [to, BigInt(tokenId), uri, BigInt(amount)],
  });
  console.log("Transaction prepared");

  const txResult = await sendTransaction({
    transaction: tx,
    account: personalAccount,
  });
  console.log(`Transaction completed with hash: ${txResult.transactionHash}`);

  return txResult;
}

export async function erc1155MintEvents(
  contractAdress: string,
  fromBlock: number
) {
  const myEvent = prepareEvent({
    signature:
      "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
  });

  const contract = getContract(contractAdress);

  const events = await getContractEvents({
    contract,
    fromBlock: BigInt(fromBlock),
    events: [myEvent],
  });

  return events;
}
