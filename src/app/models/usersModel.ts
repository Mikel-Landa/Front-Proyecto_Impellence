export class User {
	username: string;
	email: string;
	lastSeen: string;
	time: number;
	constructor(pUsername, pEmail, pLastSeen, pTime) {
		this.username = pUsername;
		this.email = pEmail;
		this.lastSeen = pLastSeen;
		this.time = pTime;
	}
}
