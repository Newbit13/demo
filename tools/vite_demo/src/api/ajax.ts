import axios from 'axios'

export default function ajax(url='',data={},method='GET'){
    if(method === 'GET'){
        return axios.get(url,{params:data})
    }else{
        return axios.post(url,data)
    }
}