declare namespace User {
	interface Data {
		email: string;
		name: string;
		surname: string;
		role: number;
		id: string;
	} 
	type DBUser = Omit<Data, 'id'>;

	interface SignUp {
		email: string;
		password: string;
		name: string;
		surname: string;
		confirmPassword: string;
		acceptPolicy: boolean;
	}
	type SignIn = Pick<SignUp, 'email' | 'password'>;
}