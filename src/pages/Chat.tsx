import { useEffect, useState } from "react";
import Chat from "../components/Chat/Chat"
import ChatSidebar from "../components/Chat/ChatSidebar";
import ToggleUserTypeButton from "../components/Combos/ToggleProveedorButton";
import { getRoles } from "../services/Combos/apiCombos";
import { ChatItem, ChatResponse, getChatsClient, getChatsProveedor, getUserId } from "../services/Chat/chatService";



const ChatPage = () => {
    const [isCliente, setIsCliente] = useState(true);
    const [isProveedor, setIsProveedor] = useState(false);
    const [chats, setChats] = useState<ChatItem[]>([]);
    const [chatsProveedor, setChatsProveedor] = useState<ChatItem[]>([]);
    const [userId, setUserId] = useState<string>("");
    const [activeChat, setActiveChat] = useState<ChatResponse>(chats[0] ? {
        data: {
            id: chats[0].id,
            servicioGeneral: {
                id: chats[0].servicioGeneral.id,
                nombre: chats[0].servicioGeneral.nombre,
                descripcion: chats[0].servicioGeneral.descripcion,
                precio: chats[0].servicioGeneral.precio,
                tipoServicio: chats[0].servicioGeneral.tipoServicio,
                proveedorHasServicio: null,
                contrataciones: [],
                fotos: [],
                reportes: [],
                mensajes: []
            }
        }
    }:{
        data: {
            id: "",
            servicioGeneral: {
                id: "",
                nombre: "",
                descripcion: "",
                precio: 0,
                tipoServicio: "",
                proveedorHasServicio: null,
                contrataciones: [],
                fotos: [],
                reportes: [],
                mensajes: []
            }
        }
    });

    const getUser = async () => {
        try {
            const response = await getUserId();
            console.log("UserId: ", response);
            setUserId(response.data);
        } catch (error) {
            console.error("Error al obtener el ID del usuario: ", error);
        }
      }

    const setRoles = async () => {
        const response = await getRoles();
        if(response.length > 0){
          if(response.some((role) => role.nombre === "ROLE_PROVEEDOR")){
            console.log("El usuario es proveedor");
            setIsProveedor(true);
          }
        }
        console.log("Roles: ", response);
    }

    const getChats = async () => {
        const res = await getChatsClient();
        if (res.OK) {
            setChats(res.data); // Ya viene con la estructura correcta
        }
        console.log("Chats: ", res);
    }

    const getChatsProv = async () => {
        const res = await getChatsProveedor();
        if (res.OK) {
            setChatsProveedor(res.data); // Ya viene con la estructura correcta
        }
        console.log("Chats: ", res);
    }

    const changeChat = (chat: ChatItem) => {
        setActiveChat({
            data: {
                id: chat.id,
                servicioGeneral: {
                    id: chat.servicioGeneral.id,
                    nombre: chat.servicioGeneral.nombre,
                    descripcion: chat.servicioGeneral.descripcion,
                    precio: chat.servicioGeneral.precio,
                    tipoServicio: chat.servicioGeneral.tipoServicio,
                    proveedorHasServicio: null,
                    contrataciones: [],
                    fotos: [],
                    reportes: [],
                    mensajes: []
                }
            }
        });
    }

    useEffect(() => {
        setRoles();
        getChats();
        getUser();
        getChatsProv();
    },[])

  return (
    <div>
        <div className="flex justify-end">
            {isProveedor && (<ToggleUserTypeButton isCliente={setIsCliente}/>)}
        </div>
        <div className="flex h-screen">
            <div className="h-full w-1/6  p-4">
                <ChatSidebar 
                    chats={isCliente ? chats:chatsProveedor}
                    selectedChatId={activeChat.data.id}
                    onChatSelect={changeChat}
                    className="w-80 flex-shrink-0"
                />
            </div>
            <div className="h-full w-5/6 bg-white p-4">
                <Chat 
                    chat={activeChat}
                    chatId={activeChat.data.id}
                    userId={userId}
                    nombreServicio={activeChat.data.servicioGeneral.nombre}
                    className="h-96 w-full" 
                />
            </div>
    </div>
    </div>
  )
}

export default ChatPage