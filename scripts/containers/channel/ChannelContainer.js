import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSongsIfNeeded } from '../../actions/PlaylistsActions';
import MobileSongs from '../../components/MobileSongs';
import Songs from '../../components/SongCards';
import Channels from './Channel.js';
import Link from '../../components/Link';
import Playlists from '../../components/Songs';
import Popular from '../../components/Songs';
import { getPlayingSongId } from '../../utils/PlayerUtils';

const propTypes = {
  isMobile: PropTypes.bool,
};

class ChannelContainer extends Component {
  render() {
    return (
      <div className="channels">
        <div className="row">
          <h2 className="title" >Channels</h2>
          <Channels {...this.props} />
        </div>
      </div>
    )
  }
}

ChannelContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { authed, entities, environment, navigator, player, playlists } = state;
  const { height, isMobile } = environment;
  const { songs, users } = entities;
  const { query } = navigator.route;
  const playingSongId = getPlayingSongId(player, playlists);

  const time = query && query.t ? query.t : null;
  let playlist = query && query.q ? query.q : 'house';
  if (time) {
    playlist = `${playlist} - ${time}`;
  }

  return {
    authed,
    height,
    isMobile,
    playingSongId,
    playlist,
    playlists,
    scrollFunc: fetchSongsIfNeeded.bind(null, playlist),
    songs,
    time,
    users,
  };
}

export default connect(mapStateToProps)(ChannelContainer);
