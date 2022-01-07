import React from 'react';
import alfajorSmile from './alfajor-smile.png';
import './App.css';

import detectEthereumProvider from '@metamask/detect-provider';

const ALFAJORES_PARAMS = {
  chainId: '0xaef3',
  chainName: 'Alfajores Testnet',
  nativeCurrency: { name: "Alfajores Celo", symbol: 'A-CELO', decimals: 18 },
  rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
  blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org/'],
  iconUrls: ['future'],
};

async function startApp(provider: any) {
  if (provider !== window.ethereum) {
   return console.error('Do you have multiple wallets installed?');
  }
  console.log('window.ethereum', window.ethereum);
  const res = await provider.request({
    method: 'wallet_addEthereumChain',
    params: [ALFAJORES_PARAMS],
  });
  console.log('res', res);

  const resWatch = await provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
        'symbol': 'cUSD',
        decimals: 18,
      },
      iconUrls: ['future'],
    },
  });
  console.log('resWatch', resWatch);
}

function App() {

  function addTestnet() {
    detect();
  }

  return (
    <div className="App">
      <header>
        <img src={alfajorSmile} className="App-logo" alt="logo" />
      </header>
      <button onClick={() => addTestnet()}>Add Testnet</button>
    </div>
  );
}

const detect = async() => {
  const provider = await detectEthereumProvider();
  if (provider) {
    await startApp(provider);
  } else {
    console.log('Please install MetaMask!');
  }
};

export default App;
