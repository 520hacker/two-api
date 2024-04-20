export function getMainModels() {
    return [{
        "id": "34",
        "label": "百度 ERNIE-Bot-turbo"
    }, {
        "id": "108",
        "label": "讯飞 SparkDesk3.5"
    }, {
        "id": "45",
        "label": "360智脑 360GPT_S2_V9"
    }, {
        "id": "78",
        "label": "阿里通义千问 qwen-max"
    }, {
        "id": "99",
        "label": "智谱 glm-4"
    }, {
        "id": "121",
        "label": "零一万物 yi-34b-chat-200k"
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
    const validModels = [
        "suno-v3",
        "sora-1.0-turbo",
        "pika-text-to-video",
        "domo-img-to-video",
        "net-gpt-3.5-turbo-16k",
        "net-gpt-4",
        'gpt-4',
        'gpt-4-0613',
        'gpt-4-0314',
        'gpt-4-32k',
        'gpt-4-32k-0613',
        'gpt-4-preview-0125',
        'gpt-4-32k-0314',
        'gpt-4-dalle',
        'gpt-4-v',
        'gpt-4-all',
        "gpt-4-turbo",
        "gpt-4-1106-preview",
        "gpt-4-1106-vision-preview",
        "gpt-4-gizmo-g",
        "gpt-4-vision-preview",
        "dall-e-3",
        "dall-e-2",
        "gemini-pro-vision",
        'mj',
        'mj-chat',
        'midjourney',
        'claude-3',
        "claude-3-opus-20240229",
        "claude-3-sonnet-20240229",
        "claude-3-haiku-20240307",
        "yi-34b-chat-200k",
        "yi-vl-plus",
        'characterglm'
    ];

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
            return "ChatGLM_Turbo";
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
        case "86":
            return "dall-e-3";
        case "87":
            return "hunyuan";
        case "88":
            return "dall-e-2";
        case "89":
            return "gpt-4-turbo";
        case "90":
            return "chat-bison-00";
        case "91":
            return "embedding-001";
        case "92":
            return "embedding-gecko-001";
        case "93":
            return "embedding-gecko-002";
        case "94":
            return "text-bison-001";
        case "95":
            return "gemini-pro";
        case "96":
            return "gemini-pro-vision";
        case "97":
            return "gemini-ultra";
        case "98":
            return "aqa";
        case "99":
            return "glm-4";
        case "100":
            return "mixtral-8x7b";
        case "101":
            return "mj-chat";
        case "102":
            return "gpt-3.5-turbo-0125";
        case "103":
            return "text-embedding-3-small";
        case "104":
            return "text-embedding-3-large";
        case "105":
            return "gpt-4-turbo-preview";
        case "106":
            return "gpt-4-0125-preview";
        case "107":
            return "text-moderation-007";
        case "108":
            return "SparkDesk3.5";
        case "109":
            return "search-gpts-chat";
        case "110":
            return "search-gpts";
        case "111":
            return "gpts-search";
        case "112":
            return "gpts-get";
        case "113":
            return "mistral-medium";
        case "114":
            return "qwen-72b";
        case "115":
            return "sora-1.0-turbo";
        case "116":
            return "claude-3";
        case "117":
            return "claude-3-opus-20240229";
        case "118":
            return "claude-3-sonnet-20240229";
        case "119":
            return "claude-3-haiku-20240307";
        case "120":
            return "yi-34b-chat-0205";
        case "121":
            return "yi-34b-chat-200k";
        case "122":
            return "yi-vl-plus";
        case "123":
            return "pika-text-to-video";
        case "124":
            return "domo-img-to-video";
        case "125":
            return "suno-v3";
        case "126":
            return "wbot-2";
        case "127":
            return "kimi";
        case "128":
            return "step";
        case "129":
            return "step-1-200k";
        case "130":
            return "step-1v-32k";
        case "131":
            return "deepseek-chat";
        case "132":
            return "deepseek-coder";
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
        "gpt-3.5-turbo-0125",
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
        "gpt-4-turbo",
        "gpt-4-turbo-preview",
        "gpt-4-0125-preview",
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
        "claude-3",
        "claude-3-opus-20240229",
        "claude-3-sonnet-20240229",
        "claude-3-haiku-20240307",

        "deepseek-chat",
        "deepseek-coder",

        "yi-34b-chat-0205",
        "yi-34b-chat-200k",
        "yi-vl-plus",
        "net-gpt-3.5-turbo-16k",
        "net-gpt-4",
        "midjourney",
        "mj",
        "mj-chat",
        "ERNIE-Bot",
        "ERNIE-Bot-turbo",
        "ERNIE-Bot-Pro",
        "chatglm",
        "chatglm_pro",
        "chatglm_std",
        "chatglm_lite",
        "ChatGLM_Turbo",
        "characterglm",
        "glm-4",
        "qwen-v1",
        "qwen-turbo",
        "qwen-plus-v1",
        "qwen-plus",
        "qwen-max-v1",
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
        "text-embedding-3-small",
        "text-embedding-3-large",
        "text-moderation-007",
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

        "pika-text-to-video",
        "domo-img-to-video",
        "suno-v3",

        "mixtral-8x7b",
        "search-gpts-chat",
        "search-gpts",
        "gpts-search",
        "gpts-get",
        "mistral-medium",
        "qwen-72b",
        "sora-1.0-turbo",
        "wbot-2",
        "kimi",
        "step",
        "step-1-200k",
        "step-1v-32k"
    ];
}