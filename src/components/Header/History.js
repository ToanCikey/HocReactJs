import { useEffect, useState } from "react";
import { getHistory } from "../../services/apiServices";
import moment from "moment";
const History = (props) => {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    getALLHistory();
  }, []);
  const getALLHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let newData = res?.DT?.data?.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item?.quizHistory?.name ?? "",
          id: item.id,
          date: moment(item.createdAt).utc().format("DD/MM/YYYY hh:mm:ss A"),
        };
      });

      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
      }
      setListData(newData);
    }
  };
  return (
    <>
      <table className="table table-hover table-bordered ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Quiz Name</th>
            <th scope="col">Total Question</th>
            <th scope="col">Total Correct</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {listData &&
            listData.length > 0 &&
            listData.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          {listData && listData.length === 0 && (
            <tr>
              <td colSpan={4}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default History;
