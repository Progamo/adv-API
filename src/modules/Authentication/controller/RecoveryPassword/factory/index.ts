import { EtherealMail } from '@/libs/SendMail/EtherealMail';
import { RecoveryPasswordUseCase } from '@/modules/Authentication/useCase/RecoveryPassword';
import { PrismaTokensRepository } from '@/modules/Tokens/repository/prisma';
import { PrismaUsersRepository } from '@/modules/Users/repository/prisma/PrismaUsersRepository';

export function RecoveryPasswordFactory() {
	const usersRepository = new PrismaUsersRepository();
	const tokensRepository = new PrismaTokensRepository();
	const sendMailProvider = new EtherealMail();

	const useCase = new RecoveryPasswordUseCase(usersRepository, tokensRepository, sendMailProvider);
	return useCase;
}
