import UserService from './user.service.js';

export class UserController {
  static async register(req, res) {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json({ success: true, data: 'User registered successfully' });
    } catch (error) {
        console.log("Error registering user:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      res.status(200).json({ success: true, data: 'Login successful', token: result.token });
    } catch (error) {
      res.status(401).json({ success: false, error: error.message });
    }
  }

   static async getProfile(req, res) {
  try {
    console.log("User email from token:", req.user.email);
    const profile = await UserService.getProfile(req.user.email);
    
 console.log("Retrieved user profile:", profile);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
  console.log("Error retrieving user profile:", error);
    res.status(404).json({ success: false, error: 'User not found' });
  }
}
}