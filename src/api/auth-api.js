export const createUserOkta = ({ firstName, lastName, email }) => ({
    url: '/okta/create-user',
    data: {
        profile: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            login: email,
        },
    }
})

export const recoverPassword = (email) => ({
    url: '/okta/forgot-password',
    data: {
       id: email
    }
})

export const resendVerificationEmail = (email) => ({
    url: '/okta/resend-activation-link',
    data: {
       id: email
    }
})

export default {
    createUserOkta,
    recoverPassword,
};
