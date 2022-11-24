type UserMessage = { id: number, userId: number, message: string }

export const fakedataMessage = [
    { id: 1, userId: 1, message: "Coucou" },
    { id: 2, userId: 32, message: "Coucou c'est moi" }
]

export const getFakeMessage = (userId: number): UserMessage[] => fakedataMessage.filter((message) => message.userId === userId)