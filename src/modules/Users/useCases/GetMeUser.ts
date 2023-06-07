import { Users } from '@prisma/client';
import { Either, left, right } from '@/errors/Either';
import { UsersRepository } from '../repository/protocols/UsersRepository';
import { UserNotFoundError } from '../errors/UserNotFoundError';

type Response = Either<Error, Partial<Users>>;

export class GetMeUserUseCase {
	constructor(private usersRepository: UsersRepository) {
		// do nothing
	}

	async execute(userUuid: string): Promise<Response> {
		const user = await this.usersRepository.findMe(userUuid);
		if (!user) return left(new UserNotFoundError());

		return right(user);
	}
}
