import request from '@/utils/request';

export function getModels(param) {
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
        url: '/twoapi/models/list',
        method: 'get',
        params: param,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(data => { 
        return data;
    });
}