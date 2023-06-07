import { EtherealMail } from '@/libs/SendMail/EtherealMail';
import { PrismaUsersRepository } from '@/modules/Users/repository/prisma/PrismaUsersRepository';
import { CreateUserUseCase } from '@/modules/Users/useCases/CreateUsers';

export function CreateUsersFactory() {
	const usersRepository = new PrismaUsersRepository();
	const sendMail = new EtherealMail();
	const createUsersUseCase = new CreateUserUseCase(usersRepository, sendMail);

	return createUsersUseCase;
}
