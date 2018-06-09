// 用户登录
import * as config from "./config";
import axios from "axios/index";

// import  encrypt from '../jsencrypt/bin/jsencrypt'
// console.log(111,new encrypt)

export const userLogin = (params) => {
    let url = config.Dev_Web_Test_Url + "/login"

    return axios.post(url, params)
}