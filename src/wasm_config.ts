let wasmUrl: string

if (typeof window === 'undefined') {
    wasmUrl = 'https://zk-abe-client.vercel.app/pkg/keygen_server_bg.wasm'
} else {
    wasmUrl = '/pkg/keygen_server_bg.wasm'
}

export default wasmUrl
