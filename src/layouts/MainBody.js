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
// import DraftsIcon from "@material-ui/icons/Drafts";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

// import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';


// import english from "../externalJS/english_words"
import english from "./words_dictionary.json";

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
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    width: "100%",
  },
  lowercase: {
    width: "100%",
  },
  custom: {
    border: "1px solid grey",
    borderRadius: "5px",
    margin: "3px 0",
    textTransform: "uppercase",
  },
  letterSpacing: {
    letterSpacing: "4px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

export class MainBody extends Component {
  state = {
    words: "",
    final_words: "",
    random: [],
    charLen: [],
    charLenSelected: 3
  };

  detectKey = (e) => {
    if (e.keyCode === 13) {
      // console.log(english);
      this.setState({
        final_words: this.state.words.split("").join(" - "),
      });

      let arr = [];
      for ( var i = 3; i <= this.state.words.length; i++ ) {
        arr.push(i)
      }
        this.setState( {
            charLen: arr
        } )
      
      console.log(this.state.words);
      // let joined = this.tree(this.state.words.split("")).map(function (str) {
      //   return str.join("");
      // });

      // let words = joined.filter(function (item, pos, self) {
      //   return self.indexOf(item) === pos && item in english && item.length >= 3;
      // });
      let filtered = this.tree(this.state.words.split('')).filter(function(item) {
          return item.join('') in english && item.join('').length >= 3
      })

      let joined = filtered.map(function(item, pos, self) {
          return item.join('');
      })

      let words = joined.filter(function(item, pos, self) {
          return self.indexOf(item) == pos 
      })
      this.setState({
        random: words,
      });
    }
  };

  tree = (leafs) => {
    var branches = [];
    if (leafs.length === 1) return leafs;
    for (let k in leafs) {
      let leaf = leafs[k];
      this.tree(leafs.join("").replace(leaf, "").split(""))
        .concat("")
        .map(function (subtree) {
          return branches.push([leaf].concat(subtree));
        });
    }
    return branches;
  };

  handleChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^A-Za-z]/gi, "");

    this.setState({
      words: value,
    });

  };

  clickedNext = (e) => {
    this.setState( {
        words: "",
        final_words: "",
        random: [],
        charLen: [],
        charLenSelected: 3
    } )
  }

  selectLengthChange = (e) => {
      this.setState( {
        charLenSelected: e.target.value
      } );
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{ marginTop: 70 }}>
        <Field
          handleChange={this.handleChange}
          words={this.state.words}
          detectKey={this.detectKey}
        />

        {this.state.final_words &&
            <Paper className={classes.words_random}>
                <span className={classes.uppercase}>
                    {this.state.final_words}
                </span>
            </Paper>
        }

        {/* <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Select Character Length</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            // value={this.state.charLenSelected}
            // onChange={this.selectLengthChange}
            label="Select Character Length"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {this.state.charLen.map((value, index) => {
                console.log(value)
                // return (
                //     <MenuItem value={value}>{value} Character</MenuItem>
                // )
            })}
            
            
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl> */}

        <List component="nav" aria-label="main mailbox folders">
          {this.state.random.map((value, index) => {
            // return <li key={index}>{value}</li>
            return (
              <ListItem className={classes.custom} button key={index}>
                <ListItemIcon>
                  <Avatar>
                    <TextFormat />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.letterSpacing }}
                  primary={value}
                />
              </ListItem>
            );
          })}
        </List>

        <Fab variant="extended" onClick={this.clickedNext} className={classes.absolute}>
          NEXT
          <ArrowForward className={classes.extendedIcon} />
        </Fab>

      </div>
    );
  }
}

export default withStyles(useStyles)(MainBody);
