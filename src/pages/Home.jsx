import React, { useState } from 'react'
import CreateSubjectModal from '../components/CreateSubjectModal';
import SubjectInformation from '../components/SubjectInformation';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setSchedules, setSubjects } from '../redux/state';
import EditSubjectModal from '../components/EditSubjectModal';
import { find_all_valid_schedules } from '../service/main';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    // const [subjects, setSubjects] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editSubjectId, setEditSubjectId] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const subjects = useSelector((state) => state.subjects);

    const clearData = () => {
        dispatch(setSubjects([]));
    }

    const handleEditSubject = (subjectId) => {
        setEditSubjectId(subjectId);
        setShowEditModal(true);
    }

    const generateSchedules = () => {
        const valid_schedules = find_all_valid_schedules(subjects);
        dispatch(setSchedules(valid_schedules));
        navigate("/schedules");
        console.log(valid_schedules);
        console.log(subjects);


    }

    return (
        <>
            <div className='page py-2'>
                <div className="manage-subject container">
                    <div className="py-3 d-flex justify-content-between align-items-center">
                        <div className='d-flex gap-3'>
                            <Button variant="primary" onClick={() => { setShowCreateModal(true) }}>+ Thêm môn học</Button>
                            <Button variant="success" onClick={() => { generateSchedules() }}>Tạo thời khóa biểu</Button>
                        </div>
                        <Button variant="danger" onClick={() => { clearData() }}> Xóa tất cả</Button>
                    </div>
                    <div className="subject-list row gap-3 align-items-center justify-content-center">
                        {
                            subjects && subjects.length > 0 && subjects.map((subject, index) => (
                                <div className='subject-card col-11' style={{ cursor: "pointer" }} key={index} onClick={() => handleEditSubject(subject.id)}>
                                    <SubjectInformation subject={subject} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <CreateSubjectModal
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
            />
            <EditSubjectModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                editSubjectId={editSubjectId}
                setEditSubjectId={setEditSubjectId}
            />
        </>
    )
}

export default Home