import React from 'react'

type Props = {}

const Home = (props: Props) => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600">
                ¡Hola, Tailwind con React y Vite! 🚀
            </h1>
        </div>
    )
}

export default Home;