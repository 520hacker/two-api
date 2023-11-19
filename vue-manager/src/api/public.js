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