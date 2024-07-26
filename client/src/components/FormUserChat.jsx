import React, { useState } from 'react'

const FormUserChat = ({user, setUser, setChat}) => {
    const [error, setError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        if(user) {
            setChat(true);
        } else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000);
        }
    }
    return (
        <div className="bg-zinc-950 p-4 px-6 text-white pb-10">
            <h2 className="text-center text-2xl">😏😎🥰🙃🥴💭</h2>
            <p className="pb-5 text-orange-600">Ingrese un nombre para acceder al chat</p>
            <form onSubmit={handleSubmit} className="flex">
                <input 
                    type="text"
                    placeholder="Nombre"
                    className="border-2 border-zinc-500 p-2 w-full text-gray-900"
                    onChange={(e) => setUser(e.target.value)}/>
                <button className="border-2 border-zinc-500 p-2 px-2">
                    Iniciar</button>
            </form>
            {
                error && (
                    <span className="text-red-700 text-xs">
                        Ingrese su nombre para iniciar</span>
                )
            }
        </div>
    )
}

export default FormUserChat