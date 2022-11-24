export const fakedataUser = [
    { id: 1, name: "julien" }
]

export const getModelUser = (id: number): { id: number, name: string } | undefined => fakedataUser.find((item) => item.id === id)