"use client";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: "demo",

    // Required
    appName: "You Create Web3 Dapp",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="dark">
          <ChakraProvider>
            <body style={{ margin: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                <Navbar />
                <main style={{ flex: "1" }}>{children}</main>
                <Footer />
              </div>
            </body>
          </ChakraProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </html>
  );
}
