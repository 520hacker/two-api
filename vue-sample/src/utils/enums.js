export function getMainMenus() {
    var menus = [
        {
            "job": "默认",
            "items": [
                {
                    "title": "对话",
                    "links": [
                        { title: "对话", href: "/chat/base/0/76" },
                        { title: "联网", href: "/chat/base/8/5" }, 
                        { title: "智脑", href: "/chat/base/11/45" },
                        { title: "智谱", href: "/chat/base/12/65" },
                        { title: "分析", href: "/chat/base/6/7" }, 
                        { title: "周报生成", href: "/chat/base/110/8" }, 
                        { title: "语法优化", href: "/chat/base/1/76" },
                        { title: "中英互译", href: "/chat/base/7/76" },
                        { title: "词汇老师", href: "/chat/base/103/4" }
                    ]
                },
                {
                    "title": "绘图",
                    "links": [{ title: "Midjourney", href: "/chat/base/9/32" },
                    ]
                }
            ]
        },
        {
            "job": "名人",
            "items": [
                {
                    "title": "名人",
                    "links": [
                        { title: "助手", href: "/chat/base/3/4" },
                        { title: "祖母", href: "/chat/base/5/7" },
                        { title: "半仙", href: "/chat/base/4/76" },
                        { title: "佛祖", href: "/chat/base/106/8" },
                        { title: "牛破天", href: "/chat/base/102/76" },
                    ]
                }
            ]
        },
        {
            "job": "程序员",
            "items": [
                {
                    "title": "程序员",
                    "links": [
                        { title: "助手-1", href: "/chat/base/3/7" },
                        { title: "助手-2", href: "/chat/base/12/65" },
                        { title: "助手-3", href: "/chat/base/11/45" },
                        { title: "助手-4", href: "/chat/base/13/11" },
                        { title: "DBA", href: "/chat/base/104/7" },
                        { title: "语法优化", href: "/chat/base/1/76" },
                        { title: "中英互译", href: "/chat/base/7/76" }
                    ]
                }
            ]
        },
        {
            "job": "撰写家",
            "items": [
                {
                    "title": "撰写家",
                    "links": [
                        { title: "助手", href: "/chat/base/3/76" },
                        { title: "小说家", href: "/chat/base/2/7" },
                        { title: "小红书创作", href: "/chat/base/107/76" },
                        { title: "爆款作家", href: "/chat/base/108/11" },
                        { title: "好评生成器", href: "/chat/base/109/7" },
                        { title: "项目起名大师", href: "/chat/base/100/76" },
                        { title: "Slogan生成大师", href: "/chat/base/105/7" }
                    ]
                }
            ]
        }
    ]
    var job = localStorage.getItem('job') ?? '默认';
    var matchedMenu = menus.find(function (menu) {
        return menu.job === job;
    });

    if (matchedMenu) {
        return matchedMenu.items;
    } else {
        return menus[0].items;
    }
}

export function getChannelStatus(status) {
    switch (status) {
        case 1:
            return "启用"
        case 2:
            return "禁用"
        default:
            return "未知"
    }
}

export function getTokenStatus(status) {
    switch (status) {
        case 1:
            return "启用"
        case 2:
            return "禁用"
        default:
            return "未知"
    }
}

export function getRedemptionStatus(status) {
    switch (status) {
        case 1:
            return "启用"
        case 2:
            return "禁用"
        case 3:
            return "已核销"
        default:
            return "未知"
    }
}

export function getChannelType(status) {
    switch (status) {
        case 1:
            return "OpenAI"
        case 2:
            return "讯飞星火"
        case 3:
            return "百度文心"
        default:
            return "未知"
    }
}

export function getErrorMessage(code) {
    var errorMessage = "请检查表单是否都填写正确。"
    switch (code) {
        case "InvalidRedemptionStatus":
            errorMessage = "兑换券不可用。"
            break;
        case "InvalidKey":
            errorMessage = "错误的Key。"
            break;
        case "InvalidSortKey":
            errorMessage = "错误的排序关键字。"
            break;
        case "InvalidSessionId":
            errorMessage = "错误的SessionId。"
            break;
        case "InvalidId":
            errorMessage = "错误的Id。"
            break;
        case "InvalidLimit":
            errorMessage = "错误的页内条数限制。"
            break;
        case "InvalidOffset":
            errorMessage = "错误的翻页起始。"
            break;
        case "InvalidSortDirection":
            errorMessage = "错误的排序方向。"
            break;
        case "DeleteSelfError":
            errorMessage = "您不能删除自己。"
            break;
        case "TokenExpired":
            errorMessage = "令牌已过期。"
            break;
        case "InvalidChannelType":
            errorMessage = "错误的渠道类型。"
            break;
        case "InvalidUserBalance":
            errorMessage = "错误的余额。"
            break;
        case "InvalidToken":
            errorMessage = "错误的令牌。"
            break;
        case "InsufficientTokens":
            errorMessage = "错误的令牌余额。"
            break;
        case "InvalidTokenUser":
            errorMessage = "错误的令牌用户。"
            break;
        case "InvalidUsername":
            errorMessage = "错误的用户名"
            break;
        case "InvalidValue":
            errorMessage = "错误的值"
            break;
        case "InvalidCount":
            errorMessage = "错误的数量"
            break;
        case "InvalidUserId":
            errorMessage = "错误的UserId"
            break;
        case "InvalidRedemption":
            errorMessage = "错误的兑换券"
            break;
        case "InvalidKeyAccess":
            errorMessage = "错误的秘钥权限"
            break;
        case "InvalidUserStatus":
            errorMessage = "错误的用户状态"
            break;
        case "Unknown":
            errorMessage = "发生了未知错误。"
            break;
        case "InvalidType":
            errorMessage = "请检查分类。"
            break;
        case "InvalidName":
            errorMessage = "请检查渠道名。"
            break;
        case "InvalidModels":
            errorMessage = "请检查模型设置"
            break;
        case "InvalidGroup":
            errorMessage = "请检查分组"
            break;
        case "AccessDenied":
            errorMessage = "请检查权限"
            break;
        case "ChannelAlreadyExists":
            errorMessage = "您提交的信息已存在"
            break;
        case "InvalidUserAccessToken":
            errorMessage = "请检查AccessToken"
            break;
        case "DisableSelfError":
            errorMessage = "您不能禁用自己"
            break;
        case "RedemptionAlreadyExists":
            errorMessage = "您提交的信息已存在"
            break;
        case "InvalidUserAccessRedemption":
            errorMessage = "请检查AccessRedemption"
            break;
        case "InvalidUserNameLength":
            errorMessage = "请检查用户名，至少要4个字符。"
            break;
        case "InvalidUserName":
            errorMessage = "请检查用户名。"
            break;
        case "InvalidPassword":
            errorMessage = "请检查密码。"
            break;
        case "InvalidConfirmPassword":
            errorMessage = "请检查校验密码。"
            break;
        case "InvalidEmail":
            errorMessage = "请检查邮件地址。"
            break;
        case "DataNotExits":
            errorMessage = "数据不存在。"
            break;
        case "InvalidExitsUserName":
            errorMessage = "您的用户名已经被注册过了。"
            break;
        case "InvalidExitsEmail":
            errorMessage = "您的邮件地址已经被注册过了。"
            break;
        case "InvalidPasswordSafe":
            errorMessage = "请认真对待您的密码，不要使用过于简单的密码。"
            break;
        case "InvalidPasswordComplex":
            errorMessage = "您的密码过于简单，至少需要有8位，且包含字母和数字。"
            break;
        default:
            break;
    }
    return errorMessage;
}