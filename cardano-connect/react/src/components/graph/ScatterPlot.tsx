import * as d3 from "d3";
import {AxisX} from "./AxisX";
import {AxisY} from "./AxisY";
import {useCallback, useRef, useState} from "react";
import {classMap} from "../../library/utils";
import {PoolGraph} from "../PoolGraph";

export const ScatterPlot = ({
    width,
    height,
    data,
    color = '#D2D7D3',
    margin = {
        top: 80,
        right: 80,
        bottom: 80,
        left: 80
    },
    axisX,
    axisY,
    ToolTip
}: GraphScatterComponent<GraphPlot, GraphPlot>) => {

    // Local state

    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;
    let maxX = 0
    let maxY = 0;
    data.map(a => {
        maxX = a.x > maxX ? a.x : maxX
        maxY = a.y > maxY ? a.y : maxY
    })

    const xScale = d3.scaleLinear().domain([0, maxX]).range([0, boundsWidth]);
    const yScale = d3.scaleLinear().domain([0, maxY]).range([boundsHeight, 0]);
    const [plotHover, setPlotHover] = useState<GraphPlot|null>(null)
    const graphContainer = useRef<HTMLDivElement>(null)
    const hoverContainer = useRef<HTMLDivElement>(null)

    // Methods

    const getPlots = data.map((d, i) => {
        return (
            <circle
                key={i}
                opacity={1}
                cx={xScale(d.x)}
                cy={yScale(d.y)}
                r={d.radius || 7}
                stroke={d.stroke || color}
                fill={d.fill || color}
                fillOpacity={d.fillOpacity || 0.2}
                strokeWidth={d.strokeWidth || 1}
                onMouseEnter={() => setPlotHover(d)}
                onMouseLeave={() => {}}
            />
        );
    });

    const getPlotPosition = useCallback((plot: GraphPlot): { top: number; left: number } => {
        const containerHeight = graphContainer.current.offsetHeight
        const hoverHeight = hoverContainer.current.offsetHeight
        const containerWidth = graphContainer.current.offsetWidth
        const hoverWidth = hoverContainer.current.offsetWidth
        let plotPosition = {
            top: yScale(plot.y) + margin.top + plot.radius,
            left: xScale(plot.x) + margin.left + plot.radius
        }
        const diffHeight = (plotPosition.top + hoverHeight) - containerHeight - margin.top + margin.bottom;
        const diffWidth = (plotPosition.left + hoverWidth) - containerWidth - margin.right + margin.left;

        // Out of bounds height

        if (diffHeight > 0) {
            plotPosition.top = plotPosition.top-diffHeight
        }

        // Out of bounds width

        if (diffWidth > 0) {
            plotPosition.left = plotPosition.left - (hoverWidth) -+plot.radius
        }

        return plotPosition
    }, [yScale, xScale, margin, graphContainer, hoverContainer])

    // Handlers

    return (
        <div ref={graphContainer} className={classMap.graphContainer}>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[margin.left, margin.top].join(',')})`}
                >
                    {getPlots}
                    <AxisY
                        yScale={yScale}
                        width={boundsWidth}
                        label={axisY?.label}
                        tick={axisY?.tick}
                        color={color}
                    />
                    <g transform={`translate(0, ${boundsHeight})`}>
                        <AxisX
                            xScale={xScale}
                            height={boundsHeight}
                            label={axisX?.label}
                            tick={axisX?.tick}
                            color={color}
                        />
                    </g>
                </g>
            </svg>
            <div ref={hoverContainer} className={classMap.plotContainer}
                 style={{
                     opacity: plotHover ? 1 : 0,
                     pointerEvents: plotHover ? 'initial' : 'none',
                     top: plotHover ? getPlotPosition(plotHover).top : 0,
                     left: plotHover ? getPlotPosition(plotHover).left : 0
                 }}>
                <ToolTip plot={plotHover} hide={() => setPlotHover(null)} />
            </div>
        </div>
    )
}