import React from 'react'
import { useSelector } from 'react-redux'

const dayMap = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5
};

const Schedules = () => {

    const schedules = useSelector((state) => state.schedules);
    const subjects = useSelector((state) => state.subjects);

    const getSessions = (subjectId, groupId) => {
        const subject = subjects.find(s => s.id === subjectId);
        if (!subject) return [];
        const group = subject.groups.find(g => g.groupId === groupId);
        return group ? group.sessions : [];
    }

    const renderTable = (schedule) => {
        const table = Array.from({ length: 10 }, () => Array(6).fill(""));

        schedule.forEach(({ subject, group }) => {
            const sessions = getSessions(subject, group);
            sessions.forEach(({ date, startTime, endTime }) => {
                const dayIndex = dayMap[date];
                if (dayIndex !== undefined) {
                    for (let i = parseInt(startTime) - 1; i < parseInt(endTime); i++) {
                        table[i][dayIndex] = `${subject} - ${group}`;
                    }
                }
            });
        });

        return table.map((row, periodIndex) => (
            <tr key={periodIndex} className='text-center'>
                <td className='text-center'><strong>{periodIndex + 1}</strong></td>
                {row.map((cell, i) => (
                    <td key={i} className='text-center text-nowrap'>
                        {cell}
                    </td>
                ))}
            </tr>
        ));
    }

    return (
        <div className='page row gap-3 py-3 align-items-center justify-content-center'>
            {
                schedules && schedules.length > 0 &&
                schedules.map((schedule, index) => (
                    <div className='schedule-card col-md-7 col-11' key={index}>
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
        </div>
    )
}

export default Schedules