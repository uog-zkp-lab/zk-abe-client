import { keccak256, encodeAbiParameters, parseAbiParameters } from 'viem'

export async function getAttributesHash(
    attributeFile: File,
): Promise<`0x${string}`> {
    try {
        const fileContent = await attributeFile.text()
        const attributes = JSON.parse(fileContent)
        // convert attributes to string
        const attributesString = convertAttributes(attributes)

        // abi.encode
        const encodedAttributes = encodeAbiParameters(
            parseAbiParameters('string'),
            [attributesString],
        )
        return keccak256(encodedAttributes)
    } catch (error) {
        console.error('Error processing attributes file:', error)
        throw new Error('Failed to process attributes file')
    }
}

export function convertAttributes(attributes: {
    attributes: {
        name: string
        value: string
    }[]
}): string {
    return JSON.stringify(attributes)
}
