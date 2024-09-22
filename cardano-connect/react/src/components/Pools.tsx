import React, {useEffect} from "react";
import {classMap, filterPaginatedRange, translateError} from "../library/utils";
import {backendGetPools} from "../library";
import {Paginator} from "./common/Paginator";
import {Pool as PoolComponent} from "./Pool";
import {useWallet} from "@meshsdk/react";
import {Transaction} from "@meshsdk/core";
import {useAppDispatch, useAppSelector} from "../library/state";
import {getUserState} from "../library/user";
import {getOptionState} from "../library/option";
import {setMessage} from "../library/message";

export const Pools = ({
    whitelistString = null,
    perPage = 10, // Set to 0 to disable pagination
    notFound
}: ComponentPools) => {

    // APP State

    const dispatch = useAppDispatch()
    const user: UserState = useAppSelector(getUserState)
    const options: OptionState = useAppSelector(getOptionState)
    const { connect, wallet, connected} = useWallet()

    const getPools = async (page: number, perPage: number) => {
        if (whitelistString) {
            const poolIds = whitelistString?.length ? whitelistString.split('\n').map(a => a.trim()) : []
            const formatted: Pool[] = poolIds.map(p => {
                return {pool_id: p}
            })
            return {
                total: formatted.length,
                items: filterPaginatedRange(formatted, page, perPage)
            }
        }
        const data = await backendGetPools({
            nonce: wpCardanoConnect?.nonce,
            page,
            perPage
        })
        return data.data
    }

    const delegateStake = async (poolId: string) => {
        if (!connected || !wallet) {
            return
        }
        try {
            const rewardAddress = user.account?.stake_address;
            const tx = new Transaction({ initiator: wallet });
            if (!user.account.active) {
                tx.registerStake(rewardAddress);
            }
            tx.delegateStake(rewardAddress, poolId);
            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);
        } catch (e) {
            dispatch(setMessage({
                message: translateError(e.toString()),
                type: 'error',
                timeout: 16000
            }))
        }
    }

    // Connect mesh provider if not already connected.

    useEffect(() => {
        if (!connected && user?.web3?.cardano_connect_wallet) {
            connect(user.web3.cardano_connect_wallet).then()
        }
    }, [user?.web3?.cardano_connect_wallet]);

    return (
        <Paginator
            className={classMap.pools}
            perPage={perPage}
            fetcher={getPools}
            notFound={notFound || options.label_no_pools}
            renderer={(p: Pool, i: number) =>
                <PoolComponent key={p.pool_id} poolId={p.pool_id} index={i} delegateStake={delegateStake}/>
            }
        />
    )
}
