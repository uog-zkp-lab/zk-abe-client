'use client'

import { useEffect, useState } from 'react'
import init, {
    generate_public_key,
    encrypt,
    keygen,
    decrypt,
    setup,
} from '@/pkg'

export default function TestPage() {
    useEffect(() => {
        init()
    }, [])

    const testGeneratePublicKey = () => {
        try {
            const publicKey = generate_public_key()
            console.log('Generated Public Key:', publicKey)
        } catch (error) {
            console.error('Error generating public key:', error)
        }
    }

    const testEncrypt = () => {
        try {
            const publicKey = generate_public_key()
            const policy = `(("Role:Doctor" and "Department:Oncology") or ("Role:Nurse" and "Age>=30")) or ("Role:Researcher" and "Passed:DataSecurityTraining") or ("Role:Intern" or "Age<25")`

            const plaintext = new TextEncoder().encode('Secret message')
            const ciphertext = encrypt(publicKey, policy, plaintext)
            console.log('Encrypted Ciphertext:', ciphertext)
        } catch (error) {
            console.error('Error encrypting:', error)
        }
    }

    const testKeygen = () => {
        try {
            const setupKeys = setup()
            const pk = setupKeys[0]
            const msk = setupKeys[1]
            const attributes = ['admin', 'finance']
            const secretKey = keygen(pk, msk, JSON.stringify(attributes))
            console.log('Generated Secret Key:', secretKey)
        } catch (error) {
            console.error('Error generating secret key:', error)
        }
    }

    const testDecrypt = () => {
        try {
            const setupKeys = setup()
            const pk = setupKeys[0]
            const msk = setupKeys[1]
            const policy = '"admin" AND "finance"'
            const plaintext = new TextEncoder().encode('Secret message')
            const ciphertext = encrypt(pk, policy, plaintext)
            console.log(ciphertext)

            const attributes = ['admin', 'finance']
            const secretKey = keygen(pk, msk, JSON.stringify(attributes))
            console.log(secretKey)

            const decrypted = decrypt(secretKey, ciphertext)
            const decryptedText = new TextDecoder().decode(decrypted)
            console.log('Decrypted Text:', decryptedText)
        } catch (error) {
            console.error('Error decrypting:', error)
        }
    }

    const testDecrypt2 = () => {
        try {
            const setupKeys = setup()
            const pk = setupKeys[0]
            const msk = setupKeys[1]

            // Policy for encryption
            // const policy = `(\"Role:Doctor\" and \"Department:Oncology\")`
            const policy = '("ASDF" and "QWER") and "C"'
            const plaintext = new TextEncoder().encode('Secret message')
            const ciphertext = encrypt(pk, policy, plaintext)
            // console.log('Ciphertext:', ciphertext)

            // Test successful decryption
            const passedAttributes = ['ASDF', 'QWER', 'C']
            const passedSecretKey = keygen(
                pk,
                msk,
                JSON.stringify(passedAttributes),
            )
            console.log('Passed Secret Key:', passedSecretKey)

            const decrypted = decrypt(passedSecretKey, ciphertext)
            const decryptedText = new TextDecoder().decode(decrypted)
            console.log('Decrypted Text (Should succeed):', decryptedText)

            // // Test failed decryption
            // const failedAttributes = ['Role:Doctor', 'Department:Surgery']
            // const failedSecretKey = keygen(
            //     pk,
            //     msk,
            //     JSON.stringify(failedAttributes),
            // )
            // console.log('Failed Secret Key:', failedSecretKey)

            try {
                // const failedDecrypted = decrypt(failedSecretKey, ciphertext)
                console.log('This should not be reached')
            } catch (decryptError) {
                console.log('Decryption failed as expected:', decryptError)
            }
        } catch (error) {
            console.error('Error in decryption test:', error)
        }
    }

    return (
        <div>
            <h1>WASM Keygen Server Test</h1>
            <button onClick={testGeneratePublicKey}>
                Test Generate Public Key
            </button>
            <button onClick={testEncrypt}>Test Encrypt</button>
            <button onClick={testKeygen}>Test Keygen</button>
            <button onClick={testDecrypt}>Test Decrypt</button>
            <button onClick={testDecrypt2}>Test Decrypt 2</button>
        </div>
    )
}
