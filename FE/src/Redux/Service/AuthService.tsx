import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

// Signup Post request
async function signup(username: string,email:string, password: string) {
  try {
    const { data } = await axios.post<any>(`${baseURL}/user/register`, {
      username,
      email,
      password,
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


// Login Post request
async function login(email: string, password: string) {
  try {
    const { data } = await axios.post<any>(`${baseURL}/user/login`, {
      email,
      password,
    });
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data?.user?.email);
    }
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

async function userProfile(email: string) {
  try {
    const { data } = await axios.post<any>(`${baseURL}/user/profile`, {
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



const logout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    return true;
  } catch (e) {
    return e;
  }
};


//Export Auth Service
const AuthService = {
    signup,
    login,
    logout,
    userProfile
  };
  
  export default AuthService;