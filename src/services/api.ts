import axios, {AxiosError} from "axios";


export function SetupAPIClient(ctx = undefined){


    const api = axios.create({
        baseURL:"https://apifordevs.onrender.com",

    })

api.interceptors.response.use(
    response => {
      return response;
    },
    
  )
  return api;
}
