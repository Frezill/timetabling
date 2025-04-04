import React from 'react'
import '../styles/util.scss'

const SubjectInformation = ({ subject }) => {

    const convertDateToVietnamese = (date) => {
        if (date == "Monday") return "Thứ 2";
        if (date == "Tuesday") return "Thứ 3";
        if (date == "Wednesday") return "Thứ 4";
        if (date == "Thursday") return "Thứ 5";
        if (date == "Friday") return "Thứ 6";
        if (date == "Saturday") return "Thứ 7";
    }

    return (
        <div className='subject-card'>
            <h4><strong>{subject?.id} - {subject.name}</strong></h4>
            <div className="group-list">
                {subject.groups.map((group, index) => (
                    <div key={index} className="group-card">
                        <h5>Nhóm {group.groupId}</h5>
                        <ul>
                            {group.sessions.map((session, sessionIndex) => (
                                <li key={sessionIndex}>
                                    {convertDateToVietnamese(session.date)}, Tiết bắt đầu: {session.startTime}, Tiết kết thúc: {session.endTime}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubjectInformation