export default () => {
    const usePostTweetModal = () => useState('post_tweet_modal', () => false)
    const useReplyTweet = () => useState('reply_tweet', () => null)

    const closePostTweetModal = () => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = false;
    }

    const setReplyTo = (tweet) => {
        const replyTweet = useReplyTweet();
        replyTweet.value = tweet;
    }

    const openPostTweetModal = (tweet = null) => {
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = true;

        setReplyTo(tweet);
    }

    const postTweet = (formData) => {
        const form = new FormData();

        form.append('text', formData.text)
        form.append('replyTo', formData.replyTo)

        formData.mediaFiles.forEach((mediaFile, index) => {
            form.append('media_file_' + index, mediaFile)
        })

        return useFetchApi('/api/user/tweets', {
            method: 'POST',
            body: form
        })
    }

    const getTweets = async (params = {}) => {
        try {
            const response = await useFetchApi('/api/tweets', {
                method: 'GET',
                params
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    const getTweetById = async (tweetId) => {
        try {
            const response = await useFetchApi(`/api/tweets/${tweetId}`, {
                method: 'GET'
            })
            return response;
        } catch (error) {
            throw error
        }
    }

    return {
        postTweet,
        getTweets,
        getTweetById,
        closePostTweetModal,
        usePostTweetModal,
        openPostTweetModal,
        useReplyTweet
    }
}