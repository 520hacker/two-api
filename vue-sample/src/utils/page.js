

import { ElMessage } from 'element-plus'
export function scrollToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight || document.body.scrollHeight,
        behavior: 'smooth'
    });
}

export function copyToClipboard(content) {
    try {
        const textarea = document.createElement('textarea');
        textarea.value = content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        ElMessage({
            type: 'success',
            message: '已复制!',
        })
    } catch {
        navigator.clipboard.writeText(content)
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '已复制!',
                })
                console.log('Content copied to clipboard');
            })
            .catch(() => {
                ElMessage({
                    type: 'error',
                    message: '复制失败,请稍后再试!',
                })
            });
    }
}