import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;


// New Chat Post request
async function newchat(email: string, message: string) {
    try {
      const { data } = await axios.post<any>(`${baseURL}/chat/new`, {
        email,
        message,
      });
      return data;
    } catch (e: any) {
      return {
        message:
          e.response.data.err ||
          e.response.data.message ||
          e.response.data.Error ||
          e.response.data.error ||
          e.response.data.eror,
      };
    }
  }


  async function getAllChat(email: string) {
    try {
      const { data } = await axios.post<any>(`${baseURL}/chat/all-chats`, {
        email,
      });
      return data;
    } catch (e: any) {
      return {
        message:
          e.response.data.err ||
          e.response.data.message ||
          e.response.data.Error ||
          e.response.data.error ||
          e.response.data.eror,
      };
    }
  }

  async function deleteAllChat(email: string) {
    try {
      const { data } = await axios.post<any>(`${baseURL}/chat/delete`, {
        email,
      });
      return data;
    } catch (e: any) {
      return {
        message:
          e.response.data.err ||
          e.response.data.message ||
          e.response.data.Error ||
          e.response.data.error ||
          e.response.data.eror,
      };
    }
  }


  //Export Chat Service
const ChatService = {
    newchat,
    getAllChat,
    deleteAllChat
  };
  
  export default ChatService;