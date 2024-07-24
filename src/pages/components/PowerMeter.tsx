import { Input } from './CustomInput';
import { Label } from "@/components/ui/label";
import { MapPin, MoreVertical } from 'lucide-react';
import { NavLink } from "react-router-dom";
import data from './data.json';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from '@/components/ui/button';

// Define types for better type safety
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

const PowerMeter = () => {
    return (
        <>
            <Label>
                Dashboard
            </Label>
            <div className='grid grid-cols-4 gap-4 '>
                {data.map((item: Item) => (
                    <Card key={item.id} className="w-[270px]">
                        <CardHeader>
                            <CardTitle>
                                <NavLink to={`/detail`} className="w-full text-xs">
                                    <Label htmlFor={item.id}>
                                        {item.name}
                                    </Label>
                                </NavLink>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="outline" className="w-7 h-7">
                                            <MoreVertical className="h-3.5 w-3.5" />
                                            <span className="sr-only">More</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <NavLink to={`/detail`} className="w-full text-xs">Detail</NavLink>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardTitle>
                            <CardDescription className='flex flex-row items-center gap-1'>
                                <MapPin size={12} />
                                {item.location}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col justify-center gap-1'>
                                <p className='p-1 text-xs font-bold text-center text-white rounded-sm sm:w-full bg-primary'>VOLTAGE</p>
                                {item.data[0].voltage.map((voltage, index) => (
                                    Object.keys(voltage).map((phase) => (
                                        <div key={`${index}-${phase}`} className='flex flex-row items-center justify-between'>
                                            <Label htmlFor={`${phase}-${item.id}-${index}`} className='text-xs sm:w-1/2'>{`Phase ${phase.charAt(phase.length - 1).toUpperCase()}`}</Label>
                                            <Input id={`${phase}-${item.id}-${index}`} disabled value={`${voltage[phase as keyof Voltage].toFixed(2)} V`} />
                                        </div>
                                    ))
                                ))}
                                <p className='p-1 text-xs font-bold text-center text-white rounded-sm sm:w-full bg-primary'>CURRENT</p>
                                {item.data[0].current.map((current, index) => (
                                    Object.keys(current).map((phase) => (
                                        <div key={`${index}-${phase}`} className='flex flex-row items-center justify-between'>
                                            <Label htmlFor={`${phase}-${item.id}-${index}`} className='text-xs sm:w-1/3'>{`Current ${phase.charAt(phase.length - 1).toUpperCase()}`}</Label>
                                            <Input id={`${phase}-${item.id}-${index}`} disabled value={`${current[phase as keyof Current].toFixed(2)} A`} />
                                        </div>
                                    ))
                                ))}
                                <p className='p-1 text-xs font-bold text-center text-white rounded-sm sm:w-full bg-primary'>POWER</p>
                                {item.data[0].power.map((power, index) => (
                                    Object.keys(power).map((key) => (
                                        <div key={`${index}-${key}`} className='flex flex-row items-center justify-between'>
                                            <Label htmlFor={`${key}-${item.id}-${index}`} className='text-xs sm:w-1/3'>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                                            <Input
                                                id={`${key}-${item.id}-${index}`}
                                                disabled
                                                value={key === 'cosp' ? power[key as keyof Power].toFixed(2) : `${power[key as keyof Power].toFixed(2)} ${key === 'activePower' ? 'KW' : 'kWh'}`}
                                            />
                                        </div>
                                    ))
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default PowerMeter;
