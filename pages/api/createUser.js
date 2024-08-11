import { auth } from '../../lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, displayName } = req.body;

    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
      });

      res.status(200).json({ uid: userRecord.uid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}