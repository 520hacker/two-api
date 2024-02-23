import request from '@/utils/request';
import { useRouter } from 'vue-router';

export function getUser(param) {
    const user = localStorage.getItem('SK');
    if (!user) {
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
    const url = `/twoapi/users/item/${id}`;
    return request({
        url: url,
        method: 'get',
        // params: param,
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }).then(data => { 
        return data;
    });
}

export function updateUser(param) {
    const user = localStorage.getItem('SK');
    if (!user) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    } 

    // 将id添加到URL中
    const url = `/twoapi/users/update`;
    return request({
        url: url,
        method: 'put',
        data: param,
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }).then(data => { 
        return data;
    });
}

export function getUsers(param) {
    const user = localStorage.getItem('SK');
    if (!user) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    }

    return request({
        url: '/twoapi/users/list',
        method: 'get',
        params: param,
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }).then(data => { 
        return data;
    });
}

export function Login(param) {
    return request({
        url: '/twoapi/user/login',
        method: 'put',
        data: param,
    }).then(data => {
        // console.log(data);
        return data;
    });
}

export function goLogin()
{ 
    const router = useRouter();  
    router.push('/login');
}

export function Logout(param) {
    return request({
        url: '/twoapi/user/logout',
        method: 'delete',
        data: param,
    }).then(data => {
        // console.log(data);
        return data;
    });
}

export function Register(param) {
    return request({
        url: '/twoapi/user/register',
        method: 'put',
        data: param,
    }).then(data => {
        // console.log(data);
        return data;
    });
}

export function CheckLogin(){ 
    const router = useRouter(); 
    let key = localStorage.getItem("SK");
    if (!key || key == "") {
        router.push('/login');
    }
}


export function deleteUser(param) {
    const user = localStorage.getItem('SK');
    if (!user) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    }

    return request({
        url: '/twoapi/users/delete',
        method: 'delete',
        data: param,
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }).then(data => { 
        return data;
    });
}


export function updateProfile(param) {
    const user = localStorage.getItem('SK');
    if (!user) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    } 

    // 将id添加到URL中
    const url = `/twoapi/user/update`;
    return request({
        url: url,
        method: 'put',
        data: param,
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }).then(data => { 
        return data;
    });
}

export function getProfile(param) {
    const user = localStorage.getItem('SK');
    if (!user) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    }

    return request({
        url: '/twoapi/user/profile',
        method: 'get',
        params: param,
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }).then(data => { 
        return data;
    });
}

export function redeem(param) {
    const user = localStorage.getItem('SK');
    if (!user) {
        return Promise.resolve({
            "success": false,
            "errorMessage": "SK value miss",
            "errorCode": 401,
            "executionTime": 0
        });
    } 

    // 将id添加到URL中
    const url = `/twoapi/user/redeem`;
    return request({
        url: url,
        method: 'put',
        data: param,
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }).then(data => { 
        return data;
    });
}