import { Component } from "react";

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    return (        <div>
        <h2>Developers:</h2>
        <div className="nameBox"><a href="https://github.com/nikaskeba/Can-of-Books-Frontend">Nika Skeba</a></div>
        <div className="nameBox"><a href="https://github.com/0xQuasark/can-of-books-backend">Paul Brown</a></div>
      </div>
    );
  }
}

export default Profile;
