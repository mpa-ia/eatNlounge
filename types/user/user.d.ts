declare namespace User {
	interface SignIn {
		email: string;
		password: string;
	}
	interface SignUp extends SignIn {
		name: string;
		surname: string;
		confirmPassword: string;
		acceptPolicy: boolean;
	}
}