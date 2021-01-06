<template>
    <div class="login-container">
        <b-col sm="12" md="3" lg="3" xl="3">
            <b-overlay :show="loading" rounded="sm">
                <b-card class="login-card">
                    <div class="user-img">
                        <img src="@/assets/images/user.png" alt="">
                    </div>

                    <b-alert :show="error" variant="danger">
                        {{ errorMessage }}
                    </b-alert>

                    <b-form @submit="onSubmit">
                        <b-form-group
                            label="Логин:"
                        >
                            <b-form-input
                                v-model="login"
                                type="text"
                                required
                                placeholder="Введите логин"
                            ></b-form-input>
                        </b-form-group>
                        
                        <b-form-group
                            label="Пароль:"
                        >
                            <b-form-input
                                v-model="password"
                                type="password"
                                required
                                placeholder="Введите пароль"
                            ></b-form-input>
                        </b-form-group>

                        <b-button
                            type="submit"
                            variant="success"
                            size="sm"
                            block
                            loading
                        >
                            Войти
                        </b-button>
                    </b-form>
                </b-card>
            </b-overlay>
        </b-col>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('auth', [ 'loading', 'errorMessage', 'error' ])
    },
    data() {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            
            this.$store.dispatch('auth/login', {
                login: this.login,
                password: this.password
            });
        }
    }
}
</script>

<style scoped>
    .login-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .login-card {
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2),0 2px 2px 0 rgba(0, 0, 0, .14),0 1px 5px 0 rgba(0, 0, 0, .12);
        border: none;
    }

    .user-img {
        width: 100%;
        margin-bottom: 10px;
    }

    .user-img img {
        width: 100px;
        display: block;
        margin: 0 auto;
    }
</style>