'use client'

import { useAccount, useConnect, useDisconnect, useWriteContract, useReadContract } from 'wagmi'
import { pdtk } from '@/contract'
import { Box, Button, Container } from '@mui/material';
import { readContract } from '@wagmi/core'
import { config } from './providers';
import { useState } from 'react';

const abi = pdtk.abi

function Home() {
  const [balance, setBalance] = useState<any>()
  const tokenId = '0x' + BigInt(10).toString(16)
  const { data: hash, isPending, isError, writeContractAsync } = useWriteContract();
  // const { data: balance } = useReadContract({
  //   address: '0x39f6464b501A0150994963F25a9557D7D953E224',
  //   functionName: 'balanceOf',
  //   args: ['0x1f0a4f6Acc839b0273BDB06d17A8e8C182C07cfB', tokenId]
  // })


  async function mint() {
    const abi = pdtk.abi
    const data = '0x' + BigInt('0x00').toString(16)
    await writeContractAsync({
      address: '0x39f6464b501A0150994963F25a9557D7D953E224',
      abi,
      functionName: 'mint',
      args: [tokenId, data]
    })
  }

  async function balanceOf() {
    const b = await readContract(config, {
      abi,
      address: '0x39f6464b501A0150994963F25a9557D7D953E224',
      functionName: 'balanceOf',
      args: ['0x1f0a4f6Acc839b0273BDB06d17A8e8C182C07cfB', tokenId]
    })
    if (b) {
      setBalance(b)
    }
  }

  return (
    <Container fixed>
        <Button onClick={() => mint()}>Mint</Button>
        { hash ? <div>{`https://sepolia.arbiscan.io/tx/${hash}`}</div> : <div></div>}
        <Button onClick={() => balanceOf()}>Get Balance</Button>
        { balance ? <div>{ balance?.toString() } </div> :  <div>========</div>}
        
    </Container>
  )
}

export default Home
