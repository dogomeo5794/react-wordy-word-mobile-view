import React, { Component } from 'react'
import { Paper } from "@material-ui/core";
import MainBody from './MainBody';

import Header from './AppBar'

export class MainApp extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Paper
                    elevation={0}
                    style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
                >
                    <Header />
                    <MainBody />
                </Paper>
            </React.Fragment>
        )
    }
}

export default MainApp


