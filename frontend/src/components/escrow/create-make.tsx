'use client'

import { ReactElement, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Account, address } from "gill";
import { useSolana } from "../solana/use-solana";
import * as escrow from "../../../../codama/clients/js/src/generated/index";
import { fetchMetadata, fetchMint, Mint, TokenStandard } from "gill/programs";
import { getMintMetadataMetaplex, isNft, NonFungibleAssetToken } from "@/lib/metaplex";
import { Button } from "../ui/button";

export default function CreateMake() {

  const solana = useSolana();

  const [offerAmount, setOfferAmount] = useState(0);
  const [offerMint, setOfferMint] = useState<Account<Mint>>();

  return <Card>
    <CardHeader>Create Make</CardHeader>
    <CardContent>
      Your offer mint address:
    <Input 
      type="text"
      onChange={async (e) => {
          try{
            const mint = await fetchMint(solana.client.rpc, address(e.target.value));
            setOfferMint(mint);
            const mintMetaplex = await getMintMetadataMetaplex(address(e.target.value));
            const metaplexAcc = await fetchMetadata(solana.client.rpc, mintMetaplex[0]);
            if (metaplexAcc.data.tokenStandard.__option == "Some") {
              switch (metaplexAcc.data.tokenStandard.value) {
                case TokenStandard.NonFungible:
                  const data = (await (await fetch(metaplexAcc.data.data.uri)).json()) as NonFungibleAssetToken;
                  console.log(data);
                  break;
                default:
                  break;
              }
            }
          }
          catch(e) {
            console.log(e)
          }
        }}
        placeholder="ex: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      />
      {offerMint != null ? MintData(offerMint) : <>Mint is null</>}
      <Card> 
        <CardTitle>Mint details</CardTitle>
      </Card>
      <Button 
        onClick={async () => {
          const pk = await getMintMetadataMetaplex(offerMint!.address);

          console.log(pk);
        }}  
      > Click me </Button>
      <img src={"https://gateway.irys.xyz/5vVT2M49ZUvAAnPWokgqoB2L8HsSKq3RwXXvVRCfxcXg"}/>
    </CardContent>
  </Card>
}

function OfferAmount(mint: Account<Mint>): ReactElement {
  return <Input />
}

function MintData(mint: Account<Mint>): ReactElement {
  return <Card>
    <CardTitle>Mint data:</CardTitle>
    <CardContent>Decimals: {mint.data.decimals}</CardContent>
    <CardContent>Supply: {mint.data.supply}</CardContent>
    <CardContent>Can be frozen: {mint.data.freezeAuthority == null ? <>yes</> : <>no</>}</CardContent>
    <CardContent>Can be minted: {mint.data.mintAuthority == null ? <>yes</> : <>no</>}</CardContent>
    <CardContent>Is NFT: {isNft(mint) == null ? <>yes</> : <>no</>}</CardContent>
  </Card>
}

function MetaplexData(mint: Account<Mint>): ReactElement {

  return <Card>

  </Card>;
}
