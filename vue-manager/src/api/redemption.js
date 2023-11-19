import request from '@/utils/request';
export function getRedemption(param) {
    const redemption = localStorage.getItem('SK');
    if (!redemption) {
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
    const url = `/twoapi/redemptions/item/${id}`;
    return request({
        url: url,
        method: 'get',
        // params: param,
        headers: {
            'Authorization': `Bearer ${redemption}`
        }
    }).then(data => { 
        return data;
    });
}


export function updateRedemption(param) {
    const redemption = localStorage.getItem('SK');
    if (!redemption) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    } 

    // 将id添加到URL中
    const url = `/twoapi/redemptions/update`;
    return request({
        url: url,
        method: 'put',
        data: param,
        headers: {
            'Authorization': `Bearer ${redemption}`
        }
    }).then(data => { 
        return data;
    });
}

export function addRedemption(param) {
    const redemption = localStorage.getItem('SK');
    if (!redemption) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    }

    return request({
        url: '/twoapi/redemptions/new',
        method: 'put',
        data: param,
        headers: {
            'Authorization': `Bearer ${redemption}`
        }
    }).then(data => {
        // console.log(data);
        return data;
    });
}

export function deleteRedemption(param) {
    const redemption = localStorage.getItem('SK');
    if (!redemption) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    }

    return request({
        url: '/twoapi/redemptions/delete',
        method: 'delete',
        data: param,
        headers: {
            'Authorization': `Bearer ${redemption}`
        }
    }).then(data => {
        // console.log(data);
        return data;
    });
}

export function getRedemptions(param) {
    const redemption = localStorage.getItem('SK');
    if (!redemption) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    }

    return request({
        url: '/twoapi/redemptions/list',
        method: 'get',
        params: param,
        headers: {
            'Authorization': `Bearer ${redemption}`
        }
    }).then(data => { 
        return data;
    });
}
