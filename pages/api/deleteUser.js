import { auth } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { uid } = req.body;

    try {
      // Delete user from Firebase Auth
      await auth.deleteUser(uid);

      res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
