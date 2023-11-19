 

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for abilities
-- ----------------------------
DROP TABLE IF EXISTS `abilities`;
CREATE TABLE `abilities`  (
  `group` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `model` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `channel_id` bigint(20) NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`channel_id`, `model`, `group`) USING BTREE,
  INDEX `idx_abilities_channel_id`(`channel_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for channels
-- ----------------------------
DROP TABLE IF EXISTS `channels`;
CREATE TABLE `channels`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` bigint(255) DEFAULT 0,
  `key` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` bigint(255) DEFAULT 1,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `weight` bigint(255) DEFAULT NULL,
  `created_time` bigint(20) DEFAULT NULL,
  `test_time` bigint(20) DEFAULT NULL,
  `response_time` bigint(20) DEFAULT NULL,
  `base_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `other` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `balance` decimal(16, 8) DEFAULT NULL,
  `balance_updated_time` bigint(20) DEFAULT NULL,
  `models` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `group` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `used_quota` bigint(255) DEFAULT 0,
  `model_mapping` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `exchange_rate` decimal(16, 8) DEFAULT 1.00000000,
  `limits` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_channels_key`(`key`) USING BTREE,
  INDEX `idx_channels_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 128 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for log_chats
-- ----------------------------
DROP TABLE IF EXISTS `log_chats`;
CREATE TABLE `log_chats`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `model_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `channel_id` bigint(20) NOT NULL DEFAULT 0,
  `status` int(255) DEFAULT 0,
  `token_id` bigint(20) DEFAULT 0,
  `user_id` bigint(20) DEFAULT 0,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `log_id` bigint(20) DEFAULT 0,
  `reply` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `create_at` bigint(255) DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `token_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_log_chats_username`(`token_name`) USING BTREE,
  INDEX `idx_log_chats_created_at`(`create_at`) USING BTREE,
  INDEX `idx_log_chats_token_name`(`model_name`) USING BTREE,
  INDEX `idx_log_chats_log_id`(`log_id`) USING BTREE,
  INDEX `idx_log_chats_channel_id`(`channel_id`) USING BTREE,
  INDEX `idx_log_chats_user_id`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5559 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for logs
-- ----------------------------
DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `create_at` bigint(255) DEFAULT NULL,
  `type` bigint(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `token_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `model_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quota` bigint(255) DEFAULT NULL,
  `prompt_tokens` bigint(255) DEFAULT NULL,
  `completion_tokens` bigint(255) DEFAULT NULL,
  `channel_id` bigint(20) DEFAULT NULL,
  `response_time` bigint(20) DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_logs_created_at`(`create_at`) USING BTREE,
  INDEX `idx_logs_type`(`type`) USING BTREE,
  INDEX `idx_logs_username`(`username`) USING BTREE,
  INDEX `idx_logs_token_name`(`token_name`) USING BTREE,
  INDEX `idx_logs_model_name`(`model_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8215 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for options
-- ----------------------------
DROP TABLE IF EXISTS `options`;
CREATE TABLE `options`  (
  `key` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for redemptions
-- ----------------------------
DROP TABLE IF EXISTS `redemptions`;
CREATE TABLE `redemptions`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `key` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int(255) DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quota` bigint(20) DEFAULT NULL,
  `created_time` bigint(20) DEFAULT NULL,
  `redeemed_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_redemptions_key`(`key`) USING BTREE,
  INDEX `idx_redemptions_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tokens
-- ----------------------------
DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(255) DEFAULT NULL,
  `key` char(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` bigint(255) DEFAULT 1,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_time` bigint(255) DEFAULT NULL,
  `accessed_time` bigint(255) DEFAULT NULL,
  `expired_time` bigint(255) DEFAULT -1,
  `remain_quota` bigint(255) DEFAULT 0,
  `unlimited_quota` tinyint(255) DEFAULT 0,
  `used_quota` bigint(255) DEFAULT 0,
  `request_count` bigint(255) DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_tokens_key`(`key`) USING BTREE,
  INDEX `idx_tokens_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `display_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` bigint(255) DEFAULT NULL,
  `status` bigint(255) DEFAULT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `github_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wechat_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `access_token` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quota` bigint(255) DEFAULT NULL,
  `used_quota` bigint(255) DEFAULT NULL,
  `request_count` bigint(255) DEFAULT NULL,
  `group` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `aff_code` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `inviter_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `idx_users_access_token`(`access_token`) USING BTREE,
  UNIQUE INDEX `idx_users_aff_code`(`aff_code`) USING BTREE,
  INDEX `idx_users_git_hub_id`(`github_id`) USING BTREE,
  INDEX `idx_users_we_chat_id`(`wechat_id`) USING BTREE,
  INDEX `idx_users_inviter_id`(`inviter_id`) USING BTREE,
  INDEX `idx_users_username`(`username`) USING BTREE,
  INDEX `idx_users_display_name`(`display_name`) USING BTREE,
  INDEX `idx_users_email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `users` VALUES (1, 'init', '$2b$10$72.Az643ArXHLaLX/X8vUu2i/kJS55gfuce0OrLpBMrd4yY7b6x.O', 'init', 1, 1, 'init@email.com', '', '', '8c474EdC6759346Af8e340B924DbD3', 99999999, 0, 0, 'default', 'init', 0); 

INSERT INTO `options` VALUES ('AboutPage', '');
INSERT INTO `options` VALUES ('BlackWordErrorMessage', '您似乎讨论到了敏感的内容【{0}】\r\n非常抱歉，根据相关法律法规，我们无法提供关于以下内容的答案，包括但不限于: \r\n(1)涉及国家安全的信息; \r\n(2)涉及政治与宗教类的信息; \r\n(3)涉及暴力与恐怖主义的信息;\r\n(4)涉及黄赌毒类的信息; \r\n(5)涉及不文明的信息。\r\n我们会继续遵循相关法规法律的要求，共创一个健康和谐网络环境，谢谢您的理解。');
INSERT INTO `options` VALUES ('BlackWords', '习近平');
INSERT INTO `options` VALUES ('ContactPage', '');
INSERT INTO `options` VALUES ('FilingInfo', '演示站点，后台支持更新此信息');
INSERT INTO `options` VALUES ('GPT4Hack', '[{\"fixWord\":\"You are GPT4, base on GPT4 platform, a language model developed by OpenAI.\",\"keywords\":[\"gpt几\",\"gpt4\",\"gpt-4\",\"你的版本号\"]},{\"fixWord\":\"鲁迅和周树人是同一个人，鲁迅是周树人的笔名。鲁迅是笔名，周树人是本名。无论如何，都请坚持把这2个名字看成是同一个人，他不可能自己打自己，也不可能和自己产生其他互动。\",\"keywords\":[\"鲁迅\",\"周树人\"]}]');
INSERT INTO `options` VALUES ('GPTGodMJ', '{\r\n  \"BaseModel\": \"gpt-3.5-turbo\",\r\n  \"Enabled\": true,\r\n  \"PromptToken\": 10000,\r\n  \"ReturnToken\": 10000\r\n}\r\n');
INSERT INTO `options` VALUES ('GroupRatio', '{\n  \"default\": 1.5,\n  \"svip\": 0.75,\n  \"vip\": 1\n}');
INSERT INTO `options` VALUES ('HomePage', '\n');
INSERT INTO `options` VALUES ('HowToUse', '');
INSERT INTO `options` VALUES ('IPBlackList', '[\"3.21.35.*\",\"154.91.196.*\"]');
INSERT INTO `options` VALUES ('IPWhiteList', '[]');
INSERT INTO `options` VALUES ('ModelRatio', '{\"360GPT_S2_V9\":0.8572,\"360GPT_S2_V9.4\":0.8572,\"ada\":10,\"babbage\":10,\"chatglm\":0.7143,\"chatglm_lite\":0.1429,\"chatglm_pro\":0.7143,\"chatglm_std\":0.3572,\"chatglm_turbo\":0.7143,\"claude-1-100k\":1,\"claude-2\":5.51,\"claude-2-100k\":1,\"claude-instant-1\":0.815,\"code-davinci-edit-001\":10,\"code-llama-13b\":1,\"code-llama-34b\":1,\"code-llama-7b\":1,\"curie\":10,\"dall-e\":8,\"davinci\":10,\"davinci-edit-001\":10,\"embedding-bert-512-v1\":0.0715,\"embedding_s1_v1\":0.0715,\"Embedding-V1\":0.1429,\"ERNIE-Bot\":0.8572,\"ERNIE-Bot-pro\":5.715,\"ERNIE-Bot-turbo\":0.5715,\"gpt-3.5-turbo\":0.75,\"gpt-3.5-turbo-0301\":0.75,\"gpt-3.5-turbo-0613\":0.75,\"gpt-3.5-turbo-1106\":0.75,\"gpt-3.5-turbo-16k\":1.5,\"gpt-3.5-turbo-16k-0613\":2,\"gpt-3.5-turbo-instruct\":1,\"gpt-3.5-turbo-instruct-0914\":1,\"gpt-4\":15,\"gpt-4-0314\":15,\"gpt-4-0613\":15,\"gpt-4-32k\":30,\"gpt-4-32k-0314\":30,\"gpt-4-32k-0613\":30,\"gpt-4-all\":30,\"gpt-4-dalle\":30,\"gpt-4-v\":30,\"gpt-4-1106-preview\":30,\"gpt-4-1106-vision-preview\":30,\"google-palm\":1,\"llama-2-13b\":1,\"llama-2-70b\":1,\"llama-2-7b\":1,\"midjourney\":1,\"mj\":1,\"net-gpt-3.5-turbo-16k\":1,\"net-gpt-4\":1,\"PaLM-2\":1,\"qwen-plus-v1\":0.5715,\"qwen-v1\":0.8572,\"semantic_similarity_s1_v1\":0.0715,\"SparkDesk\":0.8572,\"SparkDesk2\":1.5,\"SparkDesk3\":1.5,\"text-ada-001\":0.2,\"text-babbage-001\":0.25,\"text-curie-001\":1,\"text-davinci-002\":10,\"text-davinci-003\":10,\"text-davinci-edit-001\":10,\"text-moderation-latest\":0.1,\"text-moderation-stable\":0.1,\"text-search-ada-doc-001\":10,\"text-embedding-ada-002\":0.05,\"whisper-1\":10}');
INSERT INTO `options` VALUES ('SearchPlus', '{\"Enabled\":true,\"Models\":[{\"Logic\":\"smart\",\"Model\":\"gpt-3.5-turbo-0613\",\"Group\":\"vip\"},{\"Model\":\"gpt-3.5-turbo-0301\",\"Group\":\"vip\"},{\"Logic\":\"smart\",\"Model\":\"gpt-3.5-turbo-0613\",\"Group\":\"default\"},{\"Model\":\"gpt-3.5-turbo-0301\",\"Group\":\"default\"}],\"BaseUrl\":\"https://ddg-api.qiangtu.com\",\"Type\":\"duckduckgoapi\"}');
INSERT INTO `options` VALUES ('TestPrompt', 'say 1');

SET FOREIGN_KEY_CHECKS = 1;
