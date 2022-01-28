const GRID_SIZE = 21;

export function randomGridPosition(){
    return {
        x: Math.floor(Math.random()  * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

export function outsideGridBoundries(head) {
    return (
        head.x < 1 || head.x > GRID_SIZE || head.y < 1 || head.y > GRID_SIZE
    )
}