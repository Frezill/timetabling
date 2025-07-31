import React, { useState } from 'react'
import CreateSubjectModal from '../components/CreateSubjectModal';
import SubjectInformation from '../components/SubjectInformation';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setSchedules, setSubjects } from '../redux/state';
import EditSubjectModal from '../components/EditSubjectModal';
import { findAllSchedules } from '../service/service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {


    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editSubjectId, setEditSubjectId] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const subjects = useSelector((state) => state.subjects);

    const clearData = () => {
        dispatch(setSubjects([]));
        setSelectedSubjects([]);
    }

    const handleEditSubject = (subjectId) => {
        setEditSubjectId(subjectId);
        setShowEditModal(true);
    }

    const handleSelectSubject = (subjectId) => {
        setSelectedSubjects((prev) =>
            prev.includes(subjectId)
                ? prev.filter(id => id !== subjectId)
                : [...prev, subjectId]
        );
    }

    const generateSchedules = () => {
        const filteredSubjects = subjects.filter(subject => selectedSubjects.includes(subject.id));
        const validSchedules = findAllSchedules(filteredSubjects);
        dispatch(setSchedules(validSchedules));
        if (validSchedules.length === 0) {
            toast.error("Không có thời khóa biểu nào hợp lệ!");
        } else {
            navigate("/schedules");
        }
    }

    React.useEffect(() => {
        if (subjects && subjects.length > 0) {
            setSelectedSubjects(subjects.map(subject => subject.id));
        } else {
            setSelectedSubjects([]);
        }
    }, [subjects]);

    return (
        <>
            <div className='page py-2'>
                <div className="manage-subject container mb-4">
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
                                <div className='subject-card col-11 d-flex align-items-center' style={{ cursor: "pointer" }} key={index}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-3"
                                        checked={selectedSubjects.includes(subject.id)}
                                        onChange={() => handleSelectSubject(subject.id)}
                                        onClick={e => e.stopPropagation()}
                                    />
                                    <div style={{ flex: 1 }} onClick={() => handleEditSubject(subject.id)}>
                                        <SubjectInformation subject={subject} />
                                    </div>
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