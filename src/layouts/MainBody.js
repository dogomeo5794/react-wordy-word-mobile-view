import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Field from "./Field";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextFormat from "@material-ui/icons/TextFormat";
import ListItemText from "@material-ui/core/ListItemText";
import DraftsIcon from "@material-ui/icons/Drafts";
import Paper from '@material-ui/core/Paper';

// import english from "../externalJS/english_words"
import english from "./words_dictionary.json"

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      display: "flex",
      flexWrap: "wrap",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  absolute: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  words_random: {
    padding: 14,
  },
  uppercase: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: '100%'
  },
  lowercase: {
    width: '100%',
  }
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export class MainBody extends Component {
  state = {
    words: "",
    final_words: '',
    random: ['1', '2', '3']
  };

  detectKey = (e) => {
    if (e.keyCode === 13) {
        // console.log(english);
        this.setState( {
            final_words: this.state.words.split('').join(' - '),
        } )
        console.log(this.state.words);
        let joined = this.tree(this.state.words.split('')).map(function(str) {
            return str.join('');
        });

        let words = joined.filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item in english && item.length > 3;
        });
        this.setState( {
            random: words
        } )
    }
  };

  tree = (leafs) => {
        var branches = [];
        if (leafs.length == 1) return leafs;
        for (var k in leafs) {
            var leaf = leafs[k];
            this.tree(leafs.join('').replace(leaf, '').split('')).concat("").map(function(subtree) {
                branches.push([leaf].concat(subtree));
            });
        }
        return branches;
  }

  handleChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^A-Za-z]/gi, "");

    this.setState({
      words: value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{ marginTop: 70 }} >
        <Field
          handleChange={this.handleChange}
          words={this.state.words}
          detectKey={this.detectKey}
        />

        <Paper className={classes.words_random}>
            {(() => {
                if (this.state.final_words) {
                    return (<span className={classes.uppercase}>{this.state.final_words}</span>)
                } else {
                    return (<span className={classes.lowercase}>Display random words here!</span>)
                }
            })()}
        </Paper>

        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <TextFormat />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
            {this.state.random.map((value, index) => {
                // return <li key={index}>{value}</li>
                return (
                    <ListItem button key={index}>
                        <ListItemIcon>
                            <TextFormat />
                        </ListItemIcon>
                        <ListItemText primary={value} />
                    </ListItem>
                )
            })}
        </List>

        <Fab variant="extended" className={classes.absolute}>
          NEXT
          <ArrowForward className={classes.extendedIcon} />
        </Fab>
      </div>
    );
  }
}

export default withStyles(useStyles)(MainBody);
