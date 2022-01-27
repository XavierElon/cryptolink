import React, { useEffect, useState } from 'react'
import './ConnectWallet.css'
import contract from '../../artifacts/contracts/NFTCollectible.sol/NFTCollectible.json'
import detectEthereumProvider from '@metamask/detect-provider'
declare let window: any

const provider = async () => {
    await detectEthereumProvider()
}

const contractAddress = ""
const abi = contract.abi


const ConnectWallet: React.FunctionComponent<{count: number}> = (props) => {

    const [currentAccount, setCurrentAccount] = useState(null)
    
    const checkWalletIsConnected = () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!")
        } else {
            console.log("Wallet exists. Ready to Go!")
        }
    }

    const connectWalletHandler = async () => {
        const { ethereum } = window

        if (!ethereum) {
            alert("Please install Metamask")
        }

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
            console.log("Found an account! Address: ", accounts[0])
            setCurrentAccount(accounts[0])
        } catch (err) {
            console.log(err)
        }
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