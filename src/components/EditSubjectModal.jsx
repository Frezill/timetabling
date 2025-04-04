import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setSubjects } from '../redux/state';
import { IoIosRemoveCircle } from "react-icons/io";

const EditSubjectModal = (prop) => {
    const { editSubjectId, setEditSubjectId, showEditModal, setShowEditModal } = prop;

    const dispatch = useDispatch();
    let subjects = useSelector((state) => state.subjects);

    const [subject, setSubject] = useState({
        id: "",
        name: "",
        groups: [
            {
                groupId: "",
                sessions: [
                    { date: "", startTime: "", endTime: "" }
                ]
            }
        ]
    });

    useEffect(() => {
        if (editSubjectId) {
            const subjectToEdit = subjects.find((subject) => subject.id === editSubjectId);
            if (subjectToEdit) {
                setSubject(subjectToEdit);
            }
        } else {
            setSubject({
                id: "",
                name: "",
                groups: [
                    {
                        groupId: "",
                        sessions: [
                            { date: "", startTime: "", endTime: "" }
                        ]
                    }
                ]
            });
        }
    }, [showEditModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubject((prev) => ({ ...prev, [name]: value }));
    };

    const handleGroupChange = (groupIndex, e) => {
        const { name, value } = e.target;
        const newGroups = [...subject.groups];
        newGroups[groupIndex][name] = value;
        setSubject((prev) => ({ ...prev, groups: newGroups }));
    };

    const handleSessionChange = (groupIndex, sessionIndex, e) => {
        const { name, value } = e.target;
        const newGroups = [...subject.groups];
        newGroups[groupIndex].sessions[sessionIndex][name] = value;
        setSubject((prev) => ({ ...prev, groups: newGroups }));
    };

    const addGroup = () => {
        setSubject((prev) => ({
            ...prev,
            groups: [
                ...prev.groups,
                {
                    groupId: "",
                    sessions: [
                        { date: "", startTime: "", endTime: "" }
                    ]
                }
            ]
        }));
    };

    const addSession = (groupIndex) => {
        const newGroups = [...subject.groups];
        newGroups[groupIndex].sessions.push({ date: "", startTime: "", endTime: "" });
        setSubject((prev) => ({ ...prev, groups: newGroups }));
    };

    const removeSession = (groupIndex, sessionIndex) => {
        const newGroups = [...subject.groups];
        newGroups[groupIndex].sessions.splice(sessionIndex, 1);
        if (newGroups[groupIndex].sessions.length === 0) {
            // Nếu xoá hết session thì thêm 1 session rỗng để tránh lỗi render
            newGroups[groupIndex].sessions.push({ date: "", startTime: "", endTime: "" });
        }
        setSubject((prev) => ({ ...prev, groups: newGroups }));
    };

    const removeGroup = (groupIndex) => {
        const newGroups = [...subject.groups];
        newGroups.splice(groupIndex, 1);
        if (newGroups.length === 0) {
            // Nếu xoá hết nhóm thì thêm 1 nhóm rỗng để tránh lỗi render
            newGroups.push({
                groupId: "",
                sessions: [{ date: "", startTime: "", endTime: "" }]
            });
        }
        setSubject((prev) => ({ ...prev, groups: newGroups }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedSubjects = [...subjects];
        let subjectIndex = subjects.findIndex(obj => obj.id == editSubjectId);
        if (subjectIndex !== -1) {
            updatedSubjects[subjectIndex] = { ...subject };
            dispatch(setSubjects(updatedSubjects));
        }
        handleHideModal();
    };

    const handleHideModal = () => {
        setShowEditModal(false);
        setSubject({
            name: "",
            groups: [
                {
                    groupId: "",
                    sessions: [
                        { date: "", startTime: "", endTime: "" }
                    ]
                }
            ]
        });
        setEditSubjectId("");
    }
    return (
        <>
            <Modal size="lg" show={showEditModal} onHide={handleHideModal} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Chỉnh sửa môn học
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='createSubjectForm' onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label className='form-label'><strong>Mã môn</strong></label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='id'
                                    value={subject.id}
                                    onChange={handleChange}
                                    placeholder='Mã môn'
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label className='form-label'><strong>Tên môn</strong></label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='name'
                                    value={subject.name}
                                    onChange={handleChange}
                                    placeholder='Tên môn'
                                    required
                                />
                            </div>
                        </div>

                        {subject.groups.map((group, groupIndex) => (
                            <div key={groupIndex} className="border p-3 mb-3 rounded">
                                <div className="d-flex justify-content-between">
                                    <h5>Nhóm {groupIndex + 1}</h5>
                                    <div className='remove-group-button col-md-1 d-flex align-items-center'>
                                        <IoIosRemoveCircle onClick={() => { removeGroup(groupIndex) }} />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Mã nhóm</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        name='groupId'
                                        value={group.groupId}
                                        onChange={(e) => handleGroupChange(groupIndex, e)}
                                        placeholder='Group ID'
                                        required
                                    />
                                </div>

                                {group.sessions.map((session, sessionIndex) => (
                                    <div key={sessionIndex} className="row mb-2">
                                        <div className="col-md-4">
                                            <label className="form-label">Thứ</label>
                                            <select
                                                className="form-select"
                                                name="date"
                                                value={session.date}
                                                onChange={(e) => handleSessionChange(groupIndex, sessionIndex, e)}
                                                required
                                            >
                                                <option value="">Chọn</option>
                                                <option value="Monday">Thứ Hai</option>
                                                <option value="Tuesday">Thứ Ba</option>
                                                <option value="Wednesday">Thứ Tư</option>
                                                <option value="Thursday">Thứ Năm</option>
                                                <option value="Friday">Thứ Sáu</option>
                                                <option value="Saturday">Thứ Bảy</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">Tiết bắt đầu</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="startTime"
                                                min={1}
                                                max={12}
                                                value={session.startTime}
                                                onChange={(e) => handleSessionChange(groupIndex, sessionIndex, e)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label">Tiết kết thúc</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="endTime"
                                                min={1}
                                                max={12}
                                                value={session.endTime}
                                                onChange={(e) => handleSessionChange(groupIndex, sessionIndex, e)}
                                                required
                                            />
                                        </div>
                                        <div className='remove-session-button col-md-1 d-flex align-items-center'>
                                            <IoIosRemoveCircle onClick={() => { removeSession(groupIndex, sessionIndex) }} />
                                        </div>

                                    </div>
                                ))}

                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => addSession(groupIndex)}
                                    className="mt-2"
                                >
                                    + Thêm buổi học
                                </Button>
                            </div>
                        ))}

                        <Button variant="success" onClick={addGroup} className="mb-3">
                            + Thêm nhóm
                        </Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex gap-2">
                        <Button variant="primary" form='createSubjectForm' type="submit">Lưu</Button>
                        <Button variant="secondary" onClick={handleHideModal}>Đóng</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditSubjectModal