import React, {useEffect, useState} from "react";
import {useAppSelector} from "../library/state";
import {getUserBalances, getUserCollateral, getUserNetwork, getUserState} from "../library/user";
import {useWalletList} from "@meshsdk/react";
import {classMap, formatBalance, trimAddress, ucFirst} from "../library/utils";
import {Copy} from "./common/Copy";
import {Loader} from "./common/Loader";

export const Balance = ({className}: ComponentBalance) => {

    // APP State

    const user: UserState = useAppSelector(getUserState)
    const network: string = useAppSelector(getUserNetwork)
    const balances: Balance[] = useAppSelector(getUserBalances)
    const collateral: UxTO[] = useAppSelector(getUserCollateral)

    // Local state

    const wallet = useWalletList().find((wallet) => wallet.name === user.web3?.cardano_connect_wallet);
    const [loading, setLoading] = useState<boolean>(true)
    const [filteredBalance, setFilteredBalance] = useState<Balance[]|null>(null)
    const address: string = network === 'testnet' ? user.web3?.cardano_connect_address_testnet : user.web3?.cardano_connect_address
    const stakeAddress: string = network === 'testnet' ? user.web3?.cardano_connect_stake_address_testnet : user.web3?.cardano_connect_stake_address

    // Load data

    useEffect(() => {
        const allowedUnits = ['lovelace']
        if (user.connected && balances) {
            setFilteredBalance(balances.filter(b => allowedUnits.includes(b.unit) ? b : false))
        }
        setLoading(!balances?.length)
    }, [user.connected, balances]);

    return user.connected ? (
        <div className={`${classMap.balanceContainer} ${className}`}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className={classMap.balanceRow}>
                        <div className={classMap.balanceCol}>Address:</div>
                        <div className={classMap.balanceCol}>
                            <Copy text={trimAddress(address)} copyText={address} />
                        </div>
                    </div>
                    <div className={classMap.balanceRow}>
                        <div className={classMap.balanceCol}>Stake Address:</div>
                        <div className={classMap.balanceCol}>
                            <Copy text={trimAddress(stakeAddress)} copyText={stakeAddress} />
                        </div>
                    </div>
                    <div className={classMap.balanceRow}>
                        <div className={classMap.balanceCol}>Network:</div>
                        <div className={classMap.balanceCol}>{network}</div>
                    </div>
                    <div className={classMap.balanceRow}>
                        <div className={classMap.balanceCol}>Wallet:</div>
                        <div className={classMap.row}>
                            <img width={18} height={18} src={wallet.icon} alt={wallet.name}/>
                            {ucFirst(user.web3.cardano_connect_wallet)}
                        </div>
                    </div>
                    {collateral?.length ? (
                        <div className={classMap.balanceRow}>
                            <div className={classMap.balanceCol}>Wallet collateral:</div>
                            <div className={classMap.balanceCol}>
                                {collateral?.map((col: UxTO) => {
                                    return col.output?.amount?.map((out) => (
                                        <div key={out.unit + out.quantity}>₳ {formatBalance(out.quantity)}</div>
                                    ))
                                })}
                            </div>
                        </div>
                    ) : null}
                    <div className={classMap.balanceTotalRow}>
                        <div className={classMap.balanceCol}>Balance:</div>
                        {filteredBalance?.map((balance: Balance) => (
                            <div key={balance.unit + balance.quantity} className={classMap.balanceCol}>₳ {formatBalance(balance.quantity)}</div>
                        ))}
                    </div>
                </>
            )}
        </div>
    ) : null
}
