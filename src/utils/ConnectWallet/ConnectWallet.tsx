import React, { useEffect } from 'react'
import './ConnectWallet.css'
import contract from '../../artifacts/contracts/NFTCollectible.sol/NFTCollectible.json'


const contractAddress = ""
const abi = contract.abi


const ConnectWallet: React.FunctionComponent<{count: number}> = (props) => {

    const checkWalletIsConnected = () => {

    }

    const connectWalletHandler = () => {

    }

    const mintNftHandler = () => {

    }

    const connectWalletButton = () => {
        return (
            <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>Connect Wallet</button>
        )
    }

    const mintNftButton = () => {
        return (
            <button onClick={mintNftHandler} className='cta-button mint-nft-button'>Mint NFT</button>
        )
    }

    useEffect(() => {
        checkWalletIsConnected()
    }, [])


    return (
        <div>
            <h1>Mint ID NFT</h1>
            <div>
                {connectWalletButton()}
            </div>
        </div>
    )
}

export default ConnectWallet