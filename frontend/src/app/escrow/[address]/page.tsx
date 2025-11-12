'use client'
import { assertIsAddress } from 'gill'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { AppHero } from '@/components/app-hero'
import { ellipsify } from '@/lib/utils'

import { AccountUiBalance } from '@/features/account/ui/account-ui-balance'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { AccountUiTokens } from '@/features/account/ui/account-ui-tokens'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CreateMake from '@/components/escrow/create-make'

export default function AccountFeatureDetail() {
  const params = useParams()
  const address = useMemo(() => {
    if (!params.address || typeof params.address !== 'string') {
      return
    }
    assertIsAddress(params.address)
    return params.address
  }, [params])
  if (!address) {
    return <div>Error loading account</div>
  }

  return (
    <div>
      <AppHero
        title={<AccountUiBalance address={address} />}
        subtitle={
          <div className="my-4">
            <AppExplorerLink address={address.toString()} label={ellipsify(address.toString())} />
          </div>
        }
      >
      </AppHero>
      <div className="space-y-8">
        <AccountUiTokens address={address} />
      </div>
      <div className='space-y-8'>
        <CreateMake/>
        <Table> 
          <TableCaption>This is my first table</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {<TableCell>Cell 1</TableCell>}
              {<TableCell>Cell 2</TableCell>}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
