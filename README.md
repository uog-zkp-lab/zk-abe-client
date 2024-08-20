# What is this?

This is a client-side web application for a decentralised ZK-ABE system. This includes a server that generates the public key and master secret key, and also with a codebase for encryption, secret key generation, and decryption.

The [codebase for the ABE system] we are using is derived from the `rabe` library, specifically focusing on the cipher text attribute-based encryption scheme proposed by [BSW] (John Bethencourt, Amit Sahai, Brent Waters).

---

## Local test

The following are for who want to execute the program in their local machine.

### Prepare environment

1. Make sure `rust` and `cargo` are all installed in your machine
2. Set up an account in `supabase`, which is used to store public key and master secret key.
3. Create a table in `supabase` called `keys`. And create 2 columns (`public_key` and `master_secret_key`) in this table.

![Fig1](https://i.imgur.com/jIx0Gec.png)
_fig. 1 creation of two columns: `public_key` and `master_secret_key`_

### Setting up public key and master secret key

> This step should be conducted by the maintainer of key generator server.

The first step is to generate a public key and master secret key for the user to encrypt data, generate secret key and decrypt cipher text.

Since the codebase we are using is a `Rust` library, we have to convert them into web assembly language, which would be compiled into the form that our browser is able to read.

Turn on the terminal and make sure you are in the root of this directory.

1. Run `cd keygen_server`
2. Run `cp .env.example .env` and fill in the information (supabase URL and public anon API key, see fig. 2)
3. Run `wasm-pack build --target web` to build `wasm`
4. Run `cargo run` to generate public key and master secret key in your database

![Fig2](https://i.imgur.com/PuuGeQw.png)
_fig. 2 Supabase URL and anon/public API key_

### Running Web Page

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

[BSW]: https://eprint.iacr.org/2008/290.pdf
[codebase for the ABE system]: https://github.com/Fraunhofer-AISEC/rabe/blob/master/src/schemes/bsw/mod.rs
