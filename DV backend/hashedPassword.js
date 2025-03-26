import bcrypt from 'bcryptjs';

const hashPassword = async () => {
    const password = "12345678"; // Replace with your chosen password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
};
// $2b$10$Mj/.NPhHWsvlsvIDDe/GWuXNIj6kTrTaggr4NiAkFS5bNMFoGBueS
hashPassword();
