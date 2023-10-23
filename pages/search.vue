<template>
    <div>
        <MainSection title="Home" :loading="loading">

            <Head>
                <Title>Search</Title>
            </Head>

            <TweetListFeed :tweets="searchTweets"/>
        </MainSection>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const {getTweets: getTweetsComposable} = useTweets();
const searchTweets = ref([]);
const route = useRoute();
const getSearchQuery = () => route.query.q;

watch(() => route.fullPath, () => getTweets())

const loading = ref(false);

async function getTweets() {
    debugger
    loading.value = true;
    try {
        const {tweets} = await getTweetsComposable({
            query: getSearchQuery()
        })
        searchTweets.value = tweets;
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false;
    }
}

onBeforeMount(() => {
    getTweets();
})
</script>