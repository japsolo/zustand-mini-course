import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores";

export const LoginPage = () => {
	const navigate = useNavigate();
	const loginUser = useAuthStore((state) => state.loginUser);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { email, password, remember } = event.target as typeof event.target & {
			email: { value: string };
			password: { value: string };
			remember: { checked: boolean };
		};

		// console.log(email.value, password.value, remember.checked);

		try {
			await loginUser(email.value, password.value);
			email.value = "";
			password.value = "";
			remember.checked = false;
			navigate("/dashboard");
		} catch {
			console.log("Unable to authenticate");
		}
	};

	return (
		<>
			<h1 className="mb-4 text-2xl font-semibold">Login</h1>

			<form onSubmit={onSubmit}>
				<div className="mb-4">
					<label htmlFor="email" className="block text-gray-600">
						Email:
					</label>
					<input type="text" name="email" id="email" autoComplete="off" />
				</div>

				<div className="mb-4">
					<label htmlFor="password" className="block text-gray-600">
						Password:
					</label>
					<input type="password" name="password" id="password" autoComplete="off" />
				</div>

				<div className="flex items-center mb-4">
					<input type="checkbox" name="remember" id="remember" className="text-blue-500" />
					<label className="ml-2 text-gray-600" htmlFor="remember">
						Remember Me
					</label>
				</div>

				<div className="mb-6 text-blue-500">
					<a href="/" className="hover:underline">
						Forgot Password?
					</a>
				</div>

				<button type="submit" className="bg-indigo-600">
					Login
				</button>
			</form>
		</>
	);
};
