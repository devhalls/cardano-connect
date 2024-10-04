import {classMap, formatNumberShort, trimAddress} from "../library/utils";

export const PoolGraph = ({
    plot,
    hide,
} : GraphToolTip<PoolData>) => {
    return (
        <div>
            <span className={classMap.plotClose} onClick={() => hide()}></span>
            <div>ID: {trimAddress(plot?.id || '-')}</div>
            <div>Pledge: {formatNumberShort(plot?.y || 0, undefined, 2)}</div>
            <div>Stake: {formatNumberShort(plot?.x || 0, undefined, 2)}</div>
            <div>{plot?.data?.blocks_minted}</div>
        </div>
    )
}