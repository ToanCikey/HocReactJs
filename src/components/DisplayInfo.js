import React, { useState } from "react";
import "./DisplayInfo.scss";
// class DisplayInfo extends React.Component {
//   state = {
//     isShowHide: true,
//   };
//   handleShowHide = () => {
//     this.setState({ isShowHide: !this.state.isShowHide });
//   };
//   render() {
//     const { listUsers } = this.props;
//     return (
//       <div>
//         <div>
//           <span
//             onClick={() => {
//               this.handleShowHide();
//             }}
//           >
//             {this.state.isShowHide ? "Hide list user:" : "Show list user:"}
//           </span>
//         </div>
//         {this.state.isShowHide && (
//           <div>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                   <div>my name is {user.name}</div>
//                   <div>my age is {user.age}</div>
//                   <button
//                     onClick={() => {
//                       this.props.handleDeleteUser(user.id);
//                     }}
//                   >
//                     Delete
//                   </button>
//                   <hr></hr>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfo = (props) => {
  const { listUsers } = props;
  const [isShowHide, setShowHide] = useState(true);
  const handleShowHide = () => {
    setShowHide(!isShowHide);
  };
  return (
    <div>
      <div>
        <span onClick={() => handleShowHide()}>
          {isShowHide ? "Hide list User:" : "Show list User:"}
        </span>
      </div>
      {isShowHide && (
        <div>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                <div>my name is {user.name}</div>
                <div>my age is {user.age}</div>
                <button
                  onClick={() => {
                    props.handleDeleteUser(user.id);
                  }}
                >
                  Delete
                </button>
                <hr></hr>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default DisplayInfo;
