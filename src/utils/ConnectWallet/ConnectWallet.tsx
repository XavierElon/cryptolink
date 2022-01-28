import React, { useEffect, useState } from 'react'
import './ConnectWallet.css'
import contract from '../../artifacts/contracts/NFTCollectible.sol/NFTCollectible.json'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

declare let window: any

const provider = async () => {
    await detectEthereumProvider()
}

const contractAddress = ""
const abi = contract.abi


const ConnectWallet: React.FunctionComponent<{count: number}> = (props) => {

    const [currentAccount, setCurrentAccount] = useState(null)
    
    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed!")
        } else {
            console.log("Wallet exists. Ready to Go!")
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' })

        if (accounts.length !== 0) {
            const account = accounts[0]
            console.log("Found an authorized account: ", account)
            setCurrentAccount(account)
        } else {
            console.log("No authorized account found")
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

    const mintNftHandler = async () => {
        try {
            const { ethereum } = window

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const nftContract = new ethers.Contract(contractAddress, abi, signer)

                console.log("Initialize payment")

                let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") })

                console.log("Mining... please wait")
                await nftTxn.wait()

                console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
            } else {
                console.log("Ethereum object does not exist")
            }
        } catch (err) {
            console.log(err)
        }
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
                {currentAccount ? mintNftButton() : connectWalletButton()}
            </div>
        </div>
    )
}

export default ConnectWallet