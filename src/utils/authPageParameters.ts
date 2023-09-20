interface IParameterType {
  title: string;
  subTitle: string;
  spanText: string;
  linkHref: string;
  linkText: string;
}

const authPageParameters = (pathname: string): IParameterType => {
  if (pathname === "/register") {
    return {
      title: "Create an account",
      subTitle: "Join one of the best real estate websites",
      spanText: "Do you have an account?",
      linkHref: "/login",
      linkText: "Log In",
    };
  } else if (pathname === "/login") {
    return {
      title: "Welcome Back!",
      subTitle: "We hope you enjoy this website",
      spanText: "Don't have an account yet ?",
      linkHref: "/register",
      linkText: "Register",
    };
  } else {
    return {
      title: "Forget Password",
      subTitle: "",
      spanText: "",
      linkHref: "",
      linkText: "",
    };
  }
};

export default authPageParameters;
