export const LoginPage = () => {
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// const { username, password, remember } = event.target as HTMLFormElement;
		const { username, password, remember } = event.target as typeof event.target & {
			username: { value: string };
			password: { value: string };
			remember: { checked: boolean };
		};
		console.log(username.value, password.value, remember.checked);

		username.value = "";
		password.value = "";
		remember.checked = false;
	};

	return (
		<>
			<h1 className="mb-4 text-2xl font-semibold">Login</h1>

			<form onSubmit={onSubmit}>
				<div className="mb-4">
					<label htmlFor="username" className="block text-gray-600">
						Username
					</label>
					<input type="text" name="username" id="username" autoComplete="off" />
				</div>

				<div className="mb-4">
					<label htmlFor="password" className="block text-gray-600">
						Password
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
			<div className="mt-6 text-center text-blue-500">
				<a href="/" className="hover:underline">
					Sign up Here
				</a>
			</div>
		</>
	);
};
