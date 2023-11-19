import request from '@/utils/request';

/**
 * 更新频道信息
 *
 * @param param 更新频道的参数
 * @returns 返回更新频道后的结果
 */
export function updateChannel(param) {
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
    const url = `/twoapi/channels/update`;
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

/**
 * 获取频道信息
 *
 * @param param 请求参数对象，包含id属性
 * @returns 返回Promise对象，包含获取到的频道信息
 */
export function getChannel(param) {
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
    const url = `/twoapi/channels/item/${id}`;
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

/**
 * 获取频道余额
 *
 * @param param 请求参数对象，必须包含id属性
 * @returns 返回Promise对象，包含获取到的频道余额数据
 */
export function getChannelBalance(param) {
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
    const url = `/twoapi/channels/balance/${id}`;
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

/**
 * 获取频道响应时间
 *
 * @param param 请求参数对象
 * @returns 返回Promise对象，包含请求结果
 */
export function getChannelResponseTime(param) {
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
    const url = `/twoapi/channels/test/${id}`;
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

/**
 * 获取频道信息
 *
 * @param param 请求参数
 * @returns 返回Promise对象，包含请求结果
 */
export function getChannels(param) {
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
        url: '/twoapi/channels/list',
        method: 'get',
        params: param,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(data => { 
        return data;
    });
}

/**
 * 添加频道
 *
 * @param param 请求参数
 * @returns Promise 对象，包含成功或失败的返回信息
 */
export function addChannel(param) {
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
        url: '/twoapi/channels/new',
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

/**
 * 删除频道
 *
 * @param param 删除频道的参数
 * @returns 返回一个Promise对象，包含成功或失败后的数据
 */
export function deleteChannel(param) {
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
        url: '/twoapi/channels/delete',
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