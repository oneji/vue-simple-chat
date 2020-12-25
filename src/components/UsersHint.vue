<template>
    <ul class="users-hint">
        <li v-for="user in users" :key="user.login">
            <a href="#" @click="onChoose(user.login, user.password)">
                {{ user.login }} - {{ user.password }}
                <span class="role">[{{ user.role }}]</span>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            users: [
                { login: 'timich1995@gmail.com', password: '501222150', role: 'Бригадир' }, 
                { login: 'test@gmail.com', password: '12345678', role: 'Клиент' }, 
                { login: 'driver@gmail.com', password: '501222150', role: 'Водитель' }, 
                { login: 'client@gmail.com', password: '12345678', role: 'Клиент' }, 
                { login: 'client2@gmail.com', password: '12345678', role: 'Клиент' }, 
            ]
        }
    },
    methods: {
        onChoose(login, password) {
            this.$emit('selected', {
                login,
                password
            });
        }
    }
}
</script>

<style scoped>
    .users-hint {
        font-size: 12px;
        margin-top: 10px;
        padding: 0 10px;
        list-style-type: none;
    }

    .users-hint .role {
        float: right;
    }

    .users-hint a {
        color: #777879;
    }
</style>