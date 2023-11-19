import request from '@/utils/request';
export function getToken(param) {
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
    const id = param.id;

    // 将id添加到URL中
    const url = `/twoapi/tokens/item/${id}`;
    return request({
        url: url,
        method: 'get',
        // params: param,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(data => { 
        return data;
    });
}


export function updateToken(param) {
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
    const url = `/twoapi/tokens/update`;
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

export function addToken(param) {
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
        url: '/twoapi/tokens/new',
        method: 'put',
        data: param,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(data => {
        // console.log(data);
        return data;
    });
}

export function deleteToken(param) {
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
        url: '/twoapi/tokens/delete',
        method: 'delete',
        data: param,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(data => {
        // console.log(data);
        return data;
    });
}

export function getTokens(param) {
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
        url: '/twoapi/tokens/list',
        method: 'get',
        params: param,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(data => { 
        return data;
    });
}
