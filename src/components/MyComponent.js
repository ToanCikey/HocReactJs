import React, { useState } from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";
// class Component extends React.Component {
//   state = {
//     listUsers: [
//       { id: 1, name: "Toan", age: "15" },
//       { id: 2, name: "Toan Van", age: "25" },
//       { id: 3, name: "Toan Nguyen", age: "29" },
//     ],
//   };
//   handleAddNewUser = (userObj) => {
//     this.setState({ listUsers: [userObj, ...this.state.listUsers] });
//   };
//   handleDeleteUser = (userId) => {
//     let listNewUsers = [...this.state.listUsers];
//     listNewUsers = listNewUsers.filter((item) => {
//       return item.id !== userId;
//     });
//     this.setState({ listUsers: listNewUsers });
//   };
//   render() {
//     return (
//       <div>
//         <UserInfo handleAddNewUser={this.handleAddNewUser} />
//         <br></br>
//         <DisplayInfo
//           listUsers={this.state.listUsers}
//           handleDeleteUser={this.handleDeleteUser}
//         />
//       </div>
//     );
//   }
// }
const Component = () => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: "Toan", age: "15" },
    { id: 2, name: "Toan Van", age: "25" },
    { id: 3, name: "Toan Nguyen", age: "29" },
  ]);
  const handleAddNewUser = (userObj) => {
    setListUsers([userObj, ...listUsers]);
  };
  const handleDeleteUser = (userId) => {
    let listNewUsers = [...listUsers];
    listNewUsers = listNewUsers.filter((item) => {
      return item.id !== userId;
    });
    setListUsers(listNewUsers);
  };
  return (
    <div>
      <UserInfo handleAddNewUser={handleAddNewUser} />
      <br></br>
      <DisplayInfo listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </div>
  );
};
export default Component;
