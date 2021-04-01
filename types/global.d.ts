import { Response, Request } from 'express/index';

type ServerRequest = (req: Response, res: Request) => Promise<void>;

interface ApiResponse<T> {
	status: 'success';
	code?: number;
	data: T;
}
