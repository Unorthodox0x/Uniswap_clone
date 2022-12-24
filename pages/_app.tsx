import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {NavBar} from "../Components/index";
import {WalletProvider} from "../Context/WalletContext";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div>
    <WalletProvider>
      <NavBar />
      <Component {...pageProps} />
    </WalletProvider>
  </div>
);

export default MyApp;