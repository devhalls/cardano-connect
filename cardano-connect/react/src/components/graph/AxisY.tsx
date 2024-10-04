import { useMemo } from "react";
import { ScaleLinear } from "d3";

type AxisLeftProps = {
    yScale: ScaleLinear<number, number>
    width: number
    tick: GraphTick
    label?: GraphLabel
    color?: string
};

export const AxisY = ({
    yScale,
    width,
    tick = { spacing: 40, length: 10},
    label,
    color = '#D2D7D3'
} : AxisLeftProps) => {

    const range = yScale.range();
    const ticks = useMemo(() => {
        const height = range[0] - range[1];
        const numberOfTicksTarget = Math.floor(height / tick.spacing);
        return yScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            yOffset: yScale(value),
        }));
    }, [yScale]);

    return (
        <>

            {label ? (
                <text
                    style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAnchor: "middle",
                        transform: ` rotate(-90deg) translateX(${label?.position?.x || '0px'}) translateY(${label?.position?.y || '0px'})`,
                        fill: label?.color || color,
                    }}
                >
                    {label?.format ? label.format(label.label) : label.label}
                </text>
            ) : null}
            {ticks.map(({ value, yOffset }) => (
                <g
                    key={value}
                    transform={`translate(0, ${yOffset})`}
                    shapeRendering={"crispEdges"}
                >
                    <line
                        x1={-tick.length}
                        x2={width + tick.length}
                        stroke={color}
                        strokeWidth={0.5}
                    />
                    <text
                        key={value}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateX(-20px)",
                            fill: tick?.color || color,
                        }}
                    >
                        {tick?.format ? tick.format(value) : value}
                    </text>
                </g>
            ))}
        </>
    );
};