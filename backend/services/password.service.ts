import * as bcrypt from 'bcrypt'

export const encrypt = async (rawPassword: string) : Promise<string> => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(rawPassword, salt);
}

export const matchPassword = async (rawPassword: string, encryptedPassword: string) : Promise<boolean> => {
    return bcrypt.compare(rawPassword, encryptedPassword);
}