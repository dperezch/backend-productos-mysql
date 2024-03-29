import { Body, Controller, Get, Post, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActivaInterface } from 'src/common/interfaces/user-active.interface';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ){
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(Role.USER)
    profile(@ActiveUser() user: UserActivaInterface){
        return this.authService.profile(user);
    }

    /* @Get('profile')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    profile(@Req() req: RequestWithUser){
        return this.authService.profile(req.user);
    } */
}
