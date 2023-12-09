export function getMainModels() {
    return [{
        "id": "34",
        "label": "百度 ERNIE-Bot-turbo"
    }, {
        "id": "44",
        "label": "讯飞 SparkDesk3"
    }, {
        "id": "45",
        "label": "360智脑 360GPT_S2_V9"
    }, {
        "id": "78",
        "label": "阿里通义千问 qwen-max"
    }, {
        "id": "65",
        "label": "智谱 chatglm-turbo"
    }, {
        "id": "67",
        "label": "百川 Baichuan2-53B"
    }, {
        "id": "83",
        "label": "月之暗面 moonshot-v1-8k"
    }, {
        "id": "5",
        "label": "联网搜索"
    }, {
        "id": "7",
        "label": "其他"
    }]
}

export function getCheepModel(cur_model) {
    const validModels = ['gpt-3.5-turbo-0301', 'gpt-3.5-turbo-0613',
        "net-gpt-3.5-turbo-16k", "net-gpt-4",
        'gpt-4', 'gpt-4-0613', 'gpt-4-0314', 'gpt-4-32k', 'gpt-4-32k-0613',
        'gpt-4-32k-0314', 'gpt-4-dalle', 'gpt-4-v', 'gpt-4-all',
        "gpt-4-1106-preview", "gpt-4-1106-vision-preview",
        "gpt-4-gizmo-g", "gpt-4-vision-preview",
        'mj', 'midjourney', 'characterglm'];

    if (validModels.includes(cur_model)) {
        cur_model = 'gpt-3.5-turbo-16k';
    }

    return cur_model;
}

export function getModel(id) {
    switch (id) {
        case "0":
            return "ada";
        case "1":
            return "babbage";
        case "2":
            return "curie";
        case "3":
            return "davinci";
        case "4":
            return "gpt-3.5-turbo";
        case "5":
            return "gpt-3.5-turbo-0301";
        case "6":
            return "gpt-3.5-turbo-0613";
        case "7":
            return "gpt-3.5-turbo-16k";
        case "8":
            return "gpt-3.5-turbo-16k-0613";
        case "9":
            return "gpt-3.5-turbo-instruct";
        case "10":
            return "gpt-3.5-turbo-instruct-0914";
        case "11":
            return "gpt-4";
        case "12":
            return "gpt-4-0314";
        case "13":
            return "gpt-4-0613";
        case "14":
            return "gpt-4-32k";
        case "15":
            return "gpt-4-32k-0314";
        case "16":
            return "gpt-4-32k-0613";
        case "17":
            return "gpt-4-dalle";
        case "18":
            return "google-palm";
        case "19":
            return "llama-2-70b";
        case "20":
            return "llama-2-13b";
        case "21":
            return "llama-2-7b";
        case "22":
            return "code-llama-34b";
        case "23":
            return "code-llama-13b";
        case "24":
            return "code-llama-7b";
        case "25":
            return "claude-1-100k";
        case "26":
            return "claude-2-100k";
        case "27":
            return "claude-instant-1";
        case "28":
            return "claude-2";
        case "29":
            return "net-gpt-3.5-turbo-16k";
        case "30":
            return "net-gpt-4";
        case "31":
            return "midjourney";
        case "32":
            return "mj";
        case "33":
            return "ERNIE-Bot";
        case "34":
            return "ERNIE-Bot-turbo";
        case "35":
            return "ERNIE-Bot-Pro";
        case "36":
            return "chatglm_pro";
        case "37":
            return "chatglm_std";
        case "38":
            return "chatglm_lite";
        case "39":
            return "qwen-v1";
        case "40":
            return "qwen-plus-v1";
        case "41":
            return "semantic_similarity_s1_v1";
        case "42":
            return "SparkDesk";
        case "43":
            return "SparkDesk2";
        case "44":
            return "SparkDesk3";
        case "45":
            return "360GPT_S2_V9";
        case "46":
            return "360GPT_S2_V9.4";
        case "47":
            return "dall-e";
        case "48":
            return "text-embedding-ada-002";
        case "49":
            return "text-davinci-003";
        case "50":
            return "text-davinci-002";
        case "51":
            return "text-ada-001";
        case "52":
            return "text-babbage-001";
        case "53":
            return "text-curie-001";
        case "54":
            return "text-davinci-edit-001";
        case "55":
            return "text-moderation-latest";
        case "56":
            return "text-moderation-stable";
        case "57":
            return "code-davinci-edit-001";
        case "58":
            return "text-search-ada-doc-001";
        case "59":
            return "whisper-1";
        case "60":
            return "Embedding-V1";
        case "61":
            return "PaLM-2";
        case "62":
            return "embedding-bert-512-v1";
        case "63":
            return "embedding_s1_v1";
        case "64":
            return "gpt-4-bing";
        case "65":
            return "chatglm_turbo";
        case "66":
            return "characterglm";
        case "67":
            return "Baichuan2-53B";
        case "68":
            return "chatglm";
        case "69":
            return "gpt-4-all";
        case "70":
            return "gpt-4-v";
        case "71":
            return "stable-diffusion";
        case "72":
            return "gpt-4-1106-preview";
        case "73":
            return "gpt-4-1106-vision-preview";
        case "74":
            return "tts-1";
        case "75":
            return "tts-1-hd";
        case "76":
            return "gpt-3.5-turbo-1106";
        case "77":
            return "gpt-4-gizmo-g";
        case "78":
            return "qwen-max";
        case "79":
            return "qwen-turbo";
        case "80":
            return "qwen-plus";
        case "81":
            return "qwen-max-v1";
        case "82":
            return "gpt-4-vision-preview";
        case "83":
            return "moonshot-v1-8k";
        case "84":
            return "moonshot-v1-32k";
        case "85":
            return "moonshot-v1-128k";
        default:
            return "gpt-3.5-turbo-16k";
    }
}

export function getAllModels() {
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
        "gpt-4-1106-preview",
        "gpt-4-1106-vision-preview",
        "gpt-4-vision-preview",
        "gpt-4-gizmo-g",
        "google-palm",
        "llama-2-70b",
        "llama-2-13b",
        "llama-2-7b",
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
        "chatglm_turbo",
        "characterglm",
        "qwen-v1",
        "qwen-plus-v1",
        "qwen-max-v1",
        "semantic_similarity_s1_v1",
        "SparkDesk",
        "SparkDesk2",
        "SparkDesk3",
        "360GPT_S2_V9",
        "360GPT_S2_V9.4",
        "dall-e",
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
        "gpt-4-bing",
        "Baichuan2-53B",
        "stable-diffusion",
        "moonshot-v1-8k",
        "moonshot-v1-32k",
        "moonshot-v1-128k",
    ];
}