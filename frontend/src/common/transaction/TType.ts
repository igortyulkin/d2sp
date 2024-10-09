export enum TType {
    UP = "up",
    DOWN = "down",
}

export const TTypeAliases: Record<any, string> = {
    [TType.UP]: 'Replenishment',
    [TType.DOWN]: 'Debiting',
}
