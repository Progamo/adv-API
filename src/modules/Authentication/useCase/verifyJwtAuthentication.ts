import { Users } from '@prisma/client';
import { UsersRepository } from '@/modules/Users/repository/protocols/UsersRepository';
import { Either, left, right } from '@/errors/Either';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError';
import { VerifyJwtAuthenticationDTO } from '../dtos/VerifyJWTSchema';
import { CustomError } from '@/errors/CustomError';

type Response = Either<InvalidCredentialsError, Users>;

export class verifyJwtAuthenticationUseCase {
	constructor(private usersRepository: UsersRepository) {
		// do nothing
	}

	async execute(body: VerifyJwtAuthenticationDTO): Promise<Response> {
		if (!body.user) return left(new InvalidCredentialsError());

		const user = await this.usersRepository.findByUuid(body.user.sub);
		if (!user) return left(new CustomError('Unauthorized.', 401));

		return right(user);
	}
}
