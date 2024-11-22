import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    register(dto: any): Promise<void>;
}
