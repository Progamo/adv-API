import dayjs from 'dayjs';
import { Either, left, right } from '@/errors/Either';

import { RecoveryPasswordDTO } from '../dtos/RecoveryPassword';
import { CreateNewTokenUseCase } from '@/modules/Tokens/useCase/CreateNewToken';
import { TokensRepository } from '@/modules/Tokens/repository/protocols/TokensRepository';
import { SendMail } from '@/libs/SendMail';
import { UsersRepository } from '@/modules/Users/repository/protocols/UsersRepository';
import { UserNotFoundError } from '@/modules/Users/errors/UserNotFoundError';
import { generateRandomToken } from '@/utils/functions/generateRandomToken';

type Response = Either<Error, boolean>;

export class RecoveryPasswordUseCase {
	constructor(private usersRepository: UsersRepository, private tokensRepository: TokensRepository, private sendMailProvider: SendMail) {
		// do nothing
	}

	async execute(data: RecoveryPasswordDTO): Promise<Response> {
		const user = await this.usersRepository.findByEmail(data.email);
		if (!user) return left(new UserNotFoundError());

		const tokenUseCase = new CreateNewTokenUseCase(this.tokensRepository);
		const response = await tokenUseCase.execute(user.id, {
			type: data.type,
			token: generateRandomToken(6),
			expiredAt: dayjs().add(20, 'm').toDate(),
		});

		if (response.isLeft()) return left(response.value);

		await this.sendMailProvider.SendMail({
			to: data.email,
			subject: 'Recuperação de senha',
			templatePath: 'passwordRecovery',
			variables: {
				token: response.value.token,
			},
		});

		return right(true);
	}
}
