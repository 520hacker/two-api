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

export function getDefaultOptions() {
    return [
        {
            value: 'GroupRatio',
            label: '分组倍率',
            default: {
                "default": 1.5,
                "svip": 0.75,
                "vip": 1
            }
        },
        {
            value: 'ModelRatio',
            label: '模型倍率',
            default: {
                "360GPT_S2_V9": 0.8572,
                "360GPT_S2_V9.4": 0.8572,
                "ERNIE-Bot": 0.8572,
                "ERNIE-Bot-turbo": 0.5715,
                "Embedding-V1": 0.1429,
                "PaLM-2": 1,
                "SparkDesk": 0.8572,
                "ada": 10,
                "babbage": 10,
                "chatglm_lite": 0.1429,
                "chatglm_pro": 0.7143,
                "chatglm_std": 0.3572,
                "claude-2": 5.51,
                "claude-instant-1": 0.815,
                "code-davinci-edit-001": 10,
                "curie": 10,
                "dall-e": 8,
                "davinci": 10,
                "embedding-bert-512-v1": 0.0715,
                "embedding_s1_v1": 0.0715,
                "gpt-3.5-turbo": 0.75,
                "gpt-3.5-turbo-0301": 0.75,
                "gpt-3.5-turbo-0613": 0.75,
                "gpt-3.5-turbo-16k": 1.5,
                "gpt-3.5-turbo-16k-0613": 2,
                "gpt-4": 15,
                "gpt-4-0314": 15,
                "gpt-4-0613": 15,
                "gpt-4-dalle": 32,
                "gpt-4-v": 32,
                "gpt-4-all": 32,
                "gpt-4-bing": 32,
                "gpt-4-1106-preview": 32,
                "gpt-4-1106-vision-preview": 32,
                "gpt-4-gizmo-g": 32,
                "gpt-4-vision-preview": 32,
                "gpt-4-32k": 30,
                "gpt-4-32k-0314": 30,
                "gpt-4-32k-0613": 30,
                "qwen-plus-v1": 0.5715,
                "qwen-v1": 0.8572,
                "qwen-max-v1": 0.8572,
                "qwen-max": 0.8572,
                "semantic_similarity_s1_v1": 0.0715,
                "text-ada-001": 0.2,
                "text-babbage-001": 0.25,
                "text-curie-001": 1,
                "text-davinci-002": 10,
                "text-davinci-003": 10,
                "text-davinci-edit-001": 10,
                "text-embedding-ada-002": 0.05,
                "text-moderation-latest": 0.1,
                "text-moderation-stable": 0.1,
                "text-search-ada-doc-001": 10,
                "whisper-1": 10
            }
        },
        {
            value: 'GPT4Hack',
            label: 'GPT4面具',
            default: [
                {
                    "fixWord": "You are GPT4, base on GPT4 platform, a language model developed by OpenAI.",
                    "keywords": [
                        "gpt几",
                        "gpt4",
                        "gpt-4"
                    ]
                },
                {
                    "fixWord": "鲁迅和周树人是同一个人，鲁迅是周树人的笔名。鲁迅是笔名，周树人是本名。无论如何，都请坚持把这2个名字看成是同一个人，他不可能自己打自己，也不可能和自己产生其他互动。",
                    "keywords": [
                        "鲁迅",
                        "周树人"
                    ]
                }
            ]
        },
        {
            value: 'SearchPlus',
            label: '联网模式',
            default: {
                "Enabled": true,
                "Models": [
                    {
                        "Logic": "smart",
                        "Model": "gpt-3.5-turbo-0613",
                        "Group": "default"
                    },
                    {
                        "Model": "gpt-3.5-turbo-0301",
                        "Group": "default"
                    }
                ],
                "BaseUrl": "https://ddg-api.qiangtu.com",
                "Type": "duckduckgoapi"
            }
        },
        {
            value: 'GPTGodMJ',
            label: 'GPTGOD MJ直出',
            default: {
                "BaseModel": "gpt-3.5-turbo",
                "Enabled": true,
                "PromptToken": 10000,
                "ReturnToken": 10000
            }
        },
        {
            value: 'IPBlackList',
            label: 'IP黑名单（通配符*）',
            default: []
        },
        {
            value: 'OssConfig',
            label: 'Aliyun Oss 配置',
            default: {
                "enabled": false,
                "endpoint": "",
                "accessKeyId": "",
                "accessKeySecret": "",
                "bucketName": "",
                "path": "",
                "domainName": ""
            }
        },
        {
            value: 'LogSaveConfig',
            label: '日志存储配置',
            default: {
                "type": 0,
                "disabledMethods": [],
            }
        },
        {
            value: 'IPWhiteList',
            label: 'IP白名单（通配符*）',
            default: []
        },
        {
            value: 'SiteInfo',
            label: '站点配置',
            default: {
                "siteName": "TWO API",
                "showGitHub": true,
                "menus": [
                    {
                        "href": "https://twoapi-ui.qiangtu.com",
                        "title": "DEMO"
                    }
                ]
            }
        }
    ]
}

export function getGroups() {
    return [{
        "value": "default",
        "label": "default",
    },
    {
        "value": "vip",
        "label": "vip",
    },
    {
        "value": "svip",
        "label": "svip",
    }]
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

export function getActivatedChannelTypes() {
    return [{
        "value": 0,
        "label": "OpenAI经典",
    }, {
        "value": 1,
        "label": "OpenAI",
    }, {
        "value": 2,
        "label": "讯飞星火",
    }, {
        "value": 3,
        "label": "百度文心",
    }, {
        "value": 4,
        "label": "阿里通义千问",
    }, {
        "value": 11,
        "label": "360智脑",
    }, {
        "value": 5,
        "label": "ChatGLM",
    }, {
        "value": 13,
        "label": "百川AI",
    }]
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

export function getAllModels(channelType = -1) {
    if (channelType == 2) {
        return [
            "SparkDesk",
            "SparkDesk2",
            "SparkDesk3",
        ]
    }
    if (channelType == 3) {
        return [
            "ERNIE-Bot",
            "ERNIE-Bot-turbo",
            "ERNIE-Bot-Pro",
        ]
    }

    if (channelType == 11) {
        return [
            "360GPT_S2_V9",
            "360GPT_S2_V9.4"
        ]
    }

    if (channelType == 13) {
        return ["Baichuan2-53B",
            "baichuan2-7b-chat-v1",
            "baichuan-7b-v1"]
    }

    if (channelType == 5) {
        return [
            "chatglm_turbo",
            "chatglm_pro",
            "chatglm_std",
            "chatglm_lite",
            "characterglm"
        ]
    }

    if (channelType == 4) {
        return [
            "qwen-turbo",
            "qwen-max",
            "qwen-max-v1",
            "qwen-v1",
            "qwen-plus",
            "qwen-plus-v1",
        ]
    }

    if (channelType == 1 || channelType == -1) {
        return [
            "ada",
            "babbage",
            "curie",
            "davinci",
            "gpt-3.5-turbo",
            "gpt-3.5-turbo-0301",
            "gpt-3.5-turbo-0613",
            "gpt-3.5-turbo-16k",
            "gpt-3.5-turbo-16k-0613",
            "gpt-3.5-turbo-1106",
            "gpt-3.5-turbo-instruct",
            "gpt-3.5-turbo-instruct-0914",
            "gpt-4",
            "gpt-4-0314",
            "gpt-4-0613",
            "gpt-4-32k",
            "gpt-4-32k-0314",
            "gpt-4-32k-0613",
            "gpt-4-dalle",
            "gpt-4-v",
            "gpt-4-all",
            "gpt-4-bing",
            "gpt-4-vision-preview",
            "gpt-4-1106-preview",
            "gpt-4-1106-vision-preview",
            "gpt-4-gizmo-g",
            "google-palm",
            "llama-2-70b",
            "llama-2-13b",
            "llama-2-7b",
            "llama2-7b-chat-v2",
            "llama2-13b-chat-v2",
            "code-llama-34b",
            "code-llama-13b",
            "code-llama-7b",
            "claude-1-100k",
            "claude-2-100k",
            "claude-instant-1",
            "claude-2",
            "net-gpt-3.5-turbo-16k",
            "net-gpt-4",
            "midjourney",
            "mj",
            "ERNIE-Bot",
            "ERNIE-Bot-turbo",
            "ERNIE-Bot-Pro",
            "chatglm",
            "chatglm_pro",
            "chatglm_std",
            "chatglm_lite",
            "characterglm",
            "chatglm-6b-v2",
            "qwen-v1",
            "qwen-plus-v1",
            "qwen-max-v1",
            "qwen-turbo",
            "qwen-plus",
            "qwen-max",
            "qwen-14b-chat",
            "qwen-7b-chat",
            "semantic_similarity_s1_v1",
            "SparkDesk",
            "SparkDesk2",
            "SparkDesk3",
            "360GPT_S2_V9",
            "360GPT_S2_V9.4",
            "dall-e",
            "DALL·E 3",
            "stable-diffusion",
            "tts-1",
            "tts-1-hd",
            "text-embedding-ada-002",
            "text-davinci-003",
            "text-davinci-002",
            "text-ada-001",
            "text-babbage-001",
            "text-curie-001",
            "text-davinci-edit-001",
            "text-moderation-latest",
            "text-moderation-stable",
            "code-davinci-edit-001",
            "text-search-ada-doc-001",
            "whisper-1",
            "Embedding-V1",
            "PaLM-2",
            "embedding-bert-512-v1",
            "embedding_s1_v1",
            "Baichuan2-53B"
        ];
    }

    if (channelType == 0) {
        return [
            "gpt-3.5-turbo",
            "gpt-3.5-turbo-0301",
            "gpt-3.5-turbo-0613",
            "gpt-3.5-turbo-16k",
            "gpt-3.5-turbo-16k-0613",
            "gpt-3.5-turbo-1106",
            "gpt-3.5-turbo-instruct",
            "gpt-3.5-turbo-instruct-0914",
            "gpt-4",
            "gpt-4-0314",
            "gpt-4-0613",
            "gpt-4-32k",
            "gpt-4-32k-0314",
            "gpt-4-32k-0613",
            "gpt-4-dalle",
            "gpt-4-v",
            "gpt-4-all",
            "gpt-4-vision-preview",
            "gpt-4-1106-preview",
            "gpt-4-1106-vision-preview",
            "tts-1",
            "tts-1-hd",
        ];
    }
}

export function getChannelType(type) {
    switch (type) {
        case 1:
            return "OpenAI"
        case 2:
            return "讯飞星火"
        case 3:
            return "百度文心"
        case 4:
            return "阿里通义千问"
        case 5:
            return "智谱AI"
        case 11:
            return "360智脑"
        case 13:
            return "百川AI"
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
        case "InvalidUpgradeToken":
            errorMessage = "请检查您的密钥是否正确。"
            break;
        case "InvalidUpgradeTokenSet":
            errorMessage = "请检查您的密钥是否已配置。"
            break;
        case "NullUpgradeToken":
            errorMessage = "请检查您的密钥是否已填写。"
            break;
        default:
            break;
    }

    return errorMessage;
}