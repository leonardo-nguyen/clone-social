<template>
    <div v-if="loading" class="flex items-center justify-center py-6">
        <UISpinner/>
    </div>
    <div v-else>
        <TweetItem :tweet="props.replyTo" v-if="props.replyTo && props.showReply"
        hide-actions />
        <TweetFormInput :placeholder="props.placeholder" :user="props.user" @onSubmit="handleFormSubmit" />
    </div>
</template>
<script setup>
const loading = ref(false)

const {postTweet} = useTweets();
const emits = defineEmits('onSuccess');
const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    placeholder: {
        type: String,
        default: "What's happening ?"
    },
    replyTo: {
        type: Object,
        defaut: null
    },
    showReply: {
        type: Boolean,
        default: false
    }
})

async function handleFormSubmit(data) {
    loading.value = true;
    try {
        const response = await postTweet({
            text: data.text,
            mediaFiles: data.mediaFiles,
            replyTo: props.replyTo?.id
        });
        emits('onSuccess', response.tweet)
    } catch (error){
        console.log(error);
    } finally {
        loading.value = false;
    }
}
</script>