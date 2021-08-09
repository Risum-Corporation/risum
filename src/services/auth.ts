interface Response {
    token: string;
    user: {
        userName: string;
        email: string;
    }
}

export default function signIn(): Promise<Response> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: 'ewklrjlkkçjgdcsuçioj234jknlgo2jl',
                user: {
                    userName: 'Educg550',
                    email: 'educg550@mail.com'
                },
            })
        }, 750)
    })
}