declare namespace User {
	type Role = 'admin' | 'user';
	interface Data {
		email: string;
		name: string;
		surname: string;
		role: Role;
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