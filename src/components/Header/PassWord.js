import { useState } from "react";
import { postChangePassword } from "../../services/apiServices";
import { toast } from "react-toastify";

const PassWord = (props) => {
  const { setShow } = props;
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const handleSubmitPassWord = async () => {
    //validate password
    if (!passwordOld || !passwordNew || !passwordRetype) {
      toast.error("Vui long nhap day du mat khau");
      return;
    }
    if (passwordNew === passwordRetype) {
      let res = await postChangePassword(passwordOld, passwordNew);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        setShow(false);
      }
      if (res && res.EC !== 0) {
        toast.error(res.EM);
      }
    } else {
      toast.error("Password nhap lai khong dung");
      return;
    }
  };
  return (
    <>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Mật khẩu cũ</label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            value={passwordOld}
            onChange={(event) => setPasswordOld(event.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Mật khẩu mới</label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            value={passwordNew}
            onChange={(event) => setPasswordNew(event.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Nhập lại mật khẩu mới</label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            value={passwordRetype}
            onChange={(event) => setPasswordRetype(event.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          className="btn btn-warning"
          onClick={(event) => handleSubmitPassWord(event)}
        >
          Save
        </button>
      </div>
    </>
  );
};
export default PassWord;
