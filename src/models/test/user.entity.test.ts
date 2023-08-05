import User from "@models/user.entity";

describe("User entity", () => {
  it("should create a new user", () => {
    const user = new User();
    user.id = "123";
    user.email = "test@example.com";
    user.password = "password";
    user.created_at = new Date("2023-08-04T14:55:47.169Z");

    expect(user.id).toBe("123");
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("password");
    expect(user.created_at).toEqual(new Date("2023-08-04T14:55:47.169Z"));
  });
});
