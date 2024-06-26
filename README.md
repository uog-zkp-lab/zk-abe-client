# zk-abe-client

This repository provides the UI for interacting with the smart contract and backend in the zk-ABE (Zero-Knowledge Attribute-Based Encryption) system.

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

The frontend consists of several UIs to facilitate interactions between the Data Processor (DP), Data Owner (DO), and the smart contract.

1.DP Registration UI

  Generate Merkle Root: The DP generates a Merkle Root by reading a JSON file.
  Register on Chain: The DP sends a transaction to the smart contract to register the Merkle Root on the blockchain.

2. DO Registration UI
   Provides an interface for the Data Owner to register on the system.

3. DP Requesting Data for DO UI

  a. Retrieve ACP: The DP, given a hashed UID (H(uid)), calls the backend API to retrieve the Access Control Policy (ACP), which includes generating a proof.
  b. Mint Token: The DP signs a transaction to mint a token using the retrieved proof.
  c.Request Secret Key: The DP uses the same wallet address to request the secret key (SK) from the backend, ensuring the token is burned in the process.
