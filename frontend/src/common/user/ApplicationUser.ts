export class ApplicationUser {
  public readonly id: number;
  public readonly email: string;
  public readonly role: string;
  public readonly token: string;

  constructor(
    id: number,
    email: string,
    roles: string,
    token: string,
  ) {
    this.id = id;
    this.email = email;
    this.role = roles;
    this.token = token;
  }
}

export class ApplicationUserFactory {
  public static create(jwtToken: string): ApplicationUser {
    const userObject = JSON.parse(atob(jwtToken.split('.')[1]));

    return new ApplicationUser(
      Number(userObject['id']),
      userObject['email'],
      userObject['role'],
      jwtToken,
    );
  }
}
