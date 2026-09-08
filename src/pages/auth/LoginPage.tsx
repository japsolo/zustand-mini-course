import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useAuthStore } from "@/stores";
import { authSchema } from "@/stores/auth/auth.schema";

export const LoginPage = () => {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const navigate = useNavigate();
	const loginUser = useAuthStore((state) => state.loginUser);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { email, password, remember } = event.target as typeof event.target & {
			email: { value: string };
			password: { value: string };
			remember: { checked: boolean };
		};

		const validation = authSchema.safeParse({ email: email.value, password: password.value });

		if (!validation.success) {
			const { fieldErrors } = z.flattenError(validation.error);
			const mappedErrors = Object.fromEntries(
				Object.entries(fieldErrors).map(([field, messages]) => [field, messages[0]]),
			);
			setErrors(mappedErrors);
			return;
		}

		try {
			await loginUser(email.value, password.value);
			email.value = "";
			password.value = "";
			remember.checked = false;
			setErrors({});
			navigate("/dashboard");
		} catch (error) {
			setErrors({ form: error instanceof Error ? error.message : "Unable to login" });
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
					{errors.email && (
						<p role="alert" className="mt-4 text-xs text-red-600">
							{errors.email}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="password" className="block text-gray-600">
						Password:
					</label>
					<input type="password" name="password" id="password" autoComplete="off" />
					{errors.password && (
						<p role="alert" className="mt-4 text-xs text-red-600">
							{errors.password}
						</p>
					)}
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

				{errors.form && (
					<p role="alert" className="mt-4 text-xs text-red-600">
						{errors.form}
					</p>
				)}
			</form>
		</>
	);
};
