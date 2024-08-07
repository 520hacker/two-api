<template>
    <div>loading...</div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
export default {
    name: 'HomePage',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const onLoad = () => {
            var id = route.params.gid
            if (id == "1") {
                localStorage.setItem('job', "默认")
                router.push(`/chat/base/0/99`);
            }

            if (id == "2") {
                localStorage.setItem('job', "人设")
                router.push(`/chat/base/3/164`);
            }

            if (id == "3") {
                localStorage.setItem('job', "对话AI")
                router.push(`/chat/base/12/164`);
            }

            if (id == "4") {
                localStorage.setItem('job', "撰稿人")
                router.push(`/chat/base/2/164`);
            }

            if (id == "5") {
                localStorage.setItem('job', "视频AI")
                router.push(`/chat/base/125/123`);
            }

            if (id == "6") {
                localStorage.setItem('job', "绘图AI")
                router.push(`/chat/base/9/101`);
            }

            if (id == "7") {
                localStorage.setItem('job', "超级功能")
                router.push(`/chat/base/116/83`);
            }
        }
        onLoad();

        return {
        };
    }
}
</script>