import React, { Component } from 'react';
import Moment from 'moment';

let Game = (props) => {
    let game = props.game;
    return (
        <p>hello</p>
    );
}

export class Openings extends Component {

    render() {
        let games = [];
        if (this.props.loaded) {
            games = this.props.games.map((game, index) => {
                console.log(game);
                let color = game.color;
                let winner = game.winner;
                let status = game.status;
                let elo = '';

                let lastMoveAt = Moment(game.lastMoveAt);
                let date = lastMoveAt.format("M/D/YYYY");

                if (game.players.black.userId === this.props.username) {
                    elo = game.players.black.rating;
                } else if (game.players.white.userId === this.props.username) {
                    elo = game.players.white.rating;
                }

                if (color === winner) {
                    return <li key={index}>{`Win (${elo}): ${game.opening.name} - ${date}`}</li>;
                } else {
                    return <li key={index}>{`Loss (${elo}): ${game.opening.name} - ${date}`}</li>;
                };
            });

            // status = ['mate', 'resign', 'outoftime', 'timeout', 'variantEnd', 'draw', 'stalemate'];

        }

        return (
            <div id="vis-openings">
                {/*{ this.props.loaded &&*/}
                <ul>
                    { games }
                </ul>
                {/*}*/}
            </div>
        );
    }
}