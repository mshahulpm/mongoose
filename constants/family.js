module.exports = {

    users: [
        { name: 'jhon', dob: new Date('2-25-62'), place: 'mlp', gender: 'male', app_no: '10000' },
        { name: 'mary', dob: new Date('2-25-82'), place: 'mlp', gender: 'female', app_no: '10001' },
        { name: 'shawn', dob: new Date('2-25-95'), place: 'mlp', gender: 'male', app_no: '10003' },
        { name: 'liya', dob: new Date('2-25-96'), place: 'mlp', gender: 'female', app_no: '10004' },
        { name: 'sophy', dob: new Date('2-25-97'), place: 'mlp', gender: 'female', app_no: '10005' },

        { name: 'loosy', dob: new Date('2-25-72'), place: 'mlp', gender: 'female', app_no: '10002' },
        { name: 'michle', dob: new Date('2-25-92'), place: 'mlp', gender: 'male', app_no: '10006' },
        { name: 'angela', dob: new Date('2-25-94'), place: 'mlp', gender: 'female', app_no: '10007' },

        { name: 'liya-hus', dob: new Date('2-25-90'), place: 'mlp', gender: 'male', app_no: '10008' },
        { name: 'sophy-hus', dob: new Date('2-25-93'), place: 'mlp', gender: 'male', app_no: '10009' },

        { name: 'liya-daghter', dob: new Date('2-25-2012'), place: 'mlp', gender: 'female', app_no: '10010' },
        { name: 'sophy-son', dob: new Date('2-25-2015'), place: 'mlp', gender: 'male', app_no: '10011' },

        { name: 'michle-wife', dob: new Date('2-25-95'), place: 'mlp', gender: 'female', app_no: '10016' },
        { name: 'angela-hus', dob: new Date('2-25-89'), place: 'mlp', gender: 'male', app_no: '10017' },

        { name: 'michle-son', dob: new Date('2-25-2010'), place: 'mlp', gender: 'male', app_no: '10012' },
        { name: 'angela-son', dob: new Date('2-25-2005'), place: 'mlp', gender: 'male', app_no: '10013' },
        { name: 'angela-son2', dob: new Date('2-25-2008'), place: 'mlp', gender: 'male', app_no: '10014' },
        { name: 'angela-son3', dob: new Date('2-25-2012'), place: 'mlp', gender: 'male', app_no: '10015' },

        { name: 'passed-son', dob: new Date('2-25-90'), place: 'mlp', gender: 'male', app_no: '10020' },
        { name: 'passed-grandson', dob: new Date('2-25-2012'), place: 'mlp', gender: 'male', app_no: '10021' },

    ],

    relation: [
        {
            father: '10000',
            father_name: "jhon",
            mother: '10001',
            mother_name: 'mary',
            status: 'current',
            children: [
                { app_no: '10003', name: 'shawn' },
                { app_no: '10004', name: 'liya' },
                { app_no: '10005', name: 'sophy' },
                { app_no: '', name: 'ellie' },
            ]
        },
        {
            father: '10000',
            father_name: "jhon",
            mother: '10002',
            mother_name: 'loosy',
            status: 'divorced',
            children: [
                { app_no: '10006', name: 'michle' },
                { app_no: '10007', name: 'angela' },
            ]
        },

        {
            father: '10000',
            father_name: "jhon",
            mother: '',
            mother_name: 'passed wife',
            status: 'passed',
            children: [
                { app_no: '10020', name: 'passed-son' },
                { app_no: '', name: 'angela' },
            ]
        },
        {
            father: '10020',
            father_name: "passed son",
            mother: '',
            mother_name: 'passed wife',
            status: 'passed',
            children: [
                { app_no: '10021', name: 'passed-grandson' },
                { app_no: '', name: 'angela' },
            ]
        },

        {
            father: '10008',
            father_name: "liya hus",
            mother: '10004',
            mother_name: 'liya',
            status: 'current',
            children: [
                { app_no: '10010', name: 'liya-daghter' },
            ]
        },

        {
            father: '10009',
            father_name: "sophy hus",
            mother: '10005',
            mother_name: 'sophy',
            status: 'current',
            children: [
                { app_no: '10011', name: 'sophy-son' },
            ]
        },

        {
            father: '10006',
            father_name: "michle",
            mother: '10016',
            mother_name: 'michle wife',
            status: 'current',
            children: [
                { app_no: '10012', name: 'michle-son' },
            ]
        },

        {
            father: '10006',
            father_name: "michle",
            mother: '',
            mother_name: 'michle passed wife',
            status: 'passed',
            children: [
                { app_no: '', name: 'michle-passed-son' },
            ]
        },

        {
            father: '10017',
            father_name: "angela hus",
            mother: '10007',
            mother_name: 'angela',
            status: 'current',
            children: [
                { app_no: '10013', name: 'angela-son' },
                { app_no: '10014', name: 'angela-son2' },
                { app_no: '10015', name: 'angela-son3' },
            ]
        },

    ]

}