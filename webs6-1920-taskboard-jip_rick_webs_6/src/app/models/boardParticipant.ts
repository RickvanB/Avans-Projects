import { UserStory } from './userStory';
import { User } from './user';

export interface BoardParticipant {
    user:               User,
    todo:               UserStory[],
    inProgress:         UserStory[],
    readyForReview:     UserStory[],
    done:               UserStory[],
}