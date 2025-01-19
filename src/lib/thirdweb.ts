import {
  createThirdwebClient,
  getContract,
  prepareContractCall,
  sendTransaction,
} from "thirdweb";
import { optimismSepolia } from "thirdweb/chains";
import { privateKeyToAccount } from "thirdweb/wallets";

if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID) {
  throw new Error(
    "NEXT_PUBLIC_THIRDWEB_CLIENT_ID environment variable is required."
  );
}

export const twClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export const twSecretClient = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY!,
});

const personalAccount = privateKeyToAccount({
  client: twSecretClient,
  privateKey: process.env.ADMIN_PRIVATE_KEY!,
});

console.log("Personal account address:", personalAccount.address);

export async function erc1155MintTo(
  contractAdress: string,
  to: string,
  tokenId: number,
  amount: number = 1,
  uri: string = ""
) {
  const contract = getContract({
    client: twClient,
    chain: CHAIN,
    address: contractAdress,
  });

  const tx = prepareContractCall({
    contract,
    method:
      "function mintTo(address to, uint256 tokenId, string uri, uint256 amount)",
    params: [personalAccount.address, BigInt(tokenId), uri, BigInt(amount)],
  });

  const txResult = await sendTransaction({
    transaction: tx,
    account: personalAccount,
  });

  return txResult;
}

export const CHAIN = optimismSepolia;
