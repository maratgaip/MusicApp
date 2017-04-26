import React, { Component, PropTypes } from 'react';
import { playSong } from '../../actions/PlayerActions';
import SongCard from '../../components/SongCard';
import Spinner from '../../components/Spinner';

const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      end: 6,
      start: 0,
    };
  }

  playSong(i, e) {
    e.preventDefault();
    const { playlist, dispatch } = this.props;
    dispatch(playSong(playlist, i));
  }

  renderSongs(start, end) {
    const chunk = 6;
    const { authed, dispatch, playlist, playlists, playingSongId, songs, users } = this.props;
    const items = playlist in playlists ? playlists[playlist].items : [];
    let result = [];

    for (let i = start; i < end; i += chunk) {
      const songCards = items.slice(i, i + chunk).map((songId, j) => {
        const song = songs[songId];
        const user = users[song.user_id];
        const index = i + j;
        const playSongFunc = this.playSong.bind(this, index);

        return (
          <div className="item" key={`${index}-${song.id}`}>
            <SongCard
              authed={authed}
              dispatch={dispatch}
              isActive={song.id === playingSongId}
              playSong={playSongFunc}
              song={song}
              user={user}
              />
          </div>
        );
      });

      if (songCards.length < chunk) {
        for (let j = 0; j < chunk - songCards.length + 1; j++) {
          songCards.push(<div className="item" key={`song-placeholder-${(i + j)}`} />);
        }
      }
result = result.concat(songCards);
      /*result.push(
        <div className="songs-row grid" key={`songs-row-${i}`}>
          {songCards}
        </div>
      );*/
    }

    return result;
  }

  render() {
    const { playlist, playlists } = this.props;
    const { end, paddingBottom, paddingTop, start } = this.state;
    const isFetching = playlist in playlists ? playlists[playlist].isFetching : false;

    return (
      <div className="content">
        <div className="padder" style={{ height: paddingTop }} />
        <div className="songs-row grid">
          {this.renderSongs(start, end)}
        </div>
        <div className="padder" style={{ height: paddingBottom }} />
        {isFetching ? <Spinner /> : null}
      </div>
    );
  }
}

Channels.propTypes = propTypes;

export default Channels;
