export interface AuthModel {
    email: string
    name: {
        title: string
        first: string
        last: string
    },
    picture: {
        large: string
    }
    token: string
}
