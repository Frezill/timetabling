const is_conflict = (existing_sessions, new_session) => {
    for (let i = 0; i < existing_sessions.length; i++) {
        let session = existing_sessions[i];
        if (session.date === new_session.date) {
            if (!(new_session.endTime < session.startTime || new_session.startTime > session.endTime)) {
                return true;
            }
        }
    }
    return false;
}

export const find_all_valid_schedules = (subjects) => {

    let valid_schedules = [];

    function backtrack_collect(subject_index, current_sessions, selected_groups) {
        if (subject_index == subjects.length) {
            valid_schedules.push([...selected_groups]);
            return;
        }
        const subject = subjects[subject_index];
        for (const group of subject.groups) {
            let conflict = false;
            for (const session of group.sessions) {
                if (is_conflict(current_sessions, session)) {
                    conflict = true;
                    break;
                }
            }
            if (!conflict) {
                const new_sessions = [...current_sessions, ...group.sessions];
                const new_selected_groups = [...selected_groups, { subject: subject.id, group: group.groupId }];
                backtrack_collect(subject_index + 1, new_sessions, new_selected_groups);
            }
        }
    }
    backtrack_collect(0, [], []);

    return valid_schedules;
}