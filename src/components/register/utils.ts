import { keccak256, stringToHex } from 'viem'

export async function getAttributesHash(
    attributeFile: File,
): Promise<`0x${string}`> {
    try {
        const fileContent = await attributeFile.text()
        const attributes = JSON.parse(fileContent)
        const attributesHex = stringToHex(JSON.stringify(attributes))
        return keccak256(attributesHex)
    } catch (error) {
        console.error('Error processing attributes file:', error)
        throw new Error('Failed to process attributes file')
    }
}
