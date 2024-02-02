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
                router.push(`/chat/base/0/76`);
            }

            if (id == "2") {
                localStorage.setItem('job', "人设")
                router.push(`/chat/base/3/76`);
            }

            if (id == "3") {
                localStorage.setItem('job', "AI家族")
                router.push(`/chat/base/12/76`);
            }

            if (id == "4") {
                localStorage.setItem('job', "撰稿人")
                router.push(`/chat/base/2/76`);
            }
        }
        onLoad();

        return {
        };
    }
}
</script>