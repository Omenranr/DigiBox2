import { useWallet, UseWalletProvider } from 'use-wallet'
import React from 'react'
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Meta.css";

function Connection() {
    const wallet = useWallet()
    return (
            <div className="btn-meta">
              {wallet.status === 'connected' ? (
                <div className="display-meta">
                  <div className="accounts">Account: {wallet.account}</div>
                  <div className="balance">Balance: {wallet.balance} wei</div>
                </div>
              ) : (
                <div>
                  <Button onClick={() => wallet.connect()}>Connect to MetaMask</Button>
                </div>
              )}
            </div>
          )
}

// Wrap everything in <UseWalletProvider />
export default () => (
    <UseWalletProvider
      chainId={1337}
      connectors={{
        // This is how connectors get configured
        provided: {provider: window.cleanEthereum},
      }}
    >
      <Connection />
    </UseWalletProvider>
  )