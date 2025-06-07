import {createContext, useContext, useEffect, useState} from 'react'
import io from 'socket.io-client'

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000')

        newSocket.on('connect', () => {
            console.log('Connected to Socket.io Server');
        })

        newSocket.on('disconnect', () => {
            console.log('Disconnected from Socket.io Server');
        })

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
        {children}
        </SocketContext.Provider>
    )
}