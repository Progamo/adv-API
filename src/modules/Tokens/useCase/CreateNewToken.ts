import { Tokens } from '@prisma/client';
import { Either, left, right } from '@/errors/Either';
import { TokensRepository } from '../repository/protocols/TokensRepository';
import { CreateTokenDTO } from '../dtos/CreateToken';
import { InvalidTokenErro } from '../errors/InvalidTokenErro';

type Response = Either<Error, Tokens>;

export class CreateNewTokenUseCase {
	constructor(private tokensRepository: TokensRepository) {
		// do nothing
	}

	async execute(userId: number, data: CreateTokenDTO): Promise<Response> {
		const findToken = await this.tokensRepository.verifyUserId(userId);
		if (findToken) return right(findToken);

		const token = await this.tokensRepository.create(userId, data);
		if (!token) return left(new InvalidTokenErro());

		return right(token);
	}
}
