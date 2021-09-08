interface Response {
  token: string;
  user: {
    userName: string;
    email: string;
    avatar: string;
  };
}

interface User {
  userName: string;
  email: string;
  avatar: string;
}

export default function signIn({ ...props }: User): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: "ewklrjlkkçjgdcsuçioj234jknlgo2jl",
        user: {
          userName: props.userName,
          email: props.email,
          avatar: props.avatar,
        },
      });
    }, 750);
  });
}
