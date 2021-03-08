declare namespace User {
	interface DBUser {
		email: string;
		name: string;
		surname: string;
		role: number;
	} 
	interface Data extends DBUser {
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