import { useState, useEffect } from "react";
import "./MainInfo.scss";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import _ from "lodash";
import { useSelector } from "react-redux";
import { postMainInfo } from "../../services/apiServices";
import { doUpdateUser } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";

const MainInfo = (props) => {
  const { setShow } = props;
  const account = useSelector((state) => state.user.account);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewimage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setRole(account.role);
      setUsername(account.username);
      setImage("");
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      } else {
        setPreviewImage("");
      }
    }
  }, [account]);
  const handleMainInfo = async (event) => {
    event.preventDefault();
    if (!username) {
      toast.error("Invalidate username");
      return;
    }
    let res = await postMainInfo(username, image);
    console.log("check data: ", res);
    if (res && res.EC === 0) {
      // dispatch(doUpdateUser(res));
      toast.success(res.EM);
      setShow(false);
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
  };

  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            disabled
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            onChange={(event) => setRole(event.target.value)}
            value={role}
            disabled
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label label-upload" htmlFor="labelUpload">
            <FcPlus /> Upload file Image
          </label>
          <input
            type="file"
            hidden
            id="labelUpload"
            onChange={(event) => handleUploadImage(event)}
          />
        </div>
        <div className="col-md-12 img-preview">
          {previewimage ? (
            <img src={previewimage} alt="anh" />
          ) : (
            <span>Preview Image</span>
          )}
        </div>
        <div>
          <button
            className="btn btn-warning"
            onClick={(event) => handleMainInfo(event)}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};
export default MainInfo;
