<template>
    <b-list-group v-if="loading">
        <b-list-group-item
            href="#"
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
        </b-list-group-item>
    </b-list-group>
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

<style>

</style>