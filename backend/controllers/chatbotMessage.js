import User from '../models/user.js';


const Message = async(req, res) => {
   try {
       const { text } = req.body;

       // Validate request
       if (!text?.trim()) {
           return res.status(400).json({ error: 'Text is required' });
       }

       // Process the message (e.g., save to database)
        const user=await User.create({
        sender:"user",
        text
        })


   } catch (error) {
       console.error('Error handling message:', error);
       res.status(500).json({ error: 'Internal server error' });
   }
}

export { Message };