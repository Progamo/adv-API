import { Users } from '@prisma/client';
import { CreateUsersDTO } from '../dtos/CreateUsers';
import { UsersRepository } from '../repository/protocols/UsersRepository';
import { UserAlreadyExistsError } from '../errors/UsersAlreadyExistsError';
import { Either, left, right } from '@/errors/Either';
import { EtherealMail } from '@/libs/SendMail/EtherealMail';

type Response = Either<UserAlreadyExistsError, Users>;

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository, private sendMailProvider: EtherealMail) {
		// do nothing
	}

	async execute(data: CreateUsersDTO): Promise<Response> {
		const findUser = await this.usersRepository.findByEmail(data.email);
		if (findUser) return left(new UserAlreadyExistsError());

		const users = await this.usersRepository.create(data);
		if (!users) return left(new UserAlreadyExistsError());

		await this.sendMailProvider.SendMail({
			to: data.email,
			subject: 'Bem vindo ao nosso sistema',
			templatePath: 'welcome',
			variables: {
				email: data.email,
				name: data?.profile?.name,
				siteUrl: 'http://localhost:3000',
			},
		});

		return right(users);
	}
}
