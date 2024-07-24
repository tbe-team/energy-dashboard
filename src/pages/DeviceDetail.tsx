import { Label } from '@radix-ui/react-label'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import device from './components/device.json';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Area, AreaChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    phase1: {
        label: "phase1",
        color: "#f35b04",
    },
    phase2: {
        label: "phase2",
        color: "#aacc00",
    },
    phase3: {
        label: "phase3",
        color: "#4cc9f0",
    },
    energy: {
        label: "energy",
        color: "#f35b04",
    }
} satisfies ChartConfig

interface Voltage {
    phaseA: number;
    phaseB: number;
    phaseC: number;
}

interface Current {
    currentA: number;
    currentB: number;
    currentC: number;
}

interface Power {
    cosp: number;
    activePower: number;
    energy: number;
}

interface DataItem {
    timestamp: string;
    voltage: Voltage[];
    current: Current[];
    power: Power[];
}

interface Item {
    id: string;
    name: string;
    type: string;
    location: string;
    data: DataItem[];
}

const DeviceDetail = () => {
    const item: Item = device;

    // Prepare data for charts
    // const chartData = item.data.map(data => ({
    //     timestamp: data.timestamp,
    //     PhaseA: data.voltage[0].phaseA,
    //     PhaseB: data.voltage[0].phaseB,
    //     PhaseC: data.voltage[0].phaseC,
    //     CurrentA: data.current[0].currentA,
    //     CurrentB: data.current[0].currentB,
    //     CurrentC: data.current[0].currentC,
    //     Cosp: data.power[0].cosp,
    //     ActivePower: data.power[0].activePower,
    //     Energy: data.power[0].energy,
    // }));

    const energyData = item.data.map(data => ({
        timestamp: data.timestamp,
        Energy: data.power[0].energy,
    }));

    const voltageData = item.data.map(data => ({
        timestamp: data.timestamp,
        PhaseA: data.voltage[0].phaseA,
        PhaseB: data.voltage[0].phaseB,
        PhaseC: data.voltage[0].phaseC,
    }));

    const currentData = item.data.map(data => ({
        timestamp: data.timestamp,
        CurrentA: data.current[0].currentA,
        CurrentB: data.current[0].currentB,
        CurrentC: data.current[0].currentC,
    }));


    return (
        <main className='grid gap-2 p-4'>
            <Label className="grid grid-cols-1 mb-4 text-2xl font-bold text-center">
                Device Detail
            </Label>

            <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
                <Card className="h-[300px]">
                    <CardHeader>
                        <CardTitle>Voltage</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full p-2">
                            <LineChart accessibilityLayer data={voltageData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="timestamp" />
                                <YAxis domain={["dataMin", "dataMax"]} tickCount={5} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Line dataKey="PhaseA" stroke={chartConfig.phase1.color} strokeWidth={2} type="monotone" dot={false} />
                                <Line dataKey="PhaseB" stroke={chartConfig.phase2.color} strokeWidth={2} type="monotone" dot={false} />
                                <Line dataKey="PhaseC" stroke={chartConfig.phase3.color} strokeWidth={2} type="monotone" dot={false} />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="h-[300px]">
                    <CardHeader>
                        <CardTitle>Current</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full p-2">
                            <AreaChart data={currentData}>
                                <defs>
                                    <linearGradient id="fillCurrentA" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={chartConfig.phase1.color} stopOpacity={0.9} />
                                        <stop offset="100%" stopColor={chartConfig.phase1.color} stopOpacity={0.2} />
                                    </linearGradient>
                                    <linearGradient id="fillCurrentB" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={chartConfig.phase2.color} stopOpacity={0.9} />
                                        <stop offset="100%" stopColor={chartConfig.phase2.color} stopOpacity={0.2} />
                                    </linearGradient>
                                    <linearGradient id="fillCurrentC" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={chartConfig.phase3.color} stopOpacity={0.9} />
                                        <stop offset="100%" stopColor={chartConfig.phase3.color} stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="timestamp" />
                                <YAxis domain={["dataMin", "dataMax"]} tickCount={5} />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })}
                                            indicator="dot"
                                        />
                                    }
                                />
                                <Area dataKey="CurrentA" type="natural" fill="url(#fillCurrentA)" stroke={chartConfig.phase1.color} stackId="a" />
                                <Area dataKey="CurrentB" type="natural" fill="url(#fillCurrentB)" stroke={chartConfig.phase2.color} stackId="a" />
                                <Area dataKey="CurrentC" type="natural" fill="url(#fillCurrentC)" stroke={chartConfig.phase3.color} stackId="a" />
                                <ChartLegend content={<ChartLegendContent />} />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="h-[300px]">
                    <CardHeader>
                        <CardTitle>Energy Consumption</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full p-2">
                            <BarChart accessibilityLayer data={energyData}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="timestamp" />
                                <YAxis domain={["dataMin", "dataMax"]} tickCount={5} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="Energy" fill="var(--color-energy)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            <div className='grid-container'>
                <Card className="h-[300px]">
                    <CardHeader>
                        <CardTitle>Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Here you can add the chart or data visualization component */}
                        <p>Chart content goes here</p>
                    </CardContent>
                </Card>
                <Card className="h-[300px]">
                    <CardHeader>
                        <CardTitle>Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Here you can add the chart or data visualization component */}
                        <p>Chart content goes here</p>
                    </CardContent>
                </Card>
                <Card className="h-[300px] col-span-1">
                    <CardHeader>
                        <CardTitle>Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Here you can add the chart or data visualization component */}
                        <p>Chart content goes here</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default DeviceDetail;
