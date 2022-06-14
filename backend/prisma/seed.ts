import { PrismaClient, Role, User } from '@prisma/client'
import {encrypt} from "../services/password.service";
const prisma = new PrismaClient()

async function main() {
    const password = "super admin";
    const superAdmin = await prisma.user.create({
        data: {
            email: "super_admin@admin.com",
            name: "super admin",
            role: Role.SUPER_ADMIN,
            password: await encrypt(password)
        }
    })

    console.log({ superAdmin })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })