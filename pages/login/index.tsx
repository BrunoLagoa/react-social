import { useRouter } from "next/router";
import React from "react";
import LoginForm from "../../components/welcome/LoginForm";
import RegisterForm from "../../components/welcome/RegisterForm";
import BackendService from "../../lib/database/backendService";

enum welcomeStateType {
  login,
  register,
}

export default function WelcomePage(props: { backendService: BackendService }) {
  const backendService = new BackendService(
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL!,
    Number.parseInt(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_PORT!)
  );
  const [welcomeState, setWelcomeState] =
    React.useState<welcomeStateType | null>(() => {
      backendService.getAccount().then(async (loggedinAccount) => {
        if (loggedinAccount == null) {
          setWelcomeState(welcomeStateType.login);
          return;
        }
        router.push("/home");
      });
      return null;
    });

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  let router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-10 m-4 rounded-lg border-2 drop-shadow-lg">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {welcomeState === welcomeStateType.register
              ? "Register "
              : "Sign in to "}
            your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <span
              onClick={() =>
                setWelcomeState(
                  welcomeState === welcomeStateType.register
                    ? welcomeStateType.login
                    : welcomeStateType.register
                )
              }
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {welcomeState === welcomeStateType.register
                ? "login"
                : "register"}
            </span>
          </p>
          {welcomeState === welcomeStateType.register ? (
            <RegisterForm
              backendService={backendService}
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            ></RegisterForm>
          ) : (
            <LoginForm
              backendService={backendService}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            ></LoginForm>
          )}
        </div>
      </div>
    </div>
  );
}