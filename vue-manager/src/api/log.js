import request from '@/utils/request';

export function getLogs(param) {
    const token = localStorage.getItem('SK');
    if (!token) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    }

    return request({
        url: '/twoapi/logs/list',
        method: 'get',
        params: param,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(data => { 
        return data;
    });
}


export function getLogDetail(param) {
    const token = localStorage.getItem('SK');
    if (!token) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    }

    const id = param.id;
    const url = `/twoapi/logs/chat/${id}`;
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
