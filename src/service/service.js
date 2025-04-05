const isConflict = (currentSessions, newSession) => {
    for (let i = 0; i < currentSessions.length; i++) {
        let session = currentSessions[i];
        if (session.date === newSession.date) {
            if (!(newSession.endTime < session.startTime || newSession.startTime > session.endTime)) {
                return true;
            }
        }
    }
    return false;
}

export const findAllSchedules = (subjects) => {

    let validSchedules = [];

    function findSchedules(subjectIndex, currentSessions, selectedGroups) {
        if (subjectIndex == subjects.length) {
            validSchedules.push([...selectedGroups]);
            return;
        }
        const subject = subjects[subjectIndex];
        for (const group of subject.groups) {
            let conflict = false;
            for (const session of group.sessions) {
                if (isConflict(currentSessions, session)) {
                    conflict = true;
                    break;
                }
            }
            if (!conflict) {
                const newSessions = [...currentSessions, ...group.sessions];
                const newSelectedGroups = [...selectedGroups, { subject: subject.id, group: group.groupId }];
                findSchedules(subjectIndex + 1, newSessions, newSelectedGroups);
            }
        }
    }
    findSchedules(0, [], []);

    return validSchedules;
}

export const checkValidSubjectId = (subjectId, subjects) => {
    if (!subjectId) return false;
    for (let i = 0; i < subjects.length; i++) {
        if (subjects[i].id === subjectId) {
            return false;
        }
    }
    return true;
}