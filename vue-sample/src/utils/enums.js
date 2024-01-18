export function getMainMenus() {
    var menus = [
        {
            "job": "默认",
            "items": [
                {
                    "title": "对话",
                    "links": [
                        { title: "对话", href: "/chat/base/0/72" },
                        { title: "识图", href: "/chat/base/112/70" },
                        { title: "读文档", href: "/chat/base/113/69" },
                        { title: "语法优化", href: "/chat/base/1/72" },
                        { title: "中英互译", href: "/chat/base/7/72" },
                    ]
                },
                {
                    "title": "联网",
                    "links": [
                        { title: "联网", href: "/chat/base/8/5" },
                        { title: "网页总结", href: "/chat/summary/111/72" }
                    ]
                },
                {
                    "title": "绘图",
                    "links": [
                        { title: "Midjourney", href: "/chat/base/9/32" },
                        { title: "Dalle-3", href: "/chat/base/114/17" },
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
                        { title: "祖母", href: "/chat/base/5/72" },
                        { title: "半仙", href: "/chat/base/4/72" },
                        { title: "佛祖", href: "/chat/base/106/8" },
                        { title: "牛破天", href: "/chat/base/102/72" },
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
                        { title: "助手", href: "/chat/base/3/72" },
                        { title: "智谱", href: "/chat/base/12/65" },
                        { title: "智脑", href: "/chat/base/11/45" },
                        { title: "GPT", href: "/chat/base/13/11" },
                        { title: "千问", href: "/chat/base/115/78" },
                        { title: "KIMI", href: "/chat/base/116/83" },
                        { title: "Gemini", href: "/chat/base/117/95" },
                        { title: "分析", href: "/chat/base/6/72" },
                        { title: "DBA", href: "/chat/base/104/72" },
                        { title: "语法优化", href: "/chat/base/1/72" },
                        { title: "中英互译", href: "/chat/base/7/72" }
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
                        { title: "周报", href: "/chat/base/110/8" },
                        { title: "助手", href: "/chat/base/3/72" },
                        { title: "小说家", href: "/chat/base/2/72" },
                        { title: "小红书创作", href: "/chat/base/107/72" },
                        { title: "爆款作家", href: "/chat/base/108/11" },
                        { title: "好评生成器", href: "/chat/base/109/72" },
                        { title: "项目起名大师", href: "/chat/base/100/72" },
                        { title: "Slogan生成大师", href: "/chat/base/105/72" },
                        { title: "词汇老师", href: "/chat/base/103/4" },
                    ]
                }
            ]
        },
        {
            "job": "GPTs",
            "items": [
                {
                    "title": "GPTs",
                    "links": [
                        { title: "图文故事", href: "/chat/base/8/77/56aUtyaYF" },
                        { title: "谐音梗🤪", href: "/chat/base/8/77/7nunLIRz8" },
                        { title: "清晰指南", href: "/chat/base/8/77/yIE7C91N3" },
                        { title: "Logo创造", href: "/chat/base/8/77/y2ep4oU9e" },
                        { title: "设计师", href: "/chat/base/8/77/bZfrNSWQ0" },
                        { title: "探索动物", href: "/chat/base/8/77/eNRHCLVnl" },
                        { title: "文档AI", href: "/chat/base/8/77/zk5H2G11H" },
                        { title: "郭德纲分身", href: "/chat/base/8/77/qdhTcI4hP" },
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