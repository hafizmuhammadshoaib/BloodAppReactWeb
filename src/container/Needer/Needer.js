import React, { Component } from "react";
import DatabaseActions from "../../Store/Actions/DatabaseActions";
import { connect } from "react-redux";

class Needer extends Component {
  constructor(props) {
    super(props);
    this.state = { bloodInput: "", renderArray: [] };
  }
  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    this.props.getDonor();
  }

  findAvailableUser(receipentArray) {
    let array = [];
    console.log("at start find ava user", this.state.renderArray);
    this.props.donorList.find(obj => {
      receipentArray.forEach(value => {
        value.forEach(val => {
          if (val == obj.bloodGroup) {
            array.push(obj);
          }
        });
      });
      this.setState({ renderArray: array });
    });
  }

  checkDonors = () => {
    let a = [];
    var b = this.state.bloodInput;
    switch (b) {
      case "A+":
        a.push(["A+", "O+", "A-", "O-"]);
        this.findAvailableUser(a);

        break;

      case "B+":
        a.push(["B+", "O+", "B-", "O-"]);
        this.findAvailableUser(a);
        break;

      case "AB+":
        a.push(["AB+", "AB-", "O+", "O-", "A+", "A-", "B+", "B-"]);
        this.findAvailableUser(a);
        break;

      case "O+":
        a.push(["O+", "O-"]);
        this.findAvailableUser(a);
        break;

      case "A-":
        a.push(["A-", "O-"]);
        this.findAvailableUser(a);
        break;

      case "B-":
        a.push(["B-", "O-"]);
        this.findAvailableUser(a);
        break;

      case "AB-":
        a.push(["AB-", "O-", "A-", "B-"]);
        this.findAvailableUser(a);
        break;

      case "O-":
        a.push(["O-"]);
        this.findAvailableUser(a);
        break;
    }
  };

  render() {
    {
      console.log("", this.state.renderArray);
    }
    return (
      <div>
        <h1> Needer</h1>
        <button
          onClick={() => {
            this.props.history.replace("/donor");
          }}
        >
          Donate Blood
        </button>
        <br />
        <button
          onClick={() => {
            this.props.history.replace("/home");
          }}
        >
          home
        </button>
        <br />
        <input
          onChange={this.inputHandler}
          name="bloodInput"
          value={this.state.bloodInput}
        />
        <button onClick={this.checkDonors}>Check Donors</button>
        <table>
          <tbody>
            <tr>
              <th>Blood Group</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>

            {this.state.renderArray.map(obj => {
              return (
                <tr key={obj.key}>
                  <td>{obj.bloodGroup}</td>
                  <td>{obj.name}</td>
                  <td>{obj.email}</td>
                  <td>{obj.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    donorList: state.DatabaseReducer.donorList,
    isLoading: state.DatabaseReducer.isLoading,
    isError: state.DatabaseReducer.isError,
    errorMsg: state.DatabaseReducer.errorMsg
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getDonor: () => {
      return dispatch(DatabaseActions.getDonor());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Needer);
