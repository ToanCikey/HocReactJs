import React, { useEffect, useState } from "react";
// class UserInfo extends React.Component {
//   state = {
//     name: "Toan",
//     age: 21,
//   };
//   handleOnChange = (event) => {
//     this.setState({
//       name: event.target.value,
//     });
//   };
//   handleOnChangeAge = (event) => {
//     this.setState({
//       age: event.target.value,
//     });
//   };
//   handleOnSubmit = (event) => {
//     event.preventDefault();
//     console.log(this.state);
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1) + "a",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   render() {
//     return (
//       <div>
//         My name is {this.state.name} and age is {this.state.age}
//         <form onSubmit={(event) => this.handleOnSubmit(event)}>
//           <label>Your name:</label>
//           <input
//             value={this.state.name}
//             onChange={(event) => this.handleOnChange(event)}
//             type="text"
//           />
//           <label>Your age:</label>
//           <input
//             value={this.state.age}
//             onChange={(event) => this.handleOnChangeAge(event)}
//             type="text"
//           />
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
// }
const UserInfo = (props) => {
  const [name, setName] = useState("Toan");
  const [age, setAge] = useState("21");
  const handleOnChange = (event) => {
    setName(event.target.value);
  };
  const handleOnChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "a",
      name: name,
      age: age,
    });
  };
  useEffect(() => {
    console.log("call me use effect");
    setTimeout(() => {
      document.title = "Van Toan";
    }, 2000);
  }, []);
  console.log("call me render");

  return (
    <div>
      My name is {name} and age is {age}
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label>Your name:</label>
        <input
          value={name}
          onChange={(event) => handleOnChange(event)}
          type="text"
        />
        <label>Your age:</label>
        <input
          value={age}
          onChange={(event) => handleOnChangeAge(event)}
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default UserInfo;
