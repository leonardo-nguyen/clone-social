<template>
    <div>
        <MainSection title="Tweet" :loading="loading">

            <Head>
                <Title>Post</Title>
            </Head>

           <TweetDetails :user="user" :tweet="tweet" />
        </MainSection>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const loading = ref(false);
const tweet = ref(null);
const {getTweetById} = useTweets();
const {useAuthUser} = useAuth();
const user = useAuthUser();

const route = useRoute();

watch(() => route.fullPath, () => getTweet())

const getTweetIdByRoute = () => route.params.id;

async function getTweet(){
    loading.value = true;
    try {
        const response = await getTweetById(getTweetIdByRoute());
        tweet.value = response.tweet;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

onBeforeMount(async () => {
    getTweet();
})
</script>