<template>
    <ul class="rooms-list" v-if="loading">
        <li
            class="message-wrapper"
            v-for="i in 4" :key="i"
        >
            <b-skeleton-wrapper>
                <b-media>
                    <template #aside>
                        <b-skeleton type="avatar" width="40px" height="40px"></b-skeleton>
                    </template>

                    <b-skeleton width="100%"></b-skeleton>
                    <b-skeleton width="50%"></b-skeleton>
                </b-media>
            </b-skeleton-wrapper>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    .rooms-list {
        padding: 0;
        list-style-type: none;
        margin-bottom: 0;
    }

    .rooms-list li {
        padding: 15px 20px;
        transition: .3s all ease;
        border-bottom: 1px solid #EBEBEB;
    }
</style>