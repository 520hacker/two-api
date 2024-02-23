export function getChannelStatus(status) {
    switch (status) {
        case -1:
            return "回收站"
        case 1:
            return "启用"
        case 2:
            return "禁用"
        default:
            return "未知"
    }
}

export function getAllLogTypes() {
    return [
        {
            "value": 2,
            "label": "消费"
        },
        {
            "value": 4,
            "label": "更新文档"
        },
        {
            "value": 8,
            "label": "充值"
        },
        {
            "value": 16,
            "label": "配置"
        },
        {
            "value": 32,
            "label": "禁用频道"
        },
        {
            "value": 128,
            "label": "频道降权"
        },
    ];
}

export function getDefaultOptions() {
    return [
        {
            value: 'FixedQA',
            label: '固定回复',
            default: {
                "Say 1": "1"
            }
        },
        {
            value: 'LoadBalanceConfig',
            label: '负载均衡设置',
            default: {
                "type": 1,
                "updateTimeonConnection": true
            }
        }, 
        {
            value: 'CustomErrors',
            label: '自定义错误消息',
            default: {
                "enabled": true,
                "messages": {
                    "AccessDenied": "访问被拒绝",
                    "DataNotExits": "数据或内容不存在",
                    "Unknown": "未知的 API 错误",
                    "InvalidSessionId": "无效的会话 ID",
                    "InvalidUserName": "无效的用户名",
                    "InvalidPassword": "无效的密码",
                    "InvalidUserAccessToken": "无效的用户访问令牌",
                    "InvalidCount": "无效的计数",
                    "InvalidSortKey": "无效的排序键",
                    "InvalidSortDirection": "无效的排序方向",
                    "InvalidOffset": "无效的偏移量",
                    "InvalidLimit": "无效的限制数",
                    "InvalidId": "无效的 ID",
                    "InvalidKey": "无效的键",
                    "InvalidValue": "无效的值",
                    "InvalidName": "无效的名称",
                    "InvalidConfirmPassword": "无效的确认密码",
                    "InvalidEmail": "无效的电子邮件",
                    "InvalidExitsUserName": "无效的已存在用户名",
                    "InvalidExitsEmail": "无效的已存在电子邮件",
                    "InvalidUsername": "无效的用户名",
                    "InvalidPasswordComplex": "无效的密码复杂度",
                    "InvalidUserNameLength": "无效的用户名长度",
                    "InvalidPasswordSafe": "无效的密码安全性",
                    "InvalidTokenUser": "无效的令牌用户",
                    "InsufficientTokens": "令牌不足",
                    "InvalidToken": "找到不到匹配的Token",
                    "InvalidUserBalance": "用户额度不足",
                    "InvalidChannel": "指定的KEY没有匹配的频道",
                    "InvalidChannelType": "无效的频道类型",
                    "InvalidType": "无效的类型",
                    "InvalidModels": "无效的模型",
                    "InvalidGroup": "无效的组",
                    "ChannelAlreadyExists": "频道已存在",
                    "TokenExpired": "Token已过期",
                    "DeleteSelfError": "删除自身错误",
                    "DisableSelfError": "禁用自身错误",
                    "InvalidUserStatus": "无效的用户状态",
                    "InvalidKeyAccess": "无效的键访问",
                    "InvalidRedemption": "无效的兑换",
                    "InvalidUserId": "无效的用户 ID",
                    "InvalidRedemptionStatus": "无效的兑换状态",
                    "MessageIllegal": "您似乎什么都没说",
                    "InvalidLoginAttempNumbers": "无效的登录尝试次数",
                    "InvalidTokenAttempNumbers": "无效的令牌尝试次数",
                    "IpRestricted": "IP 受限",
                    "InvalidUpgradeToken": "无效的升级令牌",
                    "InvalidUpgradeTokenSet": "无效的升级令牌集",
                    "NullUpgradeToken": "空的升级令牌",
                    "InvalidFile": "无效的文件",
                    "InvalidModel": "指定的模型{0}基于当前Token已禁用",
                    "UserRegisterDisabled": "用户注册已禁用",
                    "TokenDisabled": "Token已禁用",
                    "InvalidURL": "您未提供任何需要总结的链接"
                }
            }
        },
        {
            value: 'GroupAdvertisement',
            label: '分组广告',
            default: {
                "default": {
                    "appender": {
                        "enabled": true,
                        "type": 1,
                        "models": ["gpt-3.5-turbo-16k", "gpt-4-0314"],
                        "modelWhiteList": ["dall-e-3", "mj", "mj-chat", "gpt-4-dalle3"],
                        "contents": [
                            "您看到了一条广告",
                            "您看到了另外一条广告"
                        ]
                    }
                }
            }
        },
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
                "SparkDesk3.5": 1,
                "ada": 10,
                "babbage": 10,
                "chatglm_lite": 0.1429,
                "chatglm_pro": 0.7143,
                "chatglm_std": 0.3572,
                "glm-4": 1,
                "claude-2": 5.51,
                "claude-instant-1": 0.815,
                // "code-davinci-edit-001": 10,
                "curie": 10,
                "dall-e": 8,
                "dall-e-2": 8,
                "dall-e-3": 16,
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
                "qwen-plus": 0.5715,
                "qwen-v1": 0.8572,
                "qwen-turbo": 0.8572,
                "qwen-max-v1": 0.8572,
                "qwen-max": 0.8572,
                "semantic_similarity_s1_v1": 0.0715,
                // "text-ada-001": 0.2,
                // "text-babbage-001": 0.25,
                // "text-curie-001": 1,
                // "text-davinci-002": 10,
                // "text-davinci-003": 10,
                // "text-davinci-edit-001": 10,
                "text-embedding-ada-002": 0.05,
                "text-moderation-latest": 0.1,
                "text-moderation-stable": 0.1,
                // "text-search-ada-doc-001": 10,
                "whisper-1": 10,
                "moonshot-v1-8k": 0.8572,
                "moonshot-v1-32k": 0.8572,
                "moonshot-v1-128k": 0.8572,
                "hunyuan": 10,
                "gemini-pro": 2,
                "gemini-pro-vision": 2,

                "gpt-3.5-turbo-0125": 1,
                "text-embedding-3-small": 1,
                "text-embedding-3-large": 1,
                "gpt-4-turbo-preview": 1,
                "gpt-4-0125-preview": 1,
                "text-moderation-007": 1
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
            value: 'UserRegisterConfig',
            label: '注册与注册赠送设置',
            default: {
                "enabled": true,
                "autoGenerateKey": true,
                "giftToken": 10000
            }
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
        "value": 7,
        "label": "Google Gemini",
    }, {
        "value": 11,
        "label": "360智脑",
    }, {
        "value": 14,
        "label": "月之暗面",
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

export function get35Models() {
    return [
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-0301",
        "gpt-3.5-turbo-0613",
        "gpt-3.5-turbo-16k",
        "gpt-3.5-turbo-16k-0613",
        "gpt-3.5-turbo-1106",
        "gpt-3.5-turbo-0125",
        "tts-1",
        "tts-1-hd",
        "whisper-1",
    ];
}

export function get40Models() {
    return [
        "gpt-4",
        "gpt-4-0314",
        "gpt-4-0613",
        "gpt-4-32k",
        "gpt-4-32k-0314",
        "gpt-4-32k-0613",
        "gpt-4-1106-preview",
    ];
}

export function getAllModels(channelType = -1) {
    if (channelType == 7) {
        return [
            "chat-bison-00",
            "embedding-001",
            "embedding-gecko-001",
            "embedding-gecko-002",
            "text-bison-001",
            "gemini-pro",
            "gemini-pro-vision",
            "gemini-ultra",
            "aqa",
        ]
    }
    if (channelType == 2) {
        return [
            "SparkDesk",
            "SparkDesk2",
            "SparkDesk3",
            "SparkDesk3.5"
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
            "ChatGLM_Turbo",
            "chatglm_pro",
            "chatglm_std",
            "chatglm_lite",
            "characterglm",
            "glm-4"
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

    if (channelType == 14) {
        return [
            "moonshot-v1-8k",
            "moonshot-v1-32k",
            "moonshot-v1-128k",
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

            "gpt-3.5-turbo-0125",
            "text-embedding-3-small",
            "text-embedding-3-large",
            "gpt-4-turbo-preview",
            "gpt-4-0125-preview",
            "text-moderation-007",

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
            "mj-chat",

            "search-gpts-chat",
            "search-gpts",
            "gpts-search",
            "gpts-get",
            "mistral-medium",
            "qwen-72b",

            "ERNIE-Bot",
            "ERNIE-Bot-turbo",
            "ERNIE-Bot-Pro",
            "chatglm",
            "chatglm_pro",
            "chatglm_std",
            "chatglm_lite",
            "characterglm",
            "chatglm-6b-v2",
            "glm-4",
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
            "SparkDesk3.5",
            "360GPT_S2_V9",
            "360GPT_S2_V9.4",
            "dall-e",
            "dall-e-2",
            "dall-e-3",
            "DALL·E 3",
            "stable-diffusion",
            "tts-1",
            "tts-1-1106",
            "tts-1-hd",
            "tts-1-hd-1106",
            "text-embedding-ada-002",
            // "text-davinci-003",
            // "text-davinci-002",
            // "text-ada-001",
            // "text-babbage-001",
            // "text-curie-001",
            // "text-davinci-edit-001",
            "text-moderation-latest",
            "text-moderation-stable",
            // "code-davinci-edit-001",
            // "text-search-ada-doc-001",
            "whisper-1",
            "Embedding-V1",
            "PaLM-2",
            "embedding-bert-512-v1",
            "embedding_s1_v1",
            "Baichuan2-53B",
            "moonshot-v1-8k",
            "moonshot-v1-32k",
            "moonshot-v1-128k",
            "hunyuan",
            "chat-bison-00",
            "embedding-001",
            "embedding-gecko-001",
            "embedding-gecko-002",
            "text-bison-001",
            "gemini-pro",
            "gemini-pro-vision",
            "gemini-ultra",
            "aqa",
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
            "tts-1-1106",
            "tts-1-hd",
            "tts-1-hd-1106",
            "gpt-3.5-turbo-0125",
            "text-embedding-3-small",
            "text-embedding-3-large",
            "gpt-4-turbo-preview",
            "gpt-4-0125-preview",
            "text-moderation-007",
            "whisper-1"
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
        case 7:
            return "Google"
        case 11:
            return "360智脑"
        case 13:
            return "百川AI"
        case 14:
            return "月之暗面"
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