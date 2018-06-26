import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSession, fetchSessions } from '../actions/index';
import { Link } from 'react-router';
import View from './view';

class ScriptOverview extends Component {
    constructor(props) {
        super(props);

        this.reloadScripts = this.reloadScripts.bind(this);
        this.readFiles = this.readFiles.bind(this);
    }

    reloadScripts() {
        this.props.socket.websocket.send('{"type": "scripter", "action": "script_reload"}');
    }

    readFiles() {
        this.props.socket.websocket.send('{"type": "scripter", "action": "script_read", "dir": "lua/"}');
    }

    componentWillMount() {
        const { dispatch } = this.props;
    }

    renderTable() {

    }

    render() {
        if (!this.props.socket)
            return <div className="loading">Loading&#8230;</div>;

        return (
            <View title="Overview" subtitle="Scripts">
                <button className="btn btn-success" onClick={this.reloadScripts}>
                    Reload Files
                </button>
                <br /><br />
                <button className="btn btn-success" onClick={this.readFiles}>
                    Read Files
                </button>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        socket: state.sessions.socket,
    };
}



export default connect(mapStateToProps)(ScriptOverview);