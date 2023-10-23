<template>
  <div :class="{ 'dark': isDarkMode }">
    <div class="bg-white dark:bg-dim-900">
      <!-- App -->
      <LoadingPage v-if="isAuthLoading" />

      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- Left Sidebar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft :user="user" @on-tweet="handleModalOpen" @on-logout="handleUserLogout"/>
            </div>
          </div>
          <!-- Main Content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <nuxt-page />
          </main>
          <!-- Right Sidebar -->
          <div class="hidden md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />

      <UIModal :is-open="postTweetModal" @on-close="handleModalClose">
        <TweetForm :reply-to="replyTweet" show-reply :user="user" @on-success="handleFormSuccess" />
      </UIModal>
    </div>
  </div>
</template>
<script setup>
const isDarkMode = ref(false);
const {useAuthUser, initAuth, useAuthLoading, logout} = useAuth();
const isAuthLoading = useAuthLoading();
const {closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet} = useTweets();
const user = useAuthUser();

const postTweetModal = usePostTweetModal();

const emitter = useEmitter();

const replyTweet = useReplyTweet();

emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet)
})

emitter.$on('toggleDarkMode', () => {
  isDarkMode.value = !isDarkMode.value;
})

onBeforeMount(() => {
  initAuth();
})

function onReloadTweets() {
  emitter.$emit('reloadTweets')
}

function handleFormSuccess(tweet){
  closePostTweetModal();
  if(replyTweet.value){
    navigateTo({
        path: `/status/${tweet.id}`
    })
  }
  else{
    onReloadTweets();
  }
  
}

function handleModalClose(){
  closePostTweetModal();
}

function handleModalOpen() {
  openPostTweetModal(null);
}

function handleUserLogout(){
    logout();
}
</script>