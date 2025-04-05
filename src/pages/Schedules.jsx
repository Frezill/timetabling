import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const dayMap = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5
};

const subjectColors = [
    "#16a085", "#34495e", "#636e72", "#5758BB", "#eb4d4b",
    "#b71540", "#e58e26", "#cd6133", "#4b4b4b", "#6F1E51",
    "#40407a", "#2C3A47", "#4a69bd", "#1B9CFC", "#e84118",
];

const Schedules = () => {

    const schedules = useSelector((state) => state.schedules);
    const subjects = useSelector((state) => state.subjects);

    const navigate = useNavigate();

    const getColorForSubject = (subjectId) => {
        let hash = 0;
        for (let i = 0; i < subjectId.length; i++) {
            hash = subjectId.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % subjectColors.length;
        return subjectColors[index];
    };

    const getSessions = (subjectId, groupId) => {
        const subject = subjects.find(s => s.id === subjectId);
        if (!subject) return [];
        const group = subject.groups.find(g => g.groupId === groupId);
        return group ? group.sessions : [];
    }

    const getSubjectName = (subjectId) => {
        const subject = subjects.find(s => s.id === subjectId);
        return subject ? subject.name : "";
    }

    const renderTable = (schedule) => {
        const table = Array.from({ length: 10 }, () => Array(6).fill(""));

        schedule.forEach(({ subject, group }) => {
            const sessions = getSessions(subject, group);
            sessions.forEach(({ date, startTime, endTime }) => {
                const dayIndex = dayMap[date];
                if (dayIndex !== undefined) {
                    for (let i = parseInt(startTime) - 1; i < parseInt(endTime); i++) {
                        table[i][dayIndex] = {
                            text: `${subject} - ${group}`,
                            color: getColorForSubject(subject),
                            name: getSubjectName(subject),
                        };
                    }
                }
            });
        });

        return table.map((row, periodIndex) => (
            <tr key={periodIndex} className='text-center'>
                <td className='text-center'><strong>{periodIndex + 1}</strong></td>
                {row.map((cell, i) => (
                    <td
                        key={i}
                        className='text-center text-nowrap'
                        style={{
                            backgroundColor: cell?.color || "",
                            color: cell?.color ? "white" : "inherit"
                        }}
                    >
                        {typeof cell === 'object' ? cell.text : cell}
                    </td>
                ))}
            </tr>
        ));
    }

    //download pdf
    const schedulesRef = useRef();

    const downloadPDF = () => {
        const input = schedulesRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('thoi-khoa-bieu.pdf');
        });
    }

    const backToHome = () => {
        navigate("/");
    }

    return (
        <div className="page">
            <div className="download container py-3 d-flex justify-content-between align-items-center">
                <div className="back d-flex align-items-center" style={{ cursor: "pointer", color: "#273c75" }} onClick={backToHome}>
                    <h3><IoMdArrowRoundBack /></h3><h5>Home</h5>
                </div>
                <button onClick={downloadPDF} className="btn btn-primary mb-3">
                    Tải thời khóa biểu
                </button>
            </div>
            <div ref={schedulesRef} className=' row gap-3 py-3 align-items-center justify-content-center' style={{ width: '100%' }}>
                {
                    schedules && schedules.length > 0 &&
                    schedules.map((schedule, index) => (
                        <div className='schedule-card col-xl-7 col-11' key={index}>
                            <h3 className='text-center'>Thời khóa biểu {index + 1}</h3>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr className='text-center'>
                                        <th style={{ width: '4%' }} className='text-center text-nowrap'></th>
                                        {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"].map((day, i) => (
                                            <th key={i} style={{ width: '16%' }} className='text-center text-nowrap'>
                                                <strong>{day}</strong>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTable(schedule)}
                                </tbody>
                            </table>
                        </div>
                    ))
                }
                {
                    (!schedules || schedules.length === 0) &&
                    <div className='col-11'>
                        <h3 className='text-center'>Không thể xếp thời khóa biểu</h3>
                    </div>
                }
            </div>
        </div>

    )
}

export default Schedules