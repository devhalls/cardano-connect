import { useMemo } from "react";
import { ScaleLinear } from "d3";

type AxisXComponent = {
    xScale: ScaleLinear<number, number>
    height: number
    tick: GraphTick
    label?: GraphLabel
    color?: string
};

export const AxisX = ({
    xScale,
    height,
    tick = { spacing: 40, length: 6 },
    label,
    color = '#D2D7D3'
}: AxisXComponent) => {

    const range = xScale.range();
    const ticks = useMemo(() => {
        const width = range[1] - range[0];
        const numberOfTicksTarget = Math.floor(width / tick.spacing);
        return xScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            xOffset: xScale(value),
        }));
    }, [xScale]);

    return (
        <>
            <path
                d={["M", range[0], 0, "L", range[1], 0].join(" ")}
                fill="none"
                stroke="currentColor"
            />
            {label ? (
                <text
                    style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAnchor: "middle",
                        transform: `translateX(${label?.position?.x || '0px'}) translateY(${label?.position?.y || '0px'})`,
                        fill: label?.color || color,
                    }}
                >
                    {label?.format ? label.format(label.label) : label.label}
                </text>
            ) : null}
            {ticks.map(({ value, xOffset }) => (
                <g
                    key={value}
                    transform={`translate(${xOffset}, 0)`}
                    shapeRendering={"crispEdges"}
                >
                    <line
                        y1={tick.length}
                        y2={-height - tick.length}
                        stroke={color}
                        strokeWidth={0.5}
                    />
                    <text
                        key={value}
                        x={0}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateY(20px)",
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