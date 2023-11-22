import request from '@/utils/request';

export function getContent(param) { 

    // 从param对象中获取id
    const key = param.key;

    // 将id添加到URL中
    const url = `/public/content/${key}`;

    return request({
        url: url,
        method: 'get'
    }).then(data => { 
        return data;
    });
}

export function getUpgradeStatus(param) { 
  
    // 将id添加到URL中
    const url = `/twoapi/upgrade/status`;

    return request({
        url: url,
        params: param,
        method: 'get'
    }).then(data => { 
        return data;
    });
}

export function installOrUpgrade(param) { 
  
    // 将id添加到URL中
    const url = `/twoapi/upgrade/init`;

    return request({
        url: url,
        params: param,
        method: 'get'
    }).then(data => { 
        return data;
    });
}