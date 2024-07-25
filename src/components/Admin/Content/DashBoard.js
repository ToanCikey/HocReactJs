import { useEffect, useState } from "react";
import "./DashBoard.scss";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { getDataOverView } from "../../../services/apiServices";
const Dashboard = (props) => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    fetchDataOverView();
  }, []);
  const fetchDataOverView = async () => {
    let res = await getDataOverView();
    console.log("check res: ", res);
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Question",
          Qs: Qs,
        },
        {
          name: "Answer",
          As: As,
        },
      ];
      setDataChart(data);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">Total User</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.users &&
              dataOverView.users.total ? (
                <>{dataOverView.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Quiz</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuiz ? (
                <>{dataOverView.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Question</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions ? (
                <>{dataOverView.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Answer</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers ? (
                <>{dataOverView.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#d1811b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
