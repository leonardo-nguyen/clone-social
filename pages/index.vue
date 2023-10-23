<template>
    <div>
        <MainSection title="Home" :loading="loading">

            <Head>
                <Title>Home / Twitter</Title>
            </Head>

            <div class="border-b" :class="twitterBorderColor">
                <TweetForm :user="user" @on-success="handleFormSuccess"/>
            </div>

            <TweetListFeed :tweets="homeTweets"/>
        </MainSection>
    </div>
</template>
<script setup>
const {twitterBorderColor} = useTailwindConfig();
const {getTweets: getHomeTweets} = useTweets();

const loading = ref(false);
const homeTweets = ref([]);
const {useAuthUser} = useAuth();
const user = useAuthUser();
const emitter = useEmitter();

async function getTweets() {
    loading.value = true;
    try {
       const {tweets} = await getHomeTweets();

       homeTweets.value = tweets;
       debugger
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

function reloadListTweets(){
    emitter.$on('reloadTweets',async ()=>{
        await getTweets();
    })
}

function turnOffEmitter(){
    emitter.$off('reloadTweets');
}

onBeforeMount(async () => {
    await getTweets();
    reloadListTweets();
})

onBeforeUnmount(() => {
    turnOffEmitter();
})

async function handleFormSuccess(tweet) {
    await getTweets();
}
</script>