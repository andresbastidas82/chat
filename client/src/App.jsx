import { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import FormUserChat from "./components/FormUserChat";

const socket = io()

function App() {
  const [message, setMessage] = useState('');
  const [listMessages, setListMessages] = useState([]);
  const [user, setUser] = useState(null)
  const [chat, setChat] = useState(false)
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(user && message) {
      let newMessage = {message, user}
      setListMessages([...listMessages, newMessage])
      setMessage('')
      socket.emit('message', newMessage)
    }
  }

  useEffect(() => {
    socket.on('message', receiveMessage);
    return () => {
      socket.off('message', receiveMessage)
    }
  }, []);

  const receiveMessage = (message) => setListMessages((state) => [...state, message])

  useEffect(() => {
    scrollToBottom();
  }, [listMessages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getHora = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <div className="h-screen text-while flex items-center justify-center bg-gradient-to-r from-indigo-900 from-10% via-sky-900 via-30% to-emerald-900 to-90%">
      {!chat ? (
        <FormUserChat 
          setChat={setChat}
          setUser={setUser}
          user={user}
        />
      ) : (
        <div className="bg-zinc-950 p-4 px-6">
          <h1 className="text-2xl font-bold text-orange-600">Chat en línea 😏🥰😎</h1>
          <h2 className="text-md font-thin mb-5 text-slate-400">Estas registrado como: <span className="font-bold">{user}</span> </h2>
          
          <ul className="h-[350px] overflow-auto scroll-smooth hide-scrollbar border-[1px] border-orange-900 rounded-0 p-1 mb-1">
            { 
              listMessages.map((item, i) => (
                <li key={i} 
                  className={`my-2 p-2 table text-sm rounded-md text-gray-300
                    ${item.user === user ? 'bg-orange-700 ml-auto' :'bg-black' } `}>
                  <div className={`text-xs flex justify-between ${item.user === user ? 'text-slate-900' :'text-slate-500' }`}>
                    <span>{item.user === user ? 'Me' : item.user} </span>
                    <span className="ml-2">{getHora()}</span>                    
                  </div>
                  <span className="text-md">{item.message}</span> 
                </li>
              ))
            }
            <div ref={messagesEndRef} />
          </ul>

          <form onSubmit={handleSubmit}
            className="flex">
            <input 
              type="text" 
              autoFocus={true}
              placeholder="..." 
              className="border-2 border-zinc-500 p-2 w-full"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button 
              className="border-2 border-zinc-500 p-2 px-4 text-white">
              Enviar</button>
            
          </form>

          

        </div>
      )}
    </div>

  )
}

export default App
