import { Account, address, Address, getAddressEncoder, getProgramDerivedAddress, ProgramDerivedAddress } from "gill";
import { Mint } from "gill/programs";
import { Url } from "url";
const MPL_TOKEN_METADATA_PROGRAM_ID = address("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

enum TokenStandard { 
  NonFungible = 0,
  FungibleAsset = 1,
  Fungible = 2,
  NonFungibleEdition = 3,
  ProgrammableNonFungible = 4,
};
type FungibleToken = { 
  name: string;
  symbol: string;
  description: string;
  image: Url;
};
type FungibleAssetToken = { 
  name: string;
  description: string;
  image: Url;
  animation_url?: Url;
  external_url?: Url;
  attributes?: [{trait_type: string; value: any;}]
  properties?: {
    files: [{uri: Url; type: string; cdn?: boolean;}];
    category: string;
  }
};
type NonFungibleAssetToken = {
  name: string;
  description: string;
  image: Url;
  animation_url: Url;
  external_url: Url;
  attributes?: [{trait_type: string; value: any;}]
  properties?: {
    files: [{uri: Url; type: string; cdn?: boolean;}]
    category: string;
  }
};
type ProgrammableNonFungibleAssettToken = {
  name: string;
  description: string;
  image: Url;
  animation_url: Url;
  external_url: Url;
  attributes?: [{trait_type: string; value: any;}]
  properties?: {
    files: [{uri: Url; type: string; cdn?: boolean;}]
    category: string;
  }
};
export async function getMintMetadataMetaplex(mint: Address<string>): Promise<ProgramDerivedAddress> {

  return await getProgramDerivedAddress({
    programAddress: MPL_TOKEN_METADATA_PROGRAM_ID,
    seeds: [
      Buffer.from("metadata", "utf8"),
      getAddressEncoder().encode(MPL_TOKEN_METADATA_PROGRAM_ID),
      getAddressEncoder().encode(mint),
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

export type { TokenStandard, FungibleToken, FungibleAssetToken, NonFungibleAssetToken, ProgrammableNonFungibleAssettToken }
