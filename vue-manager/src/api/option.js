import request from '@/utils/request';

export function getOption(param) {
    const token = localStorage.getItem('SK');
    if (!token) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    }

    // 从param对象中获取id
    const key = param.key;

    // 将id添加到URL中
    const url = `/twoapi/options/item/${key}`;

    return request({
        url: url,
        method: 'get',
        params: param,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(data => { 
        return data;
    });
}

export function updateOption(param) {
    const token = localStorage.getItem('SK');
    if (!token) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    } 

    // 将id添加到URL中
    const url = `/twoapi/options/update`;
    return request({
        url: url,
        method: 'put',
        data: param,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(data => { 
        return data;
    });
}