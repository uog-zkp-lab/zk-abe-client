# zk-abe-client

This repository creates the UI to interact with smart contract and backend in the zkabe system.

## How to run this app?
 
```bash
npm run dev
```


## Notations

| Abbreviation | Full Term                 |
|--------------|---------------------------|
| FE           | Frontend                  |
| BE           | Backend                   |
| SC           | Smart Contract            |
| DO           | Data Owner                |
| DP           | Data Processor            |
| Tx           | Transaction               |
| H            | Hash Function             |
| SK           | Secret Key                |
| ACP          | Access Control Policy     |
| MTR          | Merkle Tree Root          |

## Spec for frontend: 

1. UI of DP register 
    * (a) DP generate a Merkle Root to register on chain (by reading a json file)
    * (b) Send a tx to register function on smart contract.  
2. UI of DO register            
3. UI of DP requesting data for DO  
    * DP have H(uid) and calls retrieve ACP API > (backend generate proof) > get proof from backend
    * DP sign a transaction mint the token
    * DP use the same wallet address to request the secret key back > get SK (token should also burned) 
