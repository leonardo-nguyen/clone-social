<template>
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter/>
            </div>
        </div>

        <div class="pt-5 space-y-6">
            <UIInput v-model="data.username" label="Username" placeholder="@username" />
            <UIInput v-model="data.password" type="password" label="Password" placeholder="*******" />
            <div>
                <UIButton :disabled="isButtonDisabled" liquid @click="handleLogin">Login</UIButton>
            </div>
        </div>
    </div>
</template>
<script setup>
const data = reactive({
    username: '',
    password: '',
    loading: false
})
async function handleLogin(){
    const {login} = useAuth();
    data.loading = true;
    try {
        await login(
            {
                username: data.username,
                password: data.password
            }
        );
    } catch (error) {
        console.log(error);
    } finally {
        data.loading = false;
    }
}

const isButtonDisabled = computed(() => {
    return ((!data.username || !data.password) || data.loading)
})
</script>