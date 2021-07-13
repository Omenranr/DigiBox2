import { useWallet, UseWalletProvider } from 'use-wallet'
import React from 'react'
import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

function Connection() {
    const wallet = useWallet()

    return (
            <div className="btn-meta">
              {wallet.status === 'connected' ? (
                <div className="display-meta">
                  <div >Account: {wallet.account}</div>
                  <div>Balance: {wallet.balance} wei</div>
                  <Button color="primary" onClick={() => wallet.reset()}>Disconnect</Button>
                </div>
              ) : (
                <div>
                  <Button onClick={() => wallet.connect()}>MetaMask</Button>
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