import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Conversation} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ConversationRepository} from './conversation.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly conversations: HasManyRepositoryFactory<Conversation, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ConversationRepository') protected conversationRepositoryGetter: Getter<ConversationRepository>,
  ) {
    super(User, dataSource);
    this.conversations = this.createHasManyRepositoryFactoryFor('conversations', conversationRepositoryGetter,);
    this.registerInclusionResolver('conversations', this.conversations.inclusionResolver);
  }
}
