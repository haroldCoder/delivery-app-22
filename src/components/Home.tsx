import { useEffect, useRef, useState } from 'react'
import ride from '../imgs/delivery.png'
import { FiHelpCircle } from 'react-icons/fi';
import delivery_logo from '../assets/delivery-logo.png'
import { getDeliverers, updateDeliverer } from '../utils/requests';
interface Data {
    id: Number,
    name: string,
    cel: string,
    xp: string,
    state: boolean
}

interface cronomether {
    minutes: Number,
    seconds: Number,
    state: boolean
}

function Cronomether({ minutes, seconds, state }: cronomether | any): JSX.Element {
    return (
        <p key={minutes} className={`${state ? 'text-green-600' : 'text-red-500'}`}>{minutes}:{seconds < 10 ? '0' : null}{seconds}</p>
    )
}

export default function Home(): JSX.Element {
    const [data, setData] = useState<any[]>([]);
    const [apply, setApply] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [iddelivery, setIddelivery] = useState<Number | any>(0);
    const [state, setState] = useState(false);
    const [name, setName] = useState('');
    const [cel, setCel] = useState('');
    const [xp, setXp] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        getData();
        const timer = setInterval(() => {
            setSeconds((prev) => {
                if (prev == 15) {
                    setMinutes((min) => {
                        if (min == 1) {
                            setMinutes(0);
                            setSeconds(0);
                        }
                        return min + 1
                    });
                    setSeconds(0);
                }

                return prev + 1
            })

        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (minutes == 0 && seconds == 0) {
            const update = async () => {
                for (const e of data) {
                    await updateDeliverer(e.id, {
                        name: e.name,
                        cel: e.cel,
                        xp: e.xp,
                        state: !e.state
                    })
                }
                await getData()
            }
            update()
        }
    }, [minutes, seconds]);

    async function getData() {
        const res = await getDeliverers();
        setData(res);
        console.log(res);

        // setState(res[0].state)
    }
    async function State() {
        await updateDeliverer(iddelivery, {
            name: name,
            cel: cel,
            xp: xp,
            state: !state
        })
    }

    return (
        <div className='p-4'>
            <div className="header flex items-center p-3 ">
                <img src={delivery_logo} className='w-[7%] rounded-full' alt="" />
                <h1 className='font-bold text-3xl text-gray-600 border-b-[1px] border-[#AAA] ml-4 p-5 w-[50%]'>App Delivery</h1>
            </div>

            <div className='p-[3%] container flex flex-row'>
                <div className='grid grid-cols-2 gap-4 w-[50%]'>
                    {
                        data.map((e) => (
                            <div key={e.name} className='container cursor-pointer flex justify-between border-[1px] bg-[#9999998F] hover:bg-[#BBB] p-4 border-gray-400 rounded-sm'
                                onClick={() => {
                                    if (e.state) {
                                        setOpen(true),
                                            setIddelivery(e.id),
                                            setState(e.state),
                                            setName(e.name),
                                            setCel(e.cel),
                                            setXp(e.xp)
                                    }
                                }
                                }>
                                <section className='block w-[50%]'>
                                    <div className='flex justify-around mb-5'>
                                        <b>{e.name}</b>
                                        <p className={`${e.state ? 'text-green-600' : 'text-red-500'}`}>{e.state ? "Available" : "Occupied"}</p>
                                    </div>
                                    <div className={`p-5 ${e.state ? 'bg-green-300' : 'bg-red-300'} rounded-md`}>
                                        <img src={ride} className='w-10 h-10 mx-auto my-[12%]' />
                                    </div>
                                </section>
                                <section className='grid grid-cols-1 text-gray-500 gap-5 content-start font-thin'>
                                    <h2>ID - {e.id}</h2>
                                    <h2>Cel - {e.cel}</h2>
                                    <h2>Experience - {e.xp}</h2>
                                    <div className='container'>
                                        <Cronomether minutes={minutes} seconds={seconds} state={state} key={e.id} />
                                    </div>
                                </section>
                            </div>
                        ))
                    }
                </div>

                <div className={`${open ? 'absolute block' : 'static none'} w-[40%] left-[30%] top-[20%]`}>
                    {
                        open ?
                            <div className='panel h-48 w-[100%] rounded-md p-4 m-auto'>
                                <div className='h-[100%] justify-center flex-col flex flex-wrap'>
                                    <div className='flex justify-center'>
                                        <h2 className='text-white'>want to request this delivery?</h2>
                                    </div>
                                    <div className='flex justify-evenly mt-10'>
                                        <button onClick={() => { setOpen(false); State() }} className='bg-green-600 00 w-[25%] h-10 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' >Yes</button>
                                        <button onClick={() => setOpen(false)} className='bg-red-500 w-[25%] h-10 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' >No</button>
                                    </div>
                                </div>
                            </div> : null
                    }
                </div>
                <div className='mr-15 w-50 p-4'>
                    <button onClick={() => { window.open("/help", "ventana1", "width=520,height=400,scrollbars=NO") }}><FiHelpCircle className='w-6 h-6' /></button>
                </div>
            </div>
        </div>
    )
}
