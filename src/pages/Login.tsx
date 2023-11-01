import LoginButton from "../components/LoginButton";

const Login = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="text-center">
        <h1 className="text-white text-4xl text-center text-yellow-200">
          Welcome Back!
        </h1>
        <p className="text-white text-lg text-center">
          Discover the Weather Condition
        </p>
        <div className="pt-10 pb-16">
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
