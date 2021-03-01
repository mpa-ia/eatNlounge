declare namespace User {
	interface Data {
		email: string;
		name: string;
		surname: string;
		role: number;
		id: string;
	}
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