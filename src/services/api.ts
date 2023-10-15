import axios, {AxiosError} from "axios";


export function SetupAPIClient(ctx = undefined){


    const api = axios.create({
        baseURL:"api-fordevs.vercel.app",

    })

api.interceptors.response.use(
    response => {
      return response;
    },
    
  )
  return api;
}
