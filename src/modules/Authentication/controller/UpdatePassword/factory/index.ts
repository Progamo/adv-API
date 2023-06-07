import { EtherealMail } from '@/libs/SendMail/EtherealMail';
import { UpdatePasswordUseCase } from '@/modules/Authentication/useCase/UpdatePassword';
import { PrismaTokensRepository } from '@/modules/Tokens/repository/prisma';
import { PrismaUsersRepository } from '@/modules/Users/repository/prisma/PrismaUsersRepository';

export function UpdatePasswordFactory() {
	const usersRepository = new PrismaUsersRepository();
	const tokensRepository = new PrismaTokensRepository();
	const sendMail = new EtherealMail();
	const useCase = new UpdatePasswordUseCase(usersRepository, tokensRepository, sendMail);

	return useCase;
}
