let wasmUrl: string

if (typeof window === 'undefined') {
    wasmUrl = 'http://localhost:3000/pkg/keygen_server_bg.wasm'
} else {
    wasmUrl = '/pkg/keygen_server_bg.wasm'
}

export default wasmUrl
