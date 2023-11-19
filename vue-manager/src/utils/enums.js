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
        "value": 1,
        "label": "OpenAI",
    }, {
        "value": 2,
        "label": "讯飞星火",
    }, {
        "value": 3,
        "label": "百度文心",
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
            "gpt-4-1106-preview",
            "gpt-4-1106-vision-preview",
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
            "qwen-turbo",
            "qwen-plus",
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
}

export function getChannelType(status) {
    switch (status) {
        case 1:
            return "OpenAI"
        case 2:
            return "讯飞星火"
        case 3:
            return "百度文心"
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
        default:
            break;
    }
    return errorMessage;
}