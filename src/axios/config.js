/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth';         // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin';                           // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor';                       // 访问权限接口

//  平台 site gateway 的 ip地址
//export const Platform_Site_Gateway_Url = 'http://192.168.208.130:16200'
export const Platform_Site_Gateway_Url = ''

//  web test 的地址
export const Dev_Web_Test_Url = 'http://127.0.0.1:16200'

//  pubkey
export const pubKey = '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDU1MmnSOhf0bUAry2xosIp/iqt\n' +
    'W1B46O8VjjkwVoLdnw1zqBZW1MC/Yx9HJMub3tjU5Kob9Ta2mtf+boct7KTMY+X7\n' +
    'tOi02Yf4zk1JPhSKkRjQAG9PrOVltEeWhCZnvRt8vUL5zHAW2ApE78d6HxlAdMig\n' +
    '0sRYPuRAyWAVnWoieQIDAQAB\n' +
    '-----END PUBLIC KEY-----'

// signature
export const Secret = 'JGSC6a800jd2RMxCyZLBk8yOaN3e3u6u'


