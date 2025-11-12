'use client'

import { ReactElement, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Account, Address, address, getProgramDerivedAddress } from "gill";
import { useSolana } from "../solana/use-solana";
import * as escrow from "../../../../codama/clients/js/src/generated/index";
import { fetchMint, fetchToken, Mint } from "gill/programs";
import { isNft } from "@/lib/metaplex";

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
            const mintMetaplex = getProgramDerivedAddress({
              programAddress: address(""), 
              seeds: []
            });
            console.log(mint);
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
    </CardContent>
  </Card>
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
