import { auth } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { condition, uid } = req.body;

    try {
      const userIsDisabled = await auth.updateUser(uid, {
        disabled: condition,
      });
      res.status(200).json({ message: "User status has been updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
