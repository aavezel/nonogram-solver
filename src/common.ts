function showRowDef(r: RowDef) {
    return r.map(e => "x*?"[e]).join("");
}

enum CellSolve {
    Blank = 0,
    Colored = 1,
    Unknown = 2
}

type RowDef = Array<CellSolve>;

export {CellSolve, RowDef, showRowDef};