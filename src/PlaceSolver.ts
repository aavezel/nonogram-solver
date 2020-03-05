import {CellSolve, RowDef, showRowDef} from './common';
import { RowSolver } from './RowSolver';


enum RowOrientation {
    Vertical = "v",
    Horizontal = "h"
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

    setRow(index: number, solved: RowDef): void {
        for (const row of this.rows.filter(r => r.orientation == RowOrientation.Vertical)) {
            row.setCell(index, solved[row.index]);
        }
    }

    setCol(index: number, solved: RowDef): void {
        for (const row of this.rows.filter(r => r.orientation == RowOrientation.Horizontal)) {
            row.setCell(index, solved[row.index]);
        }
    }

    rows_count: number;
    cols_count: number;
    rows: RowOnPlace[];

    constructor(horizontal: number[][], vertical: number[][]) {
        this.rows_count = horizontal.length;
        this.cols_count = vertical.length;
        this.rows = []
        horizontal.forEach((measures, idx) => {
            this.rows.push(new RowOnPlace(RowOrientation.Horizontal, idx, this.cols_count, measures))
        });
        vertical.forEach((measures, idx) => {
            this.rows.push(new RowOnPlace(RowOrientation.Vertical, idx, this.rows_count, measures))
        });
        this.rows.filter(r => r.is_solved).forEach(
            r => r.orientation == RowOrientation.Horizontal ? this.setRow(r.index, r.solved) : this.setCol(r.index, r.solved)
        )

        this.rows = this.rows.sort((r1, r2) => r2.getWeight() - r1.getWeight());

    }

    solve(){
        while (true) {
            if (this.rows.every(r => r.is_solved)) {
                return;
            }
            let any_solved = false;
            for (const row of this.rows) {
                const prev_solv = [...row.solved];
                row.solve();
                if (row.solved.some((c, idx) => prev_solv[idx] != c)) {
                    if (row.orientation == RowOrientation.Horizontal) {
                        this.setRow(row.index, row.solved);
                    } else {
                        this.setCol(row.index, row.solved);
                    }
                    any_solved = true;
                }
            }
            if (!any_solved) {
                console.log(this.getStringPlace())
                throw "Нет решения";
            }
        }
    }

    getStringPlace(){
        return this
            .rows
            .filter(r=>r.orientation == RowOrientation.Horizontal)
            .sort((r1, r2) => r1.index - r2.index)
            .map(r => showRowDef(r.solved))
            .join("\n");



    }
}

export { PlaceSolver };