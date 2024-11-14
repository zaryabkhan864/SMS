import React, { useEffect, useState } from "react";
import "./QuizByGrade.css";
import logo from "../Quiz/images/logo.png";
import { toast } from "react-hot-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useGetGradesQuery } from "../../../redux/api/gradeApi";
import { useGetQuizResultQuery } from "../../../redux/api/quizApi";

const QuizByGrade = () => {
  const [gradeId, setGradeId] = useState('');
  const [semesterNo, setSemesterNo] = useState('');
  const [termNo, setTermNo] = useState('');
  const [quizNo, setQuizNo] = useState('');
  const [quizAllData, setQuizAllData] = useState(null);

  const { data: gradesData } = useGetGradesQuery();
  const { data: quizResults, error, isLoading } = useGetQuizResultQuery(quizAllData, {
    skip: !quizAllData // Avoid querying until quizAllData is set
  });

  useEffect(() => {
    if (quizResults && !isLoading && !error) {
      toast.success("Quiz Results Fetched...");
      console.log("Quiz Results", quizResults);
    } else if (error) {
      toast.error("Error fetching quiz results");
    }
  }, [quizResults, isLoading, error]);

  const handleDownload = (studentName) => {
    const input = document.getElementById(`quiz_marksheet${studentName}`);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`marksheets_${studentName}.pdf`);
    });
  };

  const handleFetchResults = () => {
    if (!gradeId || !semesterNo || !termNo || !quizNo) {
      toast.error("Please select all parameters");
    } else {
      setQuizAllData({ gradeId, semester: semesterNo, term: termNo, quizNumber: quizNo });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <label htmlFor="inputState" className="form-label">Select Grade</label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setGradeId(e.target.value)}>
            <option selected>Select Grade</option>
            {gradesData?.grades?.map((grade) => (
              <option key={grade._id} value={grade._id}>{grade.gradeName}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label htmlFor="inputState" className="form-label">Select Semester</label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setSemesterNo(e.target.value)}>
            <option selected>Select Semester No</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="inputState" className="form-label">Select Term</label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setTermNo(e.target.value)}>
            <option selected>Select Term</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="inputState" className="form-label">Select Quiz No</label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => setQuizNo(e.target.value)}>
            <option selected>Select Quiz No</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="col">
          <button className="btn btn-primary mt-4" onClick={handleFetchResults}>Get Quiz Results</button>
        </div>
      </div>
      <div className="order-invoice my-5">
        {quizResults && quizResults.quizResults && quizResults.quizResults.map((quiz) => (
          quiz.marks.map((mark, index) => (
            <div key={index}>
              <div className="d-flex justify-content-center">
                <button className="btn btn-success col-md-5 my-2" onClick={() => handleDownload(mark.student._id)}>
                  <i className="fa fa-print"></i> Download Quiz
                </button>
              </div>
              <div id={`quiz_marksheet${mark.student._id}`} className="p-3 border border-secondary">
                <header className="clearfix">
                  <div id="logo">
                    <img alt="logo" src={logo} />
                  </div>
                  <h1>Quiz Marks</h1>
                  <div id="project">
                    <div><span>Name</span> <span>{mark.student._id}</span></div> {/* Assuming student ID as name placeholder */}
                    <div><span>Grade</span><span>{quiz.grade._id}</span></div> {/* Assuming grade ID as grade name placeholder */}
                    <div><span>Course</span><span>{quiz.course._id}</span></div> {/* Assuming course ID as course name placeholder */}
                    <div><span>Date</span><span>{new Date().toLocaleString("en-US")}</span></div>
                  </div>
                </header>
                <main>
                  <table className="mt-5">
                    <thead>
                      <tr>
                        <th className="service">Question 1</th>
                        <th className="desc">Question 2</th>
                        <th className="service">Question 3</th>
                        <th className="desc">Question 4</th>
                        <th className="service">Question 5</th>
                        <th className="desc">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{mark.question1} / 5</td>
                        <td>{mark.question2} / 5</td>
                        <td>{mark.question3} / 5</td>
                        <td>{mark.question4} / 5</td>
                        <td>{mark.question5} / 5</td>
                        <td className="total">{mark.question1 + mark.question2 + mark.question3 + mark.question4 + mark.question5} / 25</td>
                      </tr>
                    </tbody>
                  </table>
                  <div id="notices">
                    <div>NOTICE:</div>
                  </div>
                </main>
                <footer>
                  This Mark sheet was created on a computer and is valid without the signature.
                </footer>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default QuizByGrade;
