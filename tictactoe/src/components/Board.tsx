import React, { Component } from 'react';
import Grid from '@mui/material/Grid2';

class Board extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            "values": [
                ["-", "-", "-"],
                ["-", "-", "-"],
                ["-", "-", "-"],
            ],
        };
    }

    setTile(r: number, c: number, v: string) {
        var newValues = this.state.values;
        newValues[r][c] = v;
        this.setState({"values": newValues});
    }

    renderTile(r: number, c: number) {
        return (<Grid size={4} key={10*r+c}>
            {this.state.values[r][c]}
        </Grid>);
    }

    renderRow(r: number): any {
        const row = [
            this.renderTile(r, 0),
            this.renderTile(r, 1),
            this.renderTile(r, 2),
        ];
        return row;
    }

    render() {
        return (
            <Grid container spacing={2}>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
            </Grid>
        );
    }
};

export default Board;