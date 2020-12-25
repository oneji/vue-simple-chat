export default {
    getAuthError(state) {
        const errorObj = {
            error: state.error,
            errorMessage: state.errorMessage
        }

        return errorObj;
    }
}