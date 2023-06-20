export const postCategoryOptions = [
    { value: "", label: "Select Category", icon: "/images/script-icon.png" },
    { value: "script", label: "Script", icon: "/images/script-icon.png", },
    { value: "announcement", label: "Announcement", icon: "/images/announcement-icon.png", },
    { value: "jobs", label: "Job", icon: "/images/job-icon.png" },
    { value: "internship", label: "Internship", icon: "/images/intern.png" },
    { value: "mentoring", label: "Mentoring", icon: "/images/more-icon.png" },
    { value: "question", label: "Question", icon: "/images/more-icon.png" },
    { value: "services", label: "Services", icon: "/images/more-icon.png" },
    { value: "collegefestives", label: "College festives", icon: "/images/more-icon.png" },
    { value: "scholarship", label: "scholarship", icon: "/images/more-icon.png" },
    { value: "culturalevents ", label: "cultural events", icon: "/images/more-icon.png" },
    { value: "conferences", label: "conferences", icon: "/images/more-icon.png" },
    { value: "competitions", label: "competitions", icon: "/images/more-icon.png", },
    { value: "hackathon", label: "hackathon", icon: "/images/more-icon.png" },
    { value: "hiringchallenges", label: "Hiring Challenges", icon: "/images/more-icon.png", },
    { value: "campusrecruitment", label: "Campus Recruitment", icon: "/images/more-icon.png", },
];

const workModeArray = [
    { id: 1, modeName: 'Work From Home', key: 'workFromHome' },
    { id: 2, modeName: 'Work From Office', key: 'workFromOffice' },
    { id: 3, modeName: 'Hybrid', key: 'hybrid' },
]

const jobTypeArray = [
    { id: 1, jobTypeName: 'Frontend Developer', key: 'frontendDeveloper' },
    { id: 2, jobTypeName: 'Designer', key: 'designer' },
    { id: 3, jobTypeName: 'Backend Developer', key: 'backendDeveloper' },
]
const statusArray = [
    { id: 1, name: "Enable" },
    { id: 2, name: "Disable" },
]
export const offlineData = {
    workMode: workModeArray,
    jobType: jobTypeArray,
    status: statusArray
}
export const postFiltersArray = [
    {
        displayName: 'Status',
        key: 'status',
        postTypes: ['jobs', 'internship', 'collegefestives', 'scholarship', 'culturalevents', 'conferences', 'hackathon', 'hiringchallenges', 'campusrecruitment'],
        isSearchable: true,
        isDisabled: (values) => { return false }
    }, {
        displayName: 'State',
        key: 'state',
        postTypes: ['jobs', 'internship'],
        isSearchable: true,
        isDisabled: (values) => { return false }
    }, {
        displayName: 'City',
        key: 'city',
        postTypes: ['jobs', 'internship'],
        isSearchable: true,
        isDisabled: (values) => { return values.state ? false : true },
    }, {
        displayName: 'Department',
        key: 'department',
        postTypes: ['jobs', 'internship'],
        isSearchable: true,
        isDisabled: (values) => { return false },
    }, {
        displayName: 'Sub Department',
        key: 'subDepartment',
        postTypes: ['jobs', 'internship', 'mentoring', 'question', 'services', 'scholarship', 'culturalevents', 'conferences', 'competitions', 'hackathon', 'hiringchallenges', 'campusrecruitment'],
        isSearchable: true,
        isDisabled: (values) => { return values.department ? false : true },
    }, {
        displayName: 'Work Mode',
        key: 'workMode',
        postTypes: ['jobs', 'internship'],
        isSearchable: true,
        isDisabled: (values) => { return false },
    }, {
        displayName: 'Job Type',
        key: 'jobType',
        postTypes: ['jobs', 'internship'],
        isSearchable: true,
        isDisabled: (values) => { return false },
    }, {
        displayName: 'Job Role',
        key: 'jobRole',
        postTypes: ['jobs', 'internship'],
        isSearchable: true,
        isDisabled: (values) => { return false },
    }, {
        displayName: 'Eligibility',
        key: 'eligibility',
        postTypes: ['collegefestives', 'services', 'question', 'mentoring'],
        isSearchable: true,
        isDisabled: (values) => { return false },
    }, {
        displayName: 'Organization',
        key: 'organization',
        postTypes: ['question'],
        isSearchable: true,
        isDisabled: (values) => { return false },
    }, {
        displayName: 'College',
        key: 'college',
        postTypes: ['question'],
        isSearchable: true,
        isDisabled: (values) => { return false },
    }, {
        displayName: 'Course',
        key: 'course',
        postTypes: ['question'],
        isSearchable: true,
        isDisabled: (values) => { return values.college ? false : true },
    }, {
        displayName: 'Exam',
        key: 'exam',
        postTypes: ['question'],
        isSearchable: true,
        isDisabled: (values) => { return false },
    }, {
        displayName: 'Corporate',
        key: 'corporate',
        postTypes: ['question'],
        isSearchable: true,
        isDisabled: (values) => { return false },
    },
]