import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchSongsIfNeeded } from '../../actions/PlaylistsActions';
import MobileSongs from '../../components/MobileSongs';
import Songs from '../../components/SongCards';
import Channels from './Explore.channel.js';
import Link from '../../components/Link';
import Playlists from '../../components/Songs';
import Popular from '../../components/Songs';
import { getPlayingSongId } from '../../utils/PlayerUtils';

const propTypes = {
  isMobile: PropTypes.bool,
};

class ExploreContainer extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="explore">
        <div className="explore-row">
          <Link
            className="title animated"
            dispatch={dispatch}
            route={{ path: ['channels'] }}
            >
            BROWSE
            <i className="icon ion-ios-arrow-forward"/>
          </Link>
          <div className="description">Explore music, entertainment and podcast Channels</div>
          <Channels {...this.props} />
        </div>
        <div className="explore-row">
          <div className="title">PLAYLIST</div>
          <div className="description">Chosen for you by our Editors</div>
          <Channels {...this.props} />
        </div>
        <div className="explore-row">
          <Link
            className="title animated"
            dispatch={dispatch}
            route={{ path: ['channels'] }}
            >
            POPULAR
            <i className="icon ion-ios-arrow-forward"/>
          </Link>
          <Channels {...this.props} />
        </div>
        <div className="explore-row">
          <Link
            className="title animated"
            dispatch={dispatch}
            route={{ path: ['channels'] }}
            >
            NEW RELEASES
            <i className="icon ion-ios-arrow-forward"/>
          </Link>
          <Channels {...this.props} />
        </div>
      </div>
    )
  }
}

ExploreContainer.propTypes = propTypes;

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

export default connect(mapStateToProps)(ExploreContainer);
