import React, {useEffect, useState} from "react";
import {useAppSelector} from "../library/state";
import {getUserBalances, getUserCollateral, getUserNetwork, getUserState} from "../library/user";
import {useWalletList} from "@meshsdk/react";
import {trimAddress} from "../library/utils";

export const Balance = ({
    loader = 'Loading...',
    classMap = {
        container: 'balance-container',
        errorContainer: 'balance-error',
        loader: 'wpcc-loader',
        row: 'balance-row',
        col: 'balance-col',
        total: 'balance-total',
        cost: 'balance-cost',
    }
}: ComponentBalance) => {
    const user: UserState = useAppSelector(getUserState)
    const network = useAppSelector(getUserNetwork)
    const balances: Balance[] = useAppSelector(getUserBalances)
    const collateral: UxTO[] = useAppSelector(getUserCollateral)
    const wallet = useWalletList().find((wallet) => wallet.name === user.web3?.cardano_connect_wallet);

    // Connector state

    const [errorText, setErrorText] = useState<string|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [filteredBalance, setFilteredBalance] = useState<Balance[]|null>(null)
    const allowedUnits = ['lovelace']

    // Helpers

    const formatBalance = (quantity: string) => {
        const formatted = parseInt((parseInt(quantity, 10) / 1_00).toString(), 10)
        return formatted.toString().slice(0, -4) + '.' + formatted.toString().slice(-4)
    }

    // Click handlers

    function onClickError() {
        setErrorText(null)
    }

    // Load data

    useEffect(() => {
        if (balances) {
            setFilteredBalance(balances.filter(b => allowedUnits.includes(b.unit) ? b : false))
        }
        setLoading(!balances?.length)
    }, [balances]);

    return user.connected ? (
        <div className={classMap.container}>
            {loading ? (
                <span className={classMap.loader}>
                    {loader}
                </span>
            ) : (
                <div>
                    <div className={classMap.row}>
                        <div className={classMap.col}>User ID:</div>
                        <div className={classMap.col}>{user.user.ID}</div>
                    </div>
                    <div className={classMap.row}>
                        <div className={classMap.col}>Address:</div>
                        <div
                            className={classMap.col}>{trimAddress(network === 'testnet' ? user.web3.cardano_connect_address_testnet : user.web3.cardano_connect_address)}</div>
                    </div>
                    <div className={classMap.row}>
                        <div className={classMap.col}>Stake Address:</div>
                        <div
                            className={classMap.col}>{trimAddress(network === 'testnet' ? user.web3.cardano_connect_stake_address_testnet : user.web3.cardano_connect_stake_address)}</div>
                    </div>
                    <div className={classMap.row}>
                        <div className={classMap.col}>Network:</div>
                        <div className={classMap.col}>{network}</div>
                    </div>
                    <div className={classMap.row}>
                        <div className={classMap.col}>Wallet:</div>
                        <div className={classMap.col}>
                            <img width={26} height={26} src={wallet.icon} alt={wallet.name}/>
                            {user.web3.cardano_connect_wallet}
                        </div>
                    </div>
                    {collateral?.length ? (
                        <div className={classMap.row}>
                            <div className={classMap.col}>Wallet collateral:</div>
                            <div className={classMap.cost}>
                                {collateral?.map((col: UxTO) => {
                                    return col.output?.amount?.map((out) => (
                                        <div key={out.unit + out.quantity}>₳ {formatBalance(out.quantity)}</div>
                                    ))
                                })}
                            </div>
                        </div>
                    ) : null}
                    <div className={classMap.row}>
                        <div className={classMap.col}>Wallet Balance:</div>
                        {filteredBalance?.map((balance: Balance) => (
                            <div key={balance.unit + balance.quantity} className={classMap.total}>₳ {formatBalance(balance.quantity)}</div>
                        ))}
                    </div>
                    {errorText && <div className={classMap.errorContainer} onClick={onClickError}>{errorText}</div>}
                </div>
            )}
        </div>
    ) : null
}
