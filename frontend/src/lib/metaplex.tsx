import { Account, address, Address, getProgramDerivedAddress, ProgramDerivedAddress } from "gill";
import { Mint } from "gill/programs";
const MPL_TOKEN_METADATA_PROGRAM_ID = address("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

export function getMintMetadataMetaplex(mint: Address): Promise<ProgramDerivedAddress> {
  return getProgramDerivedAddress({
    programAddress: MPL_TOKEN_METADATA_PROGRAM_ID,
    seeds: [
      Buffer.from("metadata", "utf8"),
      Buffer.from(MPL_TOKEN_METADATA_PROGRAM_ID),
      Buffer.from(mint),
    ]
  });
}
export function getMintMasterMetaplex(mint: Address): Promise<ProgramDerivedAddress> {
  return getProgramDerivedAddress({
    programAddress: MPL_TOKEN_METADATA_PROGRAM_ID,
    seeds: [
      Buffer.from("metadata", "utf8"),
      Buffer.from(MPL_TOKEN_METADATA_PROGRAM_ID),
      Buffer.from(mint),
      Buffer.from("edition", "utf8"),
    ]
  });
}
export function isNft(mint: Account<Mint>): boolean {
  console.log(mint.data.mintAuthority);
  return mint.data.decimals === 1 && mint.data.supply === BigInt(1) && mint.data.mintAuthority === null;
}
