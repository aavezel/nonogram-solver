enum CellSolve {
    Blank = 0,
    Colored = 1,
    Unknown = 2
}

const CellSolveString: {[id: string]: CellSolve} = {
    "x": CellSolve.Blank, 
    "?": CellSolve.Unknown, 
    "*": CellSolve.Colored,
}


type RowDef = Array<CellSolve>;

function showRowDef(r: RowDef) {
    return r.map(e => "x*?"[e]).join("");
}

function parseRowDef(r: string): RowDef {
    return Array
        .from(r)
        .map(e => {
            return  CellSolveString[e]
        });
}


export {CellSolve, RowDef, showRowDef, parseRowDef};