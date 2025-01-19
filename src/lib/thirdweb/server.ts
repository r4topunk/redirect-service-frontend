import { CHAIN } from "@/constants";
import {
  createThirdwebClient,
  getContractEvents,
  prepareContractCall,
  prepareEvent,
  sendTransaction,
  getContract as twGetContract,
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

export const getContract = (address: string) => {
  return twGetContract({
    client: twClient,
    chain: CHAIN,
    address,
  });
};

export async function erc1155MintTo(
  contractAdress: string,
  to: string,
  tokenId: number,
  amount: number = 1,
  uri: string = ""
) {
  const contract = getContract(contractAdress);

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
