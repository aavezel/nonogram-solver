import {CellSolve, RowDef, showRowDef} from './common';
import { RowSolver } from './RowSolver';


enum RowOrientation {
    Vertical,
    Horizontal
}

class RowOnPlace extends RowSolver {

    index: number;
    orientation: RowOrientation;

    constructor(orientation: RowOrientation, idx: number, len: number, measures: Array<number>) { 
        super(len, measures);
        this.index = idx;
        this.orientation = orientation;

    }

}

class PlaceSolver {

    rows: RowOnPlace[];

    constructor(horizontal_measures: number[][], vertical_measures: number[][]) {

    }
}



const p = new PlaceSolver([[1,1], [3], [1,1]], [[3], [1], [3]]);
p