import React, {useCallback, useEffect, useState} from "react";
import {useWallet, useWalletList} from "@meshsdk/react";
import {backendDisconnect, backendGetUser, backendConnect, backendGetOptions} from "../library";
import {Wallet} from "@meshsdk/core";
import {classMap, translateError, trimAddress, ucFirst} from "../library/utils";
import {useAppDispatch, useAppSelector} from "../library/state";
import {
    getUserNetwork,
    getUserState,
    resetUserState,
    setUserAssets,
    setUserBalances,
    setUserCollateral,
    setUserNetwork,
    setUserState
} from "../library/user";
import {getOptionState, setOptionState} from "../library/option";
import {resetMessageState, setMessage} from "../library/message";
import {Loader} from "./common/Loader";

export const Connector = ({}: ComponentConnector) => {

    // APP state

    const dispatch = useAppDispatch()
    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)
    const currentNetwork = useAppSelector(getUserNetwork)

    // Connector state

    const wallets = useWalletList()
    const { connect, disconnect, wallet, name, error, connected  } = useWallet()
    const [hideWalletList, setHideWalletList] = useState<boolean>(true)
    const [mounted, setMounted] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [hideMenu, setHideMenu] = useState<boolean>(true)

    // Helpers

    const onError = (message: string) => {
        dispatch(setMessage({
            message: translateError(message),
            type: 'error'
        }))
        setAuthenticated(false)
        dispatch(resetUserState())
        setLoading(false)
        disconnect()
    }

    // Click handlers

    const onClickButton = () => {
        dispatch(resetMessageState())
        setHideWalletList(!hideWalletList)
    }

    const onClickConnect = async (wallet: Wallet): Promise<void> => {
        setLoading(true)
        try {
            await connect(wallet.name)
            setHideWalletList(true)
        } catch (e: any) {
            onError(e.message)
        }
    }

    const onClickDisconnect = async (): Promise<void> => {
        if (confirm(options?.label_disconnect_prompt)) {
            setLoading(true)
            setHideMenu(true)
            try {
                const disconnectRes = await backendDisconnect(user.nonce)
                if (!disconnectRes.success) {
                    onError(disconnectRes.message)
                } else {
                    dispatch(resetUserState())
                    // Now we have cleared WP cookies reload the page
                    if (options.logout_redirect) {
                        global.window.location.replace(options.logout_redirect)
                    } else {
                        global.window.location.reload()
                    }
                }
            } catch (e: any) {
                onError(e.message)
            }
        }
    }

    // Dependant callbacks

    const mountData = useCallback(async (): Promise<boolean> => {
        try {
            const optionsRes = await backendGetOptions(wpCardanoConnect?.nonce)
            dispatch(setOptionState(optionsRes.data))
            const userRes = await backendGetUser(wpCardanoConnect?.nonce)
            if (userRes.data?.web3?.cardano_connect_network) {
                dispatch(setUserState({
                    connected: true,
                    network: userRes.data.web3?.cardano_connect_network,
                    web3: userRes.data.web3,
                    user: userRes.data.user,
                    account: userRes.data.account,
                    nonce: userRes.nonce,
                }))
                setAuthenticated(true)
            } else {
                setLoading(false)
            }
            setMounted(true)
            return true;
        } catch (e: any) {
            onError(e.message)
            return false;
        }
    }, [])

    const connectWallet = useCallback(async (walletName: string): Promise<boolean> => {
        try {
            await connect(walletName)
            setLoading(false)
            return true
        } catch (e: any) {
            onError(e.message)
            return false
        }
    }, [])

    const signMessage = useCallback(async (message: string): Promise<boolean> => {
        try {
            const networkId = await wallet.getNetworkId();
            const address= await wallet.getChangeAddress();
            const stakeAddress= (await wallet.getRewardAddresses())[0];
            const signature= await wallet.signData(stakeAddress, message);
            const connectRes = await backendConnect({
                nonce: user.nonce || wpCardanoConnect?.nonce,
                message,
                address,
                stakeAddress,
                signature,
                wallet: name,
                network: networkId
            });
            if (!connectRes.success) {
                onError(connectRes.message)
            } else {
                dispatch(setMessage({
                    message: connectRes.message,
                    type: 'success'
                }))
                if (options.login_redirect) {
                    global.window.location.replace(options.login_redirect)
                } else {
                    global.window.location.reload()
                }
                return connectRes.success
            }
        } catch (e: any) {
            onError(e.message)
            return false
        }
    }, [user, wallet, name])

    const checkNetworkState = useCallback(async (checkPrompts = false): Promise<boolean> => {
        try {
            const connectedNetworkId = await wallet.getNetworkId()
            const connectedStakeAddress = (await wallet.getRewardAddresses())[0];
            dispatch(setUserNetwork(connectedNetworkId === 1 ? 'mainnet' : 'testnet'))
            dispatch(setUserAssets(await wallet.getAssets()))
            dispatch(setUserBalances(await wallet.getBalance()))
            dispatch(setUserCollateral(await wallet.getCollateral()))
            let messageReply: string | null = null
            if (!options?.mainnet_active && connectedNetworkId === 1) {
                messageReply = options.label_switch_to_testnet
            }
            if (
                user?.web3 &&
                (
                    connectedNetworkId === 1 && connectedStakeAddress !== user?.web3.cardano_connect_stake_address ||
                    connectedNetworkId !== 1 && connectedStakeAddress !== user?.web3.cardano_connect_stake_address_testnet
                )
            ) {
                messageReply = options.label_invalid_account
            }
            if (checkPrompts) {
                // If mainnet but user has no mainnet address
                if (connectedNetworkId === 1 && !user?.web3?.cardano_connect_address) {
                    messageReply = options.label_create_mainnet_prompt
                }
                // If testnet but user has no testnet address
                if (connectedNetworkId === 0 && !user?.web3?.cardano_connect_address_testnet) {
                    messageReply = options.label_create_testnet_prompt
                }
            }
            if (messageReply) {
                onError(messageReply)
                return false
            }
            return true
        } catch (e) {
            onError(e.message)
            return false
        }
    }, [wallet, options])

    const startSign = useCallback(async (): Promise<boolean> => {
        try {
            const stakeAddress = (await wallet.getRewardAddresses())[0];
            const message = `account: ${stakeAddress}`
            const success = await checkNetworkState()
            if (success) {
                await signMessage(message)
                setLoading(false)
                return true
            }
            return false
        } catch (e) {
            onError(e.message)
            return false
        }
    }, [wallet, checkNetworkState, signMessage])

    // Fetch options and the authenticated user data on mount

    useEffect(() => {
        if (!mounted) {
            mountData().then()
        }
    }, [mounted, mountData]);

    // Check if user is authenticated and try to wallet connect

    useEffect(() => {
        if (!connected && mounted && user.web3?.cardano_connect_wallet) {
            connectWallet(user.web3.cardano_connect_wallet).then()
        }
    }, [mounted, connected, user, connectWallet]);

    // Check network if already authenticated

    useEffect(() => {
        if (connected && !authenticated) {
            startSign().then()
        } else if (connected) {
            checkNetworkState(true)
                .then(() => setLoading(false))
        }
    }, [connected, authenticated]);

    // Respond to Mesh.js wallet errors

    useEffect(() => {
        if (error) {
            let errorSent = false
            const message = error.toString()
            const disconnectMap = [
                'no account set',
                'user declined',
                'user canceled connection'
            ]
            disconnectMap.map(m => {
                if (message.includes(m)) {
                    errorSent = true;
                    onError(message)
                }
            })
            if (!errorSent) {
                dispatch(setMessage({
                    type: 'error',
                    message: translateError((error as any).toString()),
                }))
            }
            setLoading(false)
        }
    }, [error]);

    return (
        <div className={classMap.container}>
            <div className={authenticated ? classMap.connected : classMap.disconnected}>
                <button className={classMap.button} onClick={() => authenticated ? setHideMenu(!hideMenu) : onClickButton()}>
                    <span className={classMap.buttonIcon}></span>
                    {loading ? (
                        <span className={classMap.buttonContent}>
                            <Loader className={'wpcc-loader'} color={'#ffffff'} />
                        </span>
                    ) : (
                        <span className={classMap.buttonContent}>
                            <span className={classMap.buttonText}>
                                {authenticated ? options.label_connected : (hideWalletList ? options?.label_connect : options?.label_connect_cancel)}
                            </span>
                            {authenticated && (<span className={classMap.buttonAddress}>
                                {currentNetwork === 'testnet'
                                    ? trimAddress(user?.web3?.cardano_connect_address_testnet || '')
                                    : trimAddress(user?.web3?.cardano_connect_address || '')}
                            </span>)}
                        </span>
                    )}
                </button>
                {!hideWalletList && (
                    <div className={classMap.list}>
                        {wallets.length > 0 ? (
                            wallets.map((wallet) => (
                                <button
                                    key={wallet.name}
                                    onClick={() => onClickConnect(wallet)}
                                    className={classMap.listButton}
                                >
                                    <img width={26} height={'auto'} src={wallet.icon} alt={wallet.name}/> {ucFirst(wallet.name)}
                                </button>
                            ))
                        ) : (
                            <div className={classMap.listEmpty}>{options?.label_empty}</div>
                        )}
                    </div>
                )}
                {!hideMenu && (
                    <div className={classMap.menu}>
                        <a href={options.login_redirect} title={'Wallet'}>Wallet</a>
                        <div onClick={onClickDisconnect}>{options.label_disconnect}</div>
                    </div>
                )}
            </div>
        </div>
    )
}
