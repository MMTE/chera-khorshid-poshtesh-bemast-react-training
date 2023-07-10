import Image from 'next/image'
import {Inter} from 'next/font/google'
import {useEffect, useState} from "react";

const inter = Inter({subsets: ['latin']})

export default function Home() {

    const [post, setPost] = useState([])


    const getData = async () => {
        const res = await fetch(`https://testedperson.s3-tastewp.com/wp-json/wp/v2/posts`)
        const data = await res.json()

        if (!data) {
            return {
                status: false,
            }
        }

        setPost(data)

        return {
            data: data,
            status: true
        }
    }

    const sendData = async () => {

        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const body = { "name": "Luke Skywalker" }

        const options = {
            method: "POST",
            headers,
            mode: "cors",
            body: JSON.stringify(body),
        }

        const rawResponse  = await fetch("https://end8axhxeiuzb.x.pipedream.net/", options)

        const content = await rawResponse.json();

        console.log(content);
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <main className='container mx-auto'>
            <div className='my-20'>
                <p className='mr-4 font-bold text-2xl'>سلام خوش آمدید!</p>
                <hr/>
                <button onClick={sendData}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    send data
                </button>
                <div className='p-4'>
                    {
                        post.map(item => {
                            return (
                                <div className='my-5 p-2 border border-2 rounded ' key={item.id}>
                                    <h1 className='font-bold'>{item.title.rendered}</h1>
                                    <div className='mt-2'
                                         dangerouslySetInnerHTML={{__html: item.content.rendered}}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}
