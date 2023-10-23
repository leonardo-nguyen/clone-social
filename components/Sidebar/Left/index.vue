<template>
    <div class="flex flex-col h-screen">
        <div class="p-2 my-2 hover:bg-blue-50 hover:rounded-full w-min dark:hover:bg-white/20" :class="defaultTransition">
            <div class="h-8 w-8">
                <nuxt-link to="/">
                    <LogoTwitter />
                </nuxt-link>
            </div>
        </div>

        <div class="mt-2 space-y-3">
            <SidebarLeftTab active>
                <template v-slot:icon>
                    <HomeIcon />
                </template>
                <template v-slot:name>
                    Home
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <HashtagIcon />
                </template>
                <template v-slot:name>
                    Explore
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <BellIcon />
                </template>
                <template v-slot:name>
                    Notifications
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <InboxIcon />
                </template>
                <template v-slot:name>
                    Messages
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <BookmarkIcon />
                </template>
                <template v-slot:name>
                    Bookmarks
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <DocumentTextIcon />
                </template>
                <template v-slot:name>
                    Lists
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <UserIcon />
                </template>
                <template v-slot:name>
                    Profile
                </template>
            </SidebarLeftTab>
            <SidebarLeftTab>
                <template v-slot:icon>
                    <EllipsisHorizontalCircleIcon />
                </template>
                <template v-slot:name>
                    More
                </template>
            </SidebarLeftTab>
            <div class="xl:hidden block">
                <UIButton @click="emits('onTweet')">
                    <div class="w-6 h-6 font-bold">
                        <PencilIcon />
                    </div>
                </UIButton>
            </div>
            <div class="hidden xl:block">
                <UIButton liquid size="lg" @click="emits('onTweet')">
                    <span class="font-bold">
                        Tweet
                    </span>
                </UIButton>
            </div>
        </div>
        
        <div class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800" 
        :class="defaultTransition" @click="emits('onLogout')">
            <div class="flex flex-row">
                <img :src="props.user.profileImage" class="h-10 w-10 rounded-full" />
                <div class="flex-col hidden ml-2 xl:block">
                    <h1 class="text-small font-bold text-gray-800 dark:text-white">{{ props.user.name }}</h1>
                    <p class="text-sm text-gray-400">{{ props.user.handle }}</p>
                </div>
            </div>
            <!-- Icon -->
            <div class="hidden ml-auto xl:block">
                <div class="w-6 h-6">
                    <ChevronDownIcon/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { HomeIcon } from '@heroicons/vue/24/solid';
import { HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, DocumentTextIcon, UserIcon, EllipsisHorizontalCircleIcon, PencilIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
const { defaultTransition } = useTailwindConfig();

const emits = defineEmits(['onTweet', 'onLogout']);

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})
</script>