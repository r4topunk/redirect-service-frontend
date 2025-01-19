import { CHAIN } from "@/constants";
import {
  createThirdwebClient,
  getContract,
  prepareContractCall,
  sendTransaction,
} from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";

export const twClient = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY!,
});

const personalAccount = privateKeyToAccount({
  client: twClient,
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
