// Verified Campus Data for DVR & Dr. HS MIC College of Technology
// Source: Official College Plan Map & Main Academic Block Directory Signboards

const seedData = {
  buildings: [
    {
      id: 'bldg-macb',
      name: 'Main & Administrative Block',
      code: 'MACB',
      type: 'Academic & Administrative',
      floors_count: 3,
      description: 'The premier central academic building housing major engineering departments (CSE, IT, Mechanical, EEE, AI, ECE, Civil, MCA), Administrative Offices, Central Library, Examination Section, and T&P Cell.',
      icon: '???',
      category: 'academic',
      color: '#1e40af',
      svg_shape: { x: 380, y: 150, width: 100, height: 420, label: 'Main Academic Block' }
    },
    {
      id: 'bldg-dip1',
      name: 'Diploma Block-1',
      code: 'DIP-1',
      type: 'Academic (Diploma)',
      floors_count: 1,
      description: 'Dedicated academic block for Polytechnic and Diploma engineering courses, faculty chambers, and tutorial rooms.',
      icon: '??',
      category: 'academic',
      color: '#0369a1',
      svg_shape: { x: 280, y: 145, width: 35, height: 150, label: 'Diploma Block-1' }
    },
    {
      id: 'bldg-dip2',
      name: 'Diploma Block-2',
      code: 'DIP-2',
      type: 'Academic (Diploma)',
      floors_count: 1,
      description: 'Polytechnic laboratories, drawing halls, and classrooms for Diploma disciplines.',
      icon: '??',
      category: 'academic',
      color: '#0284c7',
      svg_shape: { x: 280, y: 400, width: 35, height: 135, label: 'Diploma Block-2' }
    },
    {
      id: 'bldg-bed',
      name: 'BED Block',
      code: 'BED',
      type: 'Academic (Teacher Education)',
      floors_count: 3,
      description: 'Faculty of Education block comprising 3 verified floors with specialized pedagogy lecture halls, psychological labs, and conference room.',
      icon: '??',
      category: 'academic',
      color: '#4338ca',
      svg_shape: { x: 70, y: 350, width: 180, height: 60, label: 'BED Block' }
    },
    {
      id: 'bldg-labs',
      name: 'Mechanical & Civil Engineering Labs',
      code: 'ENG-LABS',
      type: 'Engineering Laboratories',
      floors_count: 1,
      description: 'Extensive heavy machinery and practical testing facilities including Thermal Engineering Lab, Strength of Materials Lab, Surveying, Fluid Mechanics, and Manufacturing Technology Workshop.',
      icon: '??',
      category: 'labs',
      color: '#0d9488',
      svg_shape: { x: 70, y: 440, width: 180, height: 130, label: 'Mech & Civil Labs' }
    },
    {
      id: 'bldg-lib',
      name: 'Central Library',
      code: 'LIB',
      type: 'Library & Learning Resource',
      floors_count: 2,
      description: 'State-of-the-art Knowledge Centre located in the North Wing, featuring digital journals (IEEE/Springer), 50,000+ volumes, spacious reference halls, and quiet study spaces across 1st and 2nd floors.',
      icon: '??',
      category: 'library',
      color: '#7c3aed',
      svg_shape: { x: 330, y: 110, width: 150, height: 45, label: 'Central Library' }
    },
    {
      id: 'bldg-gh',
      name: 'Girls Hostel & Dining Hall',
      code: 'GH',
      type: 'Residential & Dining',
      floors_count: 3,
      description: 'Secure, modern residential facility for female students with attached dining hall, recreational lounge, and 24/7 security.',
      icon: '??',
      category: 'hostel',
      color: '#db2777',
      svg_shape: { x: 80, y: 100, width: 150, height: 130, label: 'Girls Hostel' }
    },
    {
      id: 'bldg-bh',
      name: 'Boys Hostel',
      code: 'BH',
      type: 'Residential',
      floors_count: 3,
      description: 'Spacious on-campus residential accommodation for male students. Access strictly via internal campus road network from Main Gate.',
      icon: '??',
      category: 'hostel',
      color: '#ea580c',
      svg_shape: { x: 380, y: 620, width: 95, height: 40, label: 'Boys Hostel' }
    },
    {
      id: 'bldg-canteen',
      name: 'Campus Canteen',
      code: 'CANTEEN',
      type: 'Dining',
      floors_count: 1,
      description: 'Multi-cuisine student canteen providing food and refreshments for students, faculty, and campus visitors.',
      icon: '?',
      category: 'food',
      color: '#ca8a04',
      svg_shape: { x: 70, y: 620, width: 85, height: 40, label: 'Campus Canteen' }
    },
    {
      id: 'bldg-auditorium',
      name: 'College Auditorium',
      code: 'AUDITORIUM',
      type: 'Events & Seminars',
      floors_count: 1,
      description: 'Air-conditioned college auditorium used for seminars, cultural events, technical symposiums, workshops, and major campus programs.',
      icon: '??',
      category: 'events',
      color: '#7c3aed',
      svg_shape: { x: 165, y: 620, width: 85, height: 40, label: 'College Auditorium' }
    },
    {
      id: 'bldg-gym',
      name: 'Open Gym & Staff Quarters',
      code: 'GYM-STAFF',
      type: 'Fitness & Residential',
      floors_count: 2,
      description: 'Outdoor fitness equipment zone and residential quarters for campus faculty and staff members.',
      icon: '??',
      category: 'sports',
      color: '#16a34a',
      svg_shape: { x: 280, y: 620, width: 85, height: 40, label: 'Open Gym / Quarters' }
    },
    {
      id: 'bldg-cafe',
      name: 'Cafeteria & Refreshment Kiosk',
      code: 'CAFE',
      type: 'Food & Refreshment',
      floors_count: 1,
      description: 'Quick refreshment point serving snacks, fresh juices, tea, coffee, and beverages near the Bus Bay.',
      icon: '??',
      category: 'food',
      color: '#d97706',
      svg_shape: { x: 550, y: 90, width: 100, height: 45, label: 'Cafeteria' }
    },
    {
      id: 'bldg-ground',
      name: 'Play Ground & Cricket Nets',
      code: 'GROUND',
      type: 'Sports Arena',
      floors_count: 1,
      description: 'Full-sized college sports ground accommodating football, cricket pitch, dedicated cricket practice nets, and athletic tracks.',
      icon: '?',
      category: 'sports',
      color: '#15803d',
      svg_shape: { x: 530, y: 340, width: 340, height: 280, label: 'Play Ground' }
    },
    {
      id: 'bldg-busbay',
      name: 'Bus Bay & Transport Zone',
      code: 'BUS-BAY',
      type: 'Transport Terminal',
      floors_count: 1,
      description: 'Central fleet depot for college buses operating across Vijayawada, Guntur, Nandigama, and surrounding regions.',
      icon: '??',
      category: 'transport',
      color: '#0284c7',
      svg_shape: { x: 670, y: 90, width: 190, height: 45, label: 'Bus Bay' }
    },
    {
      id: 'bldg-parking1',
      name: 'Vehicle Parking-1 (Faculty & Two-Wheelers)',
      code: 'PARK-1',
      type: 'Vehicle Parking',
      floors_count: 1,
      description: 'Covered parking shed for faculty, staff, and student two-wheelers along the western avenue of the main pathway.',
      icon: '???',
      category: 'parking',
      color: '#64748b',
      svg_shape: { x: 525, y: 150, width: 25, height: 160, label: 'Parking-1' }
    },
    {
      id: 'bldg-parking2',
      name: 'Vehicle Parking-2 (Buses & Four-Wheelers)',
      code: 'PARK-2',
      type: 'Vehicle Parking',
      floors_count: 1,
      description: 'Spacious parking lot for four-wheelers, VIP vehicles, and auxiliary transport vehicles.',
      icon: '???',
      category: 'parking',
      color: '#475569',
      svg_shape: { x: 845, y: 150, width: 25, height: 170, label: 'Parking-2' }
    },
    {
      id: 'bldg-gate',
      name: 'Main Gate & Security Post',
      code: 'GATE',
      type: 'Only Campus Entrance / Exit',
      floors_count: 1,
      description: 'The SOLE verified entrance and exit portal of MIC College of Technology connecting to the state highway NH-65 with 24/7 security desk.',
      icon: '??',
      category: 'transport',
      color: '#b91c1c',
      svg_shape: { x: 870, y: 645, width: 85, height: 45, label: 'Main Gate (Only Entry)' }
    }
  ],

  floors: [
    {
      id: 'floor-macb-gf',
      building_id: 'bldg-macb',
      floor_number: 0,
      floor_name: 'Ground Floor',
      description: 'Ground level of Main Academic Block housing CSE, Mechanical, IT, Computer Applications, and Physical Education Departments.',
      verified_directory: [
        'Dept of CSE',
        'Dept of Mechanical Engg',
        'Dept of IT',
        'Dept of Computer Applications',
        'Physical Education Dept'
      ]
    },
    {
      id: 'floor-macb-ff',
      building_id: 'bldg-macb',
      floor_number: 1,
      floor_name: 'First Floor',
      description: 'First floor level housing Administrative Office, EEE, AI, Central Library, Examination Section, and T & P Cell.',
      verified_directory: [
        'Administrative Office',
        'Dept of EEE',
        'Dept of AI',
        'Central Library',
        'Examination Section',
        'T & P Cell'
      ]
    },
    {
      id: 'floor-macb-sf',
      building_id: 'bldg-macb',
      floor_number: 2,
      floor_name: 'Second Floor',
      description: 'Second floor level housing ECE and Civil Engineering Departments and Central Library upper reading gallery.',
      verified_directory: [
        'Dept of ECE',
        'Dept of Civil Engg',
        'Central Library (Reference & E-Resource Arena)'
      ]
    },
    {
      id: 'floor-bed-gf',
      building_id: 'bldg-bed',
      floor_number: 0,
      floor_name: 'Ground Floor',
      description: 'B.Ed Administrative office, Principal cabin, and foundational education classrooms.',
      verified_directory: ['B.Ed Admin Office', 'Principal Chamber', 'Lecture Hall 1']
    },
    {
      id: 'floor-bed-ff',
      building_id: 'bldg-bed',
      floor_number: 1,
      floor_name: 'First Floor',
      description: 'B.Ed Educational Psychology Lab, Language Lab, and smart lecture rooms.',
      verified_directory: ['Psychology Lab', 'Language Learning Lab', 'Lecture Hall 2 & 3']
    },
    {
      id: 'floor-bed-sf',
      building_id: 'bldg-bed',
      floor_number: 2,
      floor_name: 'Second Floor',
      description: 'B.Ed Seminar Hall, Curriculum Resource Center, and Art & Craft Studio.',
      verified_directory: ['B.Ed Seminar Hall', 'Curriculum Resource Room', 'Art & Craft Studio']
    },
    {
      id: 'floor-dip1-gf',
      building_id: 'bldg-dip1',
      floor_number: 0,
      floor_name: 'Ground Floor',
      description: 'Polytechnic administrative desk and Diploma Mechanical & Electrical lecture rooms.',
      verified_directory: ['Diploma Admin', 'Polytechnic Lecture Rooms 1-4']
    },
    {
      id: 'floor-dip2-gf',
      building_id: 'bldg-dip2',
      floor_number: 0,
      floor_name: 'Ground Floor',
      description: 'Diploma Electrical Machines Lab and Basic Electronics Workshop.',
      verified_directory: ['Diploma Electrical Lab', 'Diploma Electronics Lab']
    },
    {
      id: 'floor-bed-tf',
      building_id: 'bldg-bed',
      floor_number: 3,
      floor_name: 'Third Floor',
      description: 'BED Block Third Floor',
      verified_directory: []
    },
    {
      id: 'floor-labs-gf',
      building_id: 'bldg-labs',
      floor_number: 0,
      floor_name: 'Ground Floor',
      description: 'Mechanical & Civil Engineering Labs Ground Floor',
      verified_directory: []
    }
  ],
  departments: [
  {
    id: 'dept-cse',
    building_id: 'bldg-macb',
    floor_id: 'floor-macb-gf',
    name: 'Department of Computer Science & Engineering',
    code: 'CSE',
    hod: 'Dr. Head of Department, CSE',
    description: 'Computer Science and Engineering department covering programming, software engineering, computer networks, databases, AI, and computing systems.',
    icon: '??'
  },
    { id: 'dept-mech', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', name: 'Department of Mechanical Engineering', code: 'MECH', hod: 'Dr. Head of Department, ME', description: 'Dedicated to thermodynamics, robotics, manufacturing systems, CAD/CAM, and automotive engineering.', icon: '??' },
    { id: 'dept-it', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', name: 'Department of Information Technology', code: 'IT', hod: 'Dr. Head of Department, IT', description: 'Focusing on distributed systems, enterprise software, data networks, and web engineering.', icon: '??' },
    { id: 'dept-mca', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', name: 'Department of Computer Applications (MCA)', code: 'MCA', hod: 'Head of Department, MCA', description: 'Postgraduate computer applications program fostering enterprise solutions and full-stack software development.', icon: '??' },
    { id: 'dept-pe', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', name: 'Physical Education Department', code: 'PED', hod: 'Physical Director', description: 'Coordination center for university sports, inter-college athletic meets, gymnasium, and indoor sports.', icon: '??' },
    { id: 'dept-admin', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', name: 'Administrative Office & Principal Secretariat', code: 'ADMIN', hod: 'Principal & Administrative Officer', description: 'Apex administrative hub handling college governance, admissions, student affairs, accounts, and academic scheduling.', icon: '???' },
    { id: 'dept-eee', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', name: 'Department of Electrical & Electronics Engineering', code: 'EEE', hod: 'Dr. Head of Department, EEE', description: 'Pioneering smart grid technologies, power electronics, renewable energy, and control systems.', icon: '?' },
    { id: 'dept-ai', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', name: 'Department of Artificial Intelligence (AI & DS)', code: 'AI-DS', hod: 'Dr. Head of Department, AI', description: 'Specialized department for Machine Learning, Deep Learning, Generative AI, Computer Vision, and Big Data Analytics.', icon: '??' },
    { id: 'dept-lib', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', name: 'Central Library & Information Centre', code: 'CENT-LIB', hod: 'Librarian & Knowledge Officer', description: 'Comprehensive academic resource center with print volumes, digital subscriptions, IEEE/DELNET access, and reference halls.', icon: '??' },
    { id: 'dept-exam', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', name: 'Examination Section (Autonomous)', code: 'EXAM-CELL', hod: 'Controller of Examinations', description: 'Confidential examination wing managing semester evaluations, question paper generation, grading, and transcript issuance.', icon: '??' },
    { id: 'dept-tnp', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', name: 'Training & Placement Cell (T & P Cell)', code: 'T&P-CELL', hod: 'Dean - Placements & Corporate Relations', description: 'Industry linkage hub conducting campus recruitment drives, soft skills training, mock interviews, and internships.', icon: '??' },
    { id: 'dept-ece', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', name: 'Department of Electronics & Communication Engineering', code: 'ECE', hod: 'Dr. Head of Department, ECE', description: 'Excellence in VLSI design, wireless communications, IoT sensors, antenna design, and embedded systems.', icon: '??' },
    { id: 'dept-civil', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', name: 'Department of Civil Engineering', code: 'CIVIL', hod: 'Dr. Head of Department, Civil', description: 'Disciplines in structural design, environmental engineering, geotechnical analysis, and sustainable urban infrastructure.', icon: '???' }
  ],

  // Comprehensive Room Database
  rooms: [
    { "id": "room-1101", "room_number": "1101", "name": "Medical Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Room", "description": "Medical Room (1101)" },
    { "id": "room-1102", "room_number": "1102", "name": "Stationary", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Room", "description": "Stationary (1102)" },
    { "id": "room-1103", "room_number": "1103", "name": "Amenitics/Transport Office", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Office", "description": "Amenitics/Transport Office (1103)" },
    { "id": "room-1104", "room_number": "1104", "name": "CSE-Dept Office", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Office", "description": "CSE-Dept Office (1104)" },
    { "id": "room-1105", "room_number": "1105", "name": "Tutorial / Staff Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Room", "description": "Tutorial / Staff Room (1105)" },
    { "id": "room-1106", "room_number": "1106", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Classroom", "description": "Classroom (1106)" },
    { "id": "room-1107", "room_number": "1107", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Classroom", "description": "Classroom (1107)" },
    { "id": "room-1108", "room_number": "1108", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Classroom", "description": "Classroom (1108)" },
    { "id": "room-1109", "room_number": "1109", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Classroom", "description": "Classroom (1109)" },
    { "id": "room-1110", "room_number": "1110", "name": "Seminar Hall", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Seminar Hall", "description": "Seminar Hall (1110)" },
    { "id": "room-1111", "room_number": "1111", "name": "Staff Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Room", "description": "Staff Room (1111)" },
    { "id": "room-1112", "room_number": "1112", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Classroom", "description": "Classroom (1112)" },
    { "id": "room-1113", "room_number": "1113", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Classroom", "description": "Classroom (1113)" },
    { "id": "room-1114", "room_number": "1114", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Classroom", "description": "Classroom (1114)" },
    { "id": "room-1115", "room_number": "1115", "name": "Store Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Store Room", "description": "Store Room (1115)" },
    { "id": "room-1116", "room_number": "1116", "name": "CAD / CAM Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Laboratory", "description": "CAD / CAM Lab (1116)" },
    { "id": "room-1117", "room_number": "1117", "name": "Boys Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Wash Room", "description": "Boys Wash Room (1117)" },
    { "id": "room-1118", "room_number": "1118", "name": "Power Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Room", "description": "Power Room (1118)" },
    { "id": "room-1119", "room_number": "1119", "name": "Common Room / Girls Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Wash Room", "description": "Common Room / Girls Wash Room (1119)" },
    { "id": "room-1120", "room_number": "1120", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Classroom", "description": "Classroom (1120)" },
    { "id": "room-1121", "room_number": "1121", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Classroom", "description": "Classroom (1121)" },
    { "id": "room-1122", "room_number": "1122", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Classroom", "description": "Classroom (1122)" },
    { "id": "room-1123", "room_number": "1123", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Classroom", "description": "Classroom (1123)" },
    { "id": "room-1124", "room_number": "1124", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Classroom", "description": "Classroom (1124)" },
    { "id": "room-1125", "room_number": "1125", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Classroom", "description": "Classroom (1125)" },
    { "id": "room-1126", "room_number": "1126", "name": "Internal Quality Assurance Cell", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Room", "description": "Internal Quality Assurance Cell (1126)" },
    { "id": "room-1127", "room_number": "1127", "name": "ME-Dept Office", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-mech", "type": "Office", "description": "ME-Dept Office (1127)" },
    { "id": "room-1128", "room_number": "1128", "name": "Staff Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Room", "description": "Staff Room (1128)" },
    { "id": "room-1129", "room_number": "1129", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Classroom", "description": "Classroom (1129)" },
    { "id": "room-1130", "room_number": "1130", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Classroom", "description": "Classroom (1130)" },
    { "id": "room-1131", "room_number": "1131", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Classroom", "description": "Classroom (1131)" },
    { "id": "room-1132", "room_number": "1132", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Classroom", "description": "Classroom (1132)" },
    { "id": "room-1133", "room_number": "1133", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Classroom", "description": "Classroom (1133)" },
    { "id": "room-1134", "room_number": "1134", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Classroom", "description": "Classroom (1134)" },
    { "id": "room-1135", "room_number": "1135", "name": "Common Room / Girls Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Wash Room", "description": "Common Room / Girls Wash Room (1135)" },
    { "id": "room-1136", "room_number": "1136", "name": "Power Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Room", "description": "Power Room (1136)" },
    { "id": "room-1137", "room_number": "1137", "name": "Boys Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Wash Room", "description": "Boys Wash Room (1137)" },
    { "id": "room-1138", "room_number": "1138", "name": "Server Lab / Staff Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Laboratory", "description": "Server Lab / Staff Room (1138)" },
    { "id": "room-1139", "room_number": "1139", "name": "Computer Networks Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Laboratory", "description": "Computer Networks Lab (1139)" },
    { "id": "room-1140", "room_number": "1140", "name": "Lab - 4", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Laboratory", "description": "Lab - 4 (1140)" },
    { "id": "room-1141", "room_number": "1141", "name": "Lab - 3", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Laboratory", "description": "Lab - 3 (1141)" },
    { "id": "room-1142", "room_number": "1142", "name": "Boys Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (1142)" },
    { "id": "room-1143", "room_number": "1143", "name": "Girls Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (1143)" },
    { "id": "room-1144", "room_number": "1144", "name": "CSE Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Laboratory", "description": "CSE Lab (1144)" },
    { "id": "room-1145", "room_number": "1145", "name": "CSE Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Laboratory", "description": "CSE Lab (1145)" },
    { "id": "room-1146", "room_number": "1146", "name": "CSE Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Laboratory", "description": "CSE Lab (1146)" },
    { "id": "room-1147", "room_number": "1147", "name": "Computer Center - 1", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-cse", "type": "Room", "description": "Computer Center - 1 (1147)" },
    { "id": "room-1148", "room_number": "1148", "name": "IT-Dept Office", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": "dept-it", "type": "Office", "description": "IT-Dept Office (1148)" },
    { "id": "room-1149", "room_number": "1149", "name": "Indoor Games", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Room", "description": "Indoor Games (1149)" },
    { "id": "room-1150", "room_number": "1150", "name": "Indoor Games", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Room", "description": "Indoor Games (1150)" },
    { "id": "room-1151", "room_number": "1151", "name": "Head of Physical Dept", "building_id": "bldg-macb", "floor_id": "floor-macb-gf", "department_id": null, "type": "Office", "description": "Head of Physical Dept (1151)" },
    { "id": "room-1201", "room_number": "1201", "name": "Reception Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Room", "description": "Reception Room (1201)" },
    { "id": "room-1202", "room_number": "1202", "name": "Office Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Office", "description": "Office Room (1202)" },
    { "id": "room-1203", "room_number": "1203", "name": "Administration Office", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Office", "description": "Administration Office (1203)" },
    { "id": "room-1204", "room_number": "1204", "name": "Examination Cell", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Room", "description": "Examination Cell (1204)" },
    { "id": "room-1205", "room_number": "1205", "name": "Seminar Hall", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Seminar Hall", "description": "Seminar Hall (1205)" },
    { "id": "room-1206", "room_number": "1206", "name": "Simulation Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Laboratory", "description": "Simulation Lab (1206)" },
    { "id": "room-1207", "room_number": "1207", "name": "Simulation Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Laboratory", "description": "Simulation Lab (1207)" },
    { "id": "room-1208", "room_number": "1208", "name": "Electrical Circuits Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Laboratory", "description": "Electrical Circuits Lab (1208)" },
    { "id": "room-1209", "room_number": "1209", "name": "R & D Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Laboratory", "description": "R & D Lab (1209)" },
    { "id": "room-1210", "room_number": "1210", "name": "Power System Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Laboratory", "description": "Power System Lab (1210)" },
    { "id": "room-1211", "room_number": "1211", "name": "Boys Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (1211)" },
    { "id": "room-1212", "room_number": "1212", "name": "Store Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Store Room", "description": "Store Room (1212)" },
    { "id": "room-1213", "room_number": "1213", "name": "Girls Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (1213)" },
    { "id": "room-1214", "room_number": "1214", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Classroom", "description": "Classroom (1214)" },
    { "id": "room-1215", "room_number": "1215", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Classroom", "description": "Classroom (1215)" },
    { "id": "room-1216", "room_number": "1216", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Classroom", "description": "Classroom (1216)" },
    { "id": "room-1217", "room_number": "1217", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Classroom", "description": "Classroom (1217)" },
    { "id": "room-1218", "room_number": "1218", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Classroom", "description": "Classroom (1218)" },
    { "id": "room-1219", "room_number": "1219", "name": "Tutorial Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Room", "description": "Tutorial Room (1219)" },
    { "id": "room-1220", "room_number": "1220", "name": "EEE-Dept Office", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-eee", "type": "Office", "description": "EEE-Dept Office (1220)" },
    { "id": "room-1221", "room_number": "1221", "name": "AI-Dept Office", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-ai", "type": "Office", "description": "AI-Dept Office (1221)" },
    { "id": "room-1222", "room_number": "1222", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-ai", "type": "Classroom", "description": "Classroom (1222)" },
    { "id": "room-1223", "room_number": "1223", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-ai", "type": "Classroom", "description": "Classroom (1223)" },
    { "id": "room-1224", "room_number": "1224", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-ai", "type": "Classroom", "description": "Classroom (1224)" },
    { "id": "room-1225", "room_number": "1225", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-ai", "type": "Classroom", "description": "Classroom (1225)" },
    { "id": "room-1226", "room_number": "1226", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-ai", "type": "Classroom", "description": "Classroom (1226)" },
    { "id": "room-1227", "room_number": "1227", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-ai", "type": "Classroom", "description": "Classroom (1227)" },
    { "id": "room-1229", "room_number": "1229", "name": "Girls Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-ai", "type": "Wash Room", "description": "Girls Wash Room (1229)" },
    { "id": "room-1230", "room_number": "1230", "name": "Boys Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-ai", "type": "Wash Room", "description": "Boys Wash Room (1230)" },
    { "id": "room-1231", "room_number": "1231", "name": "Central Library", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Library", "description": "Central Library (1231)" },
    { "id": "room-1232", "room_number": "1232", "name": "Boys Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (1232)" },
    { "id": "room-1233", "room_number": "1233", "name": "Girls Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (1233)" },
    { "id": "room-1234", "room_number": "1234", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-cse", "type": "Classroom", "description": "Classroom (1234)" },
    { "id": "room-1235", "room_number": "1235", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": "dept-cse", "type": "Classroom", "description": "Classroom (1235)" },
    { "id": "room-1236", "room_number": "1236", "name": "APSSDC-CO / Skill Excellent Center", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Room", "description": "APSSDC-CO / Skill Excellent Center (1236)" },
    { "id": "room-1237", "room_number": "1237", "name": "Training & Placement Office", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Office", "description": "Training & Placement Office (1237)" },
    { "id": "room-1238", "room_number": "1238", "name": "Board Room", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Room", "description": "Board Room (1238)" },
    { "id": "room-1239", "room_number": "1239", "name": "Management Office", "building_id": "bldg-macb", "floor_id": "floor-macb-ff", "department_id": null, "type": "Office", "description": "Management Office (1239)" },
    { "id": "room-1301", "room_number": "1301", "name": "ECE-Dept Office", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Office", "description": "ECE-Dept Office (1301)" },
    { "id": "room-1302", "room_number": "1302", "name": "Staff Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Room", "description": "Staff Room (1302)" },
    { "id": "room-1303", "room_number": "1303", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Classroom", "description": "Classroom (1303)" },
    { "id": "room-1304", "room_number": "1304", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Classroom", "description": "Classroom (1304)" },
    { "id": "room-1305", "room_number": "1305", "name": "VLSI Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Laboratory", "description": "VLSI Lab (1305)" },
    { "id": "room-1306", "room_number": "1306", "name": "VLSI Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Laboratory", "description": "VLSI Lab (1306)" },
    { "id": "room-1307", "room_number": "1307", "name": "Tutorial Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Room", "description": "Tutorial Room (1307)" },
    { "id": "room-1308", "room_number": "1308", "name": "Seminar Hall", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Seminar Hall", "description": "Seminar Hall (1308)" },
    { "id": "room-1309", "room_number": "1309", "name": "DSP Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Laboratory", "description": "DSP Lab (1309)" },
    { "id": "room-1310", "room_number": "1310", "name": "ECE & PDC Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Laboratory", "description": "ECE & PDC Lab (1310)" },
    { "id": "room-1311", "room_number": "1311", "name": "DSD & DICA Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Laboratory", "description": "DSD & DICA Lab (1311)" },
    { "id": "room-1312", "room_number": "1312", "name": "Microwave & OC lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Laboratory", "description": "Microwave & OC lab (1312)" },
    { "id": "room-1313", "room_number": "1313", "name": "----", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": null, "type": "Room", "description": "---- (1313)" },
    { "id": "room-1314", "room_number": "1314", "name": "---", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": null, "type": "Room", "description": "--- (1314)" },
    { "id": "room-1315", "room_number": "1315", "name": "Store Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": null, "type": "Store Room", "description": "Store Room (1315)" },
    { "id": "room-1316", "room_number": "1316", "name": "Girls Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (1316)" },
    { "id": "room-1317", "room_number": "1317", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Classroom", "description": "Classroom (1317)" },
    { "id": "room-1318", "room_number": "1318", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Classroom", "description": "Classroom (1318)" },
    { "id": "room-1319", "room_number": "1319", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Classroom", "description": "Classroom (1319)" },
    { "id": "room-1320", "room_number": "1320", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Classroom", "description": "Classroom (1320)" },
    { "id": "room-1321", "room_number": "1321", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Classroom", "description": "Classroom (1321)" },
    { "id": "room-1322", "room_number": "1322", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Classroom", "description": "Classroom (1322)" },
    { "id": "room-1323", "room_number": "1323", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ece", "type": "Classroom", "description": "Classroom (1323)" },
    { "id": "room-1324", "room_number": "1324", "name": "Civil-Dept Office", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-civil", "type": "Office", "description": "Civil-Dept Office (1324)" },
    { "id": "room-1325", "room_number": "1325", "name": "Staff Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-civil", "type": "Room", "description": "Staff Room (1325)" },
    { "id": "room-1326", "room_number": "1326", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-civil", "type": "Classroom", "description": "Classroom (1326)" },
    { "id": "room-1327", "room_number": "1327", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-civil", "type": "Classroom", "description": "Classroom (1327)" },
    { "id": "room-1328", "room_number": "1328", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-civil", "type": "Classroom", "description": "Classroom (1328)" },
    { "id": "room-1329", "room_number": "1329", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-civil", "type": "Classroom", "description": "Classroom (1329)" },
    { "id": "room-1330", "room_number": "1330", "name": "Calssroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-civil", "type": "Room", "description": "Calssroom (1330)" },
    { "id": "room-1331", "room_number": "1331", "name": "EDC Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-civil", "type": "Laboratory", "description": "EDC Lab (1331)" },
    { "id": "room-1332", "room_number": "1332", "name": "Girls Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (1332)" },
    { "id": "room-1333", "room_number": "1333", "name": "Boys Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (1333)" },
    { "id": "room-1334", "room_number": "1334", "name": "Computers Center", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": null, "type": "Room", "description": "Computers Center (1334)" },
    { "id": "room-1335", "room_number": "1335", "name": "Boys Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (1335)" },
    { "id": "room-1336", "room_number": "1336", "name": "Girls Wash Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (1336)" },
    { "id": "room-1337", "room_number": "1337", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ai", "type": "Classroom", "description": "Classroom (1337)" },
    { "id": "room-1338", "room_number": "1338", "name": "Classroom", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ai", "type": "Classroom", "description": "Classroom (1338)" },
    { "id": "room-1339", "room_number": "1339", "name": "MPMC Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ai", "type": "Laboratory", "description": "MPMC Lab (1339)" },
    { "id": "room-1340", "room_number": "1340", "name": "Analog Application Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ai", "type": "Laboratory", "description": "Analog Application Lab (1340)" },
    { "id": "room-1341", "room_number": "1341", "name": "ADC Lab", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ai", "type": "Laboratory", "description": "ADC Lab (1341)" },
    { "id": "room-1342", "room_number": "1342", "name": "Staff Room", "building_id": "bldg-macb", "floor_id": "floor-macb-sf", "department_id": "dept-ai", "type": "Room", "description": "Staff Room (1342)" },
    { "id": "room-2101", "room_number": "2101", "name": "Seminar Hall", "building_id": "bldg-bed", "floor_id": "floor-bed-gf", "department_id": "dept-bed", "type": "Seminar Hall", "description": "Seminar Hall (2101)" },
    { "id": "room-2102", "room_number": "2102", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-gf", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2102)" },
    { "id": "room-2103", "room_number": "2103", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-gf", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2103)" },
    { "id": "room-2104", "room_number": "2104", "name": "Boys Wash Room", "building_id": "bldg-bed", "floor_id": "floor-bed-gf", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (2104)" },
    { "id": "room-2105", "room_number": "2105", "name": "Girls Wash Room", "building_id": "bldg-bed", "floor_id": "floor-bed-gf", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (2105)" },
    { "id": "room-2106", "room_number": "2106", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-gf", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2106)" },
    { "id": "room-2107", "room_number": "2107", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-gf", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2107)" },
    { "id": "room-2108", "room_number": "2108", "name": "BED-Dept Office", "building_id": "bldg-bed", "floor_id": "floor-bed-gf", "department_id": "dept-bed", "type": "Office", "description": "BED-Dept Office (2108)" },
    { "id": "room-2109", "room_number": "2109", "name": "Conference Hall", "building_id": "bldg-bed", "floor_id": "floor-bed-gf", "department_id": "dept-bed", "type": "Room", "description": "Conference Hall (2109)" },
    { "id": "room-2201", "room_number": "2201", "name": "Computer Center", "building_id": "bldg-bed", "floor_id": "floor-bed-ff", "department_id": "dept-bed", "type": "Room", "description": "Computer Center (2201)" },
    { "id": "room-2202", "room_number": "2202", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-ff", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2202)" },
    { "id": "room-2203", "room_number": "2203", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-ff", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2203)" },
    { "id": "room-2204", "room_number": "2204", "name": "Boys Wash Room", "building_id": "bldg-bed", "floor_id": "floor-bed-ff", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (2204)" },
    { "id": "room-2205", "room_number": "2205", "name": "Girls Wash Room", "building_id": "bldg-bed", "floor_id": "floor-bed-ff", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (2205)" },
    { "id": "room-2206", "room_number": "2206", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-ff", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2206)" },
    { "id": "room-2207", "room_number": "2207", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-ff", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2207)" },
    { "id": "room-2208", "room_number": "2208", "name": "Computer Lab 5&6", "building_id": "bldg-bed", "floor_id": "floor-bed-ff", "department_id": "dept-bed", "type": "Laboratory", "description": "Computer Lab 5&6 (2208)" },
    { "id": "room-2301", "room_number": "2301", "name": "Physics Lab", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": null, "type": "Laboratory", "description": "Physics Lab (2301)" },
    { "id": "room-2302", "room_number": "2302", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2302)" },
    { "id": "room-2303", "room_number": "2303", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2303)" },
    { "id": "room-2304", "room_number": "2304", "name": "Boys Wash Room", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (2304)" },
    { "id": "room-2305", "room_number": "2305", "name": "Girls Wash Room", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (2305)" },
    { "id": "room-2306", "room_number": "2306", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2306)" },
    { "id": "room-2307", "room_number": "2307", "name": "Classroom", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": "dept-bed", "type": "Classroom", "description": "Classroom (2307)" },
    { "id": "room-2308", "room_number": "2308", "name": "Staff Room", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": "dept-bed", "type": "Room", "description": "Staff Room (2308)" },
    { "id": "room-2309", "room_number": "2309", "name": "Tutorial Room", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": "dept-bed", "type": "Room", "description": "Tutorial Room (2309)" },
    { "id": "room-2310", "room_number": "2310", "name": "Tutorial Room", "building_id": "bldg-bed", "floor_id": "floor-bed-sf", "department_id": "dept-bed", "type": "Room", "description": "Tutorial Room (2310)" },
    { "id": "room-2401", "room_number": "2401", "name": "Drawing Hall", "building_id": "bldg-bed", "floor_id": "floor-bed-tf", "department_id": null, "type": "Room", "description": "Drawing Hall (2401)" },
    { "id": "room-4101", "room_number": "4101", "name": "Classroom", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4101)" },
    { "id": "room-4102", "room_number": "4102", "name": "Classroom", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4102)" },
    { "id": "room-4103", "room_number": "4103", "name": "Classroom", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4103)" },
    { "id": "room-4104", "room_number": "4104", "name": "Classroom", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4104)" },
    { "id": "room-4105", "room_number": "4105", "name": "Classroom", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4105)" },
    { "id": "room-4106", "room_number": "4106", "name": "Boys Wash Room", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (4106)" },
    { "id": "room-4107", "room_number": "4107", "name": "Girls Wash Room", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Wash Room", "description": "Girls Wash Room (4107)" },
    { "id": "room-4108", "room_number": "4108", "name": "Staff Room", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Room", "description": "Staff Room (4108)" },
    { "id": "room-4109", "room_number": "4109", "name": "Classroom", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4109)" },
    { "id": "room-4110", "room_number": "4110", "name": "Classroom", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4110)" },
    { "id": "room-4111", "room_number": "4111", "name": "Classroom", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4111)" },
    { "id": "room-4112", "room_number": "4112", "name": "Classroom", "building_id": "bldg-dip1", "floor_id": "floor-dip1-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4112)" },
    { "id": "room-4113", "room_number": "4113", "name": "Diploma Office Room / NSS Cell", "building_id": "bldg-dip2", "floor_id": "floor-dip2-gf", "department_id": null, "type": "Office", "description": "Diploma Office Room / NSS Cell (4113)" },
    { "id": "room-4114", "room_number": "4114", "name": "Staff Room", "building_id": "bldg-dip2", "floor_id": "floor-dip2-gf", "department_id": null, "type": "Room", "description": "Staff Room (4114)" },
    { "id": "room-4115", "room_number": "4115", "name": "Classroom", "building_id": "bldg-dip2", "floor_id": "floor-dip2-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4115)" },
    { "id": "room-4116", "room_number": "4116", "name": "Classroom", "building_id": "bldg-dip2", "floor_id": "floor-dip2-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4116)" },
    { "id": "room-4117", "room_number": "4117", "name": "Classroom", "building_id": "bldg-dip2", "floor_id": "floor-dip2-gf", "department_id": null, "type": "Classroom", "description": "Classroom (4117)" },
    { "id": "room-3101", "room_number": "3101", "name": "Chemistry Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Chemistry Lab (3101)" },
    { "id": "room-3102", "room_number": "3102", "name": "Chemistry Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Chemistry Lab (3102)" },
    { "id": "room-3103", "room_number": "3103", "name": "Engineering Workshop", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Room", "description": "Engineering Workshop (3103)" },
    { "id": "room-3104", "room_number": "3104", "name": "Transportation Engineering Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Transportation Engineering Lab (3104)" },
    { "id": "room-3105", "room_number": "3105", "name": "Geo-Technical Engineering Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Geo-Technical Engineering Lab (3105)" },
    { "id": "room-3106", "room_number": "3106", "name": "Concrete Technology Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": "dept-civil", "type": "Laboratory", "description": "Concrete Technology Lab (3106)" },
    { "id": "room-3107", "room_number": "3107", "name": "Engineering Mechanics Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Engineering Mechanics Lab (3107)" },
    { "id": "room-3108", "room_number": "3108", "name": "Store Room", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Store Room", "description": "Store Room (3108)" },
    { "id": "room-3109", "room_number": "3109", "name": "Production Technology Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Production Technology Lab (3109)" },
    { "id": "room-3110", "room_number": "3110", "name": "NCES & R & AC Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "NCES & R & AC Lab (3110)" },
    { "id": "room-3111", "room_number": "3111", "name": "Machine Tools Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Machine Tools Lab (3111)" },
    { "id": "room-3112", "room_number": "3112", "name": "Boys Wash Room", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Wash Room", "description": "Boys Wash Room (3112)" },
    { "id": "room-3113", "room_number": "3113", "name": "Mechanics & Solids Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Mechanics & Solids Lab (3113)" },
    { "id": "room-3114", "room_number": "3114", "name": "FM & HM Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "FM & HM Lab (3114)" },
    { "id": "room-3115", "room_number": "3115", "name": "Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Lab (3115)" },
    { "id": "room-3116", "room_number": "3116", "name": "Power Room", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Room", "description": "Power Room (3116)" },
    { "id": "room-3117", "room_number": "3117", "name": "EEE Workshop", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": "dept-eee", "type": "Room", "description": "EEE Workshop (3117)" },
    { "id": "room-3118", "room_number": "3118", "name": "Drawing Hall", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Room", "description": "Drawing Hall (3118)" },
    { "id": "room-3119", "room_number": "3119", "name": "Surviving Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Surviving Lab (3119)" },
    { "id": "room-3120", "room_number": "3120", "name": "---", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Room", "description": "--- (3120)" },
    { "id": "room-3121", "room_number": "3121", "name": "---", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Room", "description": "--- (3121)" },
    { "id": "room-3122", "room_number": "3122", "name": "Heat Tranfer Lab", "building_id": "bldg-labs", "floor_id": "floor-labs-gf", "department_id": null, "type": "Laboratory", "description": "Heat Tranfer Lab (3122)" },
  ],

  facilities: [
    { id: 'fac-lib', name: 'Central Library', category: 'library', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', location_desc: 'Main Academic Block, 1st & 2nd Floor North Wing', icon: '??', description: 'Over 50,000 volumes, international e-journals, DELNET, IEEE digital repository, and silent study chambers.' },
    { id: 'fac-canteen', name: 'Main Canteen', category: 'food', building_id: 'bldg-canteen', floor_id: null, location_desc: 'South-West Campus Complex', icon: '???', description: 'Hygienic vegetarian and non-vegetarian meals, snacks, fresh fruit juices, and student dining.' },
    { id: 'fac-auditorium', name: 'College Auditorium', category: 'academic', building_id: 'bldg-auditorium', floor_id: null, location_desc: 'Adjacent to Campus Canteen', icon: '??', description: 'Air-conditioned 1000+ seat venue with digital projection for conferences and cultural events.' },
    { id: 'fac-cafe', name: 'Campus Cafeteria', category: 'food', building_id: 'bldg-cafe', floor_id: null, location_desc: 'North-East Bus Bay Area', icon: '?', description: 'Quick bites, tea, espresso, baked goods, and ice creams.' },
    { id: 'fac-dining', name: 'Hostel Dining Hall', category: 'food', building_id: 'bldg-gh', floor_id: null, location_desc: 'North-West Girls Hostel Complex', icon: '??', description: 'Nutritious buffet meals for hostel boarders.' },
    { id: 'fac-ground', name: 'Main Sports Arena & Athletics Track', category: 'sports', building_id: 'bldg-ground', floor_id: null, location_desc: 'East Campus Ground', icon: '?', description: 'Large sporting field for cricket, football, volleyball, and athletics championships.' },
    { id: 'fac-cricket', name: 'Cricket Practice Nets', category: 'sports', building_id: 'bldg-ground', floor_id: null, location_desc: 'South side of Play Ground', icon: '??', description: 'Turf and concrete net pitches for team practice.' },
    { id: 'fac-gym', name: 'Open Gymnasium', category: 'sports', building_id: 'bldg-gym', floor_id: null, location_desc: 'South Boundary, near Staff Quarters', icon: '???', description: 'Outdoor calisthenics and fitness workout stations.' },
    { id: 'fac-busbay', name: 'College Bus Terminal', category: 'transport', building_id: 'bldg-busbay', floor_id: null, location_desc: 'North-East Corner', icon: '??', description: 'Boarding bays for transit coaches serving Vijayawada, Guntur, and rural routes.' },
    { id: 'fac-parking1', name: 'Vehicle Parking Zone 1', category: 'parking', building_id: 'bldg-parking1', floor_id: null, location_desc: 'West of Central Driveway', icon: '???', description: 'Covered two-wheeler parking for faculty and students.' },
    { id: 'fac-parking2', name: 'Vehicle Parking Zone 2', category: 'parking', building_id: 'bldg-parking2', floor_id: null, location_desc: 'East Perimeter Roadway', icon: '??', description: 'Designated parking for cars, visitors, and four-wheelers.' },
    { id: 'fac-gate', name: 'Main Gate & Security Kiosk', category: 'transport', building_id: 'bldg-gate', floor_id: null, location_desc: 'South-East Campus Entrance on NH-65', icon: '???', description: 'The SOLE official entry/exit gate for DVR & Dr. HS MIC College of Technology with 24/7 security.' }
  ],

  // Precise Navigation Graph Nodes mapped exactly to the road network (blue lines) on the College Plan
  nodes: [
    // 1. Primary & SOLE Campus Entrance from Outside
    { id: 'node-gate', label: 'Main Gate Entrance (Only Campus Entry)', building_id: 'bldg-gate', floor_id: null, x: 885, y: 660, type: 'outdoor', qr_code: 'MICLOC-GATE' },

    // East Perimeter Road (Blue road running North from Main Gate)
    { id: 'node-east-road-south', label: 'East Avenue (South Edge)', building_id: null, floor_id: null, x: 885, y: 550, type: 'path', qr_code: null },
    { id: 'node-east-internal-road', label: 'Play Ground South Road Junction', building_id: null, floor_id: null, x: 700, y: 550, type: 'junction', qr_code: null },
    { id: 'node-east-road-mid', label: 'East Avenue (Playground Corner Junction)', building_id: null, floor_id: null, x: 885, y: 340, type: 'path', qr_code: null },
    { id: 'node-east-road-north', label: 'East Avenue (Parking 2)', building_id: 'bldg-parking2', floor_id: null, x: 885, y: 140, type: 'path', qr_code: 'MICLOC-PARK-2' },
    { id: 'node-east-road-top', label: 'North-East Road Corner', building_id: null, floor_id: null, x: 885, y: 110, type: 'path', qr_code: null },

    // North Road (Blue line running West from East Road across Bus Bay and Cafeteria)
    { id: 'node-busbay', label: 'Bus Bay & Transport Hub', building_id: 'bldg-busbay', floor_id: null, x: 740, y: 110, type: 'outdoor', qr_code: 'MICLOC-BUSBAY' },
    { id: 'node-cafe', label: 'Cafeteria Junction', building_id: 'bldg-cafe', floor_id: null, x: 570, y: 110, type: 'outdoor', qr_code: 'MICLOC-CAFE' },
    { id: 'node-parking1-top', label: 'Parking-1 North Junction', building_id: 'bldg-parking1', floor_id: null, x: 525, y: 110, type: 'path', qr_code: null },
    { id: 'node-north-road-mid', label: 'North Road Central Link', building_id: null, floor_id: null, x: 380, y: 110, type: 'path', qr_code: null },
    { id: 'node-north-road-west', label: 'North-West Road Corner', building_id: null, floor_id: null, x: 260, y: 110, type: 'path', qr_code: null },
    { id: 'node-gh', label: 'Girls Hostel & Dining Hall Gate', building_id: 'bldg-gh', floor_id: null, x: 150, y: 160, type: 'entrance', qr_code: 'MICLOC-HOSTEL-G' },

    // Central Boulevard Road (Blue line from East Road past Playground to Main Academic Block)
    { id: 'node-central-road-mid', label: 'Central Boulevard (Playground North)', building_id: null, floor_id: null, x: 680, y: 340, type: 'path', qr_code: null },
    { id: 'node-main-junction', label: 'Central Driveway Junction', building_id: null, floor_id: null, x: 525, y: 340, type: 'junction', qr_code: null },
    { id: 'node-main-playground-road', label: 'Road Between Main Block & Play Ground', building_id: null, floor_id: null, x: 505, y: 450, type: 'path', qr_code: null },
    { id: 'node-main-playground-road-bottom', label: 'Main Block & Play Ground Road South Junction', building_id: null, floor_id: null, x: 505, y: 640, type: 'junction', qr_code: null },
    { id: 'node-macb-entrance', label: 'Main Academic Block Grand Porch', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', x: 450, y: 340, type: 'entrance', qr_code: 'MICLOC-MACB-GF' },
    { id: 'node-parking1-mid', label: 'Vehicle Parking-1 Point', building_id: 'bldg-parking1', floor_id: null, x: 525, y: 220, type: 'outdoor', qr_code: 'MICLOC-PARK-1' },
    { id: 'node-ground', label: 'Play Ground Entry', building_id: 'bldg-ground', floor_id: null, x: 550, y: 380, type: 'outdoor', qr_code: 'MICLOC-GROUND' },

    // Internal Road Below Play Ground
    { id: 'node-south-road-east', label: 'Internal Road (Play Ground South)', building_id: null, floor_id: null, x: 700, y: 640, type: 'path', qr_code: null },
    { id: 'node-cricket-road', label: 'Internal Road (Cricket Nets Area)', building_id: 'bldg-ground', floor_id: null, x: 600, y: 640, type: 'path', qr_code: 'MICLOC-CRICKET' },
    { id: 'node-south-road-bh', label: 'Internal Road (Boys Hostel Junction)', building_id: null, floor_id: null, x: 420, y: 640, type: 'junction', qr_code: null },
    { id: 'node-bh', label: 'Boys Hostel Entrance', building_id: 'bldg-bh', floor_id: null, x: 420, y: 630, type: 'entrance', qr_code: 'MICLOC-HOSTEL-B' },
    { id: 'node-south-road-gym', label: 'Internal Road (Open Gym Junction)', building_id: null, floor_id: null, x: 310, y: 640, type: 'path', qr_code: null },
    { id: 'node-gym', label: 'Open Gym & Staff Quarters', building_id: 'bldg-gym', floor_id: null, x: 310, y: 630, type: 'entrance', qr_code: 'MICLOC-GYM' },
    { id: 'node-west-road-south', label: 'South-West Main Road Junction', building_id: null, floor_id: null, x: 260, y: 640, type: 'junction', qr_code: null },
    { id: 'node-canteen-road', label: 'Internal Road (Canteen Junction)', building_id: null, floor_id: null, x: 150, y: 640, type: 'path', qr_code: null },
    { id: 'node-canteen', label: 'Campus Canteen Entrance', building_id: 'bldg-canteen', floor_id: null, x: 112, y: 630, type: 'entrance', qr_code: 'MICLOC-CANTEEN' },
    { id: 'node-auditorium', label: 'College Auditorium Entrance', building_id: 'bldg-auditorium', floor_id: null, x: 208, y: 630, type: 'entrance', qr_code: 'MICLOC-AUDITORIUM' },
    // West Road (Blue line running North from South-West Junction between Labs/BED and Diploma Blocks)
    { id: 'node-west-road-labs', label: 'West Roadway (Labs Branch Junction)', building_id: null, floor_id: null, x: 260, y: 500, type: 'junction', qr_code: null },
    { id: 'node-labs', label: 'Mechanical & Civil Labs Entrance', building_id: 'bldg-labs', floor_id: null, x: 150, y: 500, type: 'entrance', qr_code: 'MICLOC-LABS' },

    { id: 'node-west-road-bed', label: 'West Roadway (BED & Diploma Junction)', building_id: null, floor_id: null, x: 260, y: 370, type: 'junction', qr_code: null },
    { id: 'node-bed', label: 'BED Block Main Entrance', building_id: 'bldg-bed', floor_id: 'floor-bed-gf', x: 150, y: 370, type: 'entrance', qr_code: 'MICLOC-BED' },
    { id: 'node-dip-conn', label: 'Diploma Block-1 Entrance', building_id: 'bldg-dip1', floor_id: 'floor-dip1-gf', x: 300, y: 275, type: 'entrance', qr_code: 'MICLOC-DIP1' },
    { id: 'node-west-road-dip2', label: 'West Roadway (Diploma-2 Junction)', building_id: null, floor_id: null, x: 260, y: 220, type: 'path', qr_code: null },
    { id: 'node-dip2-entrance', label: 'Diploma Block-2 Main Entrance', building_id: 'bldg-dip2', floor_id: 'floor-dip2-gf', x: 300, y: 395, type: 'entrance', qr_code: 'MICLOC-DIP2' },
    { id: 'node-diploma-middle-road', label: 'Internal Road Between Diploma Blocks', building_id: null, floor_id: null, x: 330, y: 315, type: 'path', qr_code: null },
    { id: 'node-diploma-east-road', label: 'East Road Junction Between Diploma Blocks and Parking', building_id: null, floor_id: null, x: 420, y: 220, type: 'path', qr_code: null },

    // Inside Main Academic Block - Ground Floor Nodes
    { id: 'node-macb-west-conn', label: 'Main Block West Entrance (Diploma Connector)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', x: 380, y: 370, type: 'indoor', qr_code: 'MICLOC-MACB-WEST' },
    { id: 'node-macb-foyer-gf', label: 'Main Block GF Central Foyer', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', x: 420, y: 340, type: 'indoor', qr_code: 'MICLOC-MACB-FOYER' },
    { id: 'node-stair-gf', label: 'Main Block Central Staircase & Lift (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', x: 400, y: 340, type: 'vertical', qr_code: 'MICLOC-STAIR-GF' },
    { id: 'node-cse-gf', label: 'Dept of CSE (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', x: 420, y: 380, type: 'indoor', qr_code: 'MICLOC-CSE-GF' },
    { id: 'node-mech-gf', label: 'Dept of Mechanical Engg (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', x: 420, y: 440, type: 'indoor', qr_code: 'MICLOC-MECH-GF' },
    { id: 'node-it-gf', label: 'Dept of IT (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', x: 420, y: 280, type: 'indoor', qr_code: 'MICLOC-IT-GF' },
    { id: 'node-mca-gf', label: 'Dept of Computer Applications (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', x: 420, y: 220, type: 'indoor', qr_code: 'MICLOC-MCA-GF' },
    { id: 'node-pe-gf', label: 'Physical Education Dept (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', x: 420, y: 500, type: 'indoor', qr_code: 'MICLOC-PE-GF' },

    // Inside Main Academic Block - First Floor Nodes
    { id: 'node-stair-ff', label: 'Main Block Central Staircase & Lift (First Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', x: 400, y: 340, type: 'vertical', qr_code: 'MICLOC-STAIR-FF' },
    { id: 'node-macb-foyer-ff', label: 'Main Block 1st Floor Central Foyer', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', x: 420, y: 340, type: 'indoor', qr_code: 'MICLOC-MACB-FF' },
    { id: 'node-admin-ff', label: 'Administrative Office & Principal Room (1st Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', x: 420, y: 300, type: 'indoor', qr_code: 'MICLOC-ADMIN-FF' },
    { id: 'node-eee-ff', label: 'Dept of EEE (1st Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', x: 420, y: 390, type: 'indoor', qr_code: 'MICLOC-EEE-FF' },
    { id: 'node-ai-ff', label: 'Dept of AI (1st Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', x: 420, y: 440, type: 'indoor', qr_code: 'MICLOC-AI-FF' },
    { id: 'node-exam-ff', label: 'Examination Section (1st Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', x: 420, y: 240, type: 'indoor', qr_code: 'MICLOC-EXAM-FF' },
    { id: 'node-tnp-ff', label: 'T & P Cell (1st Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', x: 420, y: 200, type: 'indoor', qr_code: 'MICLOC-TNP-FF' },

    // Inside Main Academic Block - Second Floor & Central Library Nodes
    { id: 'node-stair-sf', label: 'Main Block Central Staircase & Lift (Second Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', x: 400, y: 340, type: 'vertical', qr_code: 'MICLOC-STAIR-SF' },
    { id: 'node-macb-foyer-sf', label: 'Main Block 2nd Floor Central Foyer', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', x: 420, y: 340, type: 'indoor', qr_code: 'MICLOC-MACB-SF' },
    { id: 'node-ece-sf', label: 'Dept of ECE (2nd Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', x: 420, y: 390, type: 'indoor', qr_code: 'MICLOC-ECE-SF' },
    { id: 'node-civil-sf', label: 'Dept of Civil Engg (2nd Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', x: 420, y: 260, type: 'indoor', qr_code: 'MICLOC-CIVIL-SF' },
    { id: 'node-lib-sf', label: 'Central Library (Reference & Digital Gallery)', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', x: 400, y: 150, type: 'indoor', qr_code: 'MICLOC-LIB-FF' }
  ],

  // Graph Edges - STRICTLY aligned with the blue road lines on the College Plan map.
  // No diagonal cutting across buildings or open gym!
  edges: [
    // 1. Sole Entry Route: Main Gate -> East Perimeter Road
    { from: 'node-gate', to: 'node-east-road-south', distance: 110, hint: 'From Main Gate, follow the eastern road north.' },
    { from: 'node-east-road-south', to: 'node-east-road-mid', distance: 210, hint: 'Continue straight north along the east road past the playground.' },
    { from: 'node-east-road-mid', to: 'node-east-road-north', distance: 200, hint: 'Proceed north along the east road towards Parking-2.' },
    { from: 'node-east-road-north', to: 'node-east-road-top', distance: 30, hint: 'Reach the North-East road corner.' },

    // North Roadway (Along top edge)
    { from: 'node-east-road-top', to: 'node-busbay', distance: 145, hint: 'Turn left along the northern road to Bus Bay.' },
    { from: 'node-busbay', to: 'node-cafe', distance: 170, hint: 'Continue west past Cafeteria.' },
    { from: 'node-cafe', to: 'node-parking1-top', distance: 45, hint: 'Pass Parking-1 north entrance.' },
    { from: 'node-parking1-top', to: 'node-north-road-mid', distance: 145, hint: 'Continue along northern road behind Central Library.' },
    { from: 'node-north-road-mid', to: 'node-north-road-west', distance: 120, hint: 'Reach the North-West road corner.' },
    { from: 'node-north-road-west', to: 'node-gh', distance: 120, hint: 'Enter Girls Hostel compound.' },

    // Central Boulevard Road (From East Road directly West to Main Academic Block Porch)
    { from: 'node-east-road-mid', to: 'node-central-road-mid', distance: 205, hint: 'Turn west onto the central boulevard.' },
    { from: 'node-central-road-mid', to: 'node-main-junction', distance: 155, hint: 'Continue west along the central avenue.' },
    { from: 'node-main-junction', to: 'node-macb-entrance', distance: 75, hint: 'Walk straight up to the Grand Porch of Main Academic Block.' },
    { from: 'node-main-junction', to: 'node-west-road-bed', distance: 270, hint: 'Turn left onto the outdoor west road towards the BED Block.' },
    { from: 'node-west-road-bed', to: 'node-main-junction', distance: 270, hint: 'Follow the outdoor west road back towards the central junction.' },
    { from: 'node-main-junction', to: 'node-main-playground-road', distance: 110, hint: 'Turn onto the road between Main Academic Block and Play Ground.' },
    { from: 'node-main-playground-road', to: 'node-main-junction', distance: 110, hint: 'Return along the road between Main Academic Block and Play Ground.' },
    { from: 'node-main-playground-road', to: 'node-main-playground-road-bottom', distance: 190, hint: 'Continue south along the road between Main Academic Block and Play Ground.' },
    { from: 'node-main-playground-road-bottom', to: 'node-main-playground-road', distance: 190, hint: 'Continue north along the road between Main Academic Block and Play Ground.' },
    { from: 'node-main-playground-road-bottom', to: 'node-south-road-bh', distance: 85, hint: 'Turn left towards the Boys Hostel junction.' },
    { from: 'node-south-road-bh', to: 'node-main-playground-road-bottom', distance: 85, hint: 'Return towards the road between Main Block and Play Ground.' },
    { from: 'node-macb-entrance', to: 'node-west-road-bed', distance: 190, hint: 'Turn left from Main Academic Block onto the west internal road.' },
    { from: 'node-west-road-bed', to: 'node-macb-entrance', distance: 190, hint: 'Follow the west internal road back towards Main Academic Block.' },
    { from: 'node-main-junction', to: 'node-ground', distance: 40, hint: 'Turn south into Play Ground entrance.' },

    // Parking-1 North-South Road
    { from: 'node-main-junction', to: 'node-parking1-mid', distance: 80, hint: 'Turn north onto the outdoor road beside Parking-1.' },
    { from: 'node-parking1-mid', to: 'node-parking1-top', distance: 110, hint: 'Continue north to Cafeteria junction.' },

    // South Roadway (From Main Gate along bottom edge: Gate -> Cricket -> Boys Hostel -> Open Gym -> SW Corner -> Canteen)
    { from: 'node-south-road-east', to: 'node-cricket-road', distance: 100, hint: 'Follow the south road past Cricket Nets.' },
    { from: 'node-cricket-road', to: 'node-south-road-bh', distance: 180, hint: 'Continue west along the south road to Boys Hostel junction.' },
    { from: 'node-south-road-bh', to: 'node-bh', distance: 30, hint: 'Turn north to enter Boys Hostel entrance.' },
    { from: 'node-south-road-bh', to: 'node-south-road-gym', distance: 110, hint: 'Continue west along the paved south road past Staff Quarters & Open Gym.' },
    { from: 'node-south-road-gym', to: 'node-gym', distance: 30, hint: 'Turn into Open Gym.' },
    { from: 'node-south-road-gym', to: 'node-west-road-south', distance: 50, hint: 'Proceed to the South-West road corner.' },
    { from: 'node-west-road-south', to: 'node-canteen-road', distance: 110, hint: 'Continue west along south road to the Canteen & Auditorium junction.' },
    { from: 'node-canteen-road', to: 'node-canteen', distance: 40, hint: 'Turn left into Campus Canteen.' },
    { from: 'node-canteen-road', to: 'node-auditorium', distance: 40, hint: 'Turn right into College Auditorium.' },

    // West Roadway (From South-West Corner Northwards: SW Corner -> Labs -> BED & Diploma -> Diploma 2 -> NW Corner)
    { from: 'node-west-road-south', to: 'node-west-road-labs', distance: 160, hint: 'Follow the west road north towards Labs.' },
    { from: 'node-west-road-labs', to: 'node-labs', distance: 110, hint: 'Turn west into Mechanical & Civil Labs complex.' },
    { from: 'node-west-road-labs', to: 'node-west-road-bed', distance: 130, hint: 'Continue north along west road to BED Block junction.' },
    { from: 'node-west-road-bed', to: 'node-bed', distance: 110, hint: 'Turn west into BED Block entrance.' },
    { from: 'node-west-road-bed', to: 'node-diploma-middle-road', distance: 100, hint: 'Enter the internal road between Diploma Block-1 and Diploma Block-2.' },
    { from: 'node-diploma-middle-road', to: 'node-west-road-bed', distance: 100, hint: 'Return to the BED and Diploma junction.' },
    { from: 'node-diploma-middle-road', to: 'node-west-road-dip2', distance: 110, hint: 'Continue along the internal road between the two Diploma Blocks.' },
    { from: 'node-diploma-middle-road', to: 'node-diploma-east-road', distance: 120, hint: 'Continue east along the internal road between Diploma Block-1 and Diploma Block-2.' },
    { from: 'node-diploma-east-road', to: 'node-diploma-middle-road', distance: 120, hint: 'Return west along the internal Diploma road.' },
    { from: 'node-diploma-east-road', to: 'node-parking1-mid', distance: 110, hint: 'Continue east towards Parking-1 road.' },
    { from: 'node-parking1-mid', to: 'node-diploma-east-road', distance: 110, hint: 'Continue west towards the Diploma Blocks.' },
    { from: 'node-west-road-dip2', to: 'node-diploma-middle-road', distance: 110, hint: 'Continue south along the road between the Diploma Blocks.' },
    { from: 'node-diploma-middle-road', to: 'node-dip2-entrance', distance: 85, hint: 'Turn into Diploma Block-2 entrance.' },
    { from: 'node-dip2-entrance', to: 'node-diploma-middle-road', distance: 85, hint: 'Return to the road from Diploma Block-2.' },
    { from: 'node-diploma-middle-road', to: 'node-dip-conn', distance: 70, hint: 'Turn into the Diploma Blocks entrance.' },
    { from: 'node-dip-conn', to: 'node-diploma-middle-road', distance: 70, hint: 'Return to the road between the Diploma Blocks.' },
    { from: 'node-diploma-middle-road', to: 'node-macb-west-conn', distance: 70, hint: 'Continue east between the Diploma Blocks towards Main Academic Block.' },
    { from: 'node-macb-west-conn', to: 'node-diploma-middle-road', distance: 70, hint: 'Continue west along the internal Diploma road.' },
    { from: 'node-west-road-dip2', to: 'node-north-road-west', distance: 110, hint: 'Continue north towards the North-West road corner.' },

    // *** EXACT SPECIFIED ROUTE: BED Block -> Diploma Blocks -> Main Academic Block -> First Floor -> Second Floor -> Central Library ***
    { from: 'node-dip-conn', to: 'node-macb-west-conn', distance: 100, hint: 'Walk from Diploma Blocks across to Main Academic Block West wing entrance.' },
    { from: 'node-macb-west-conn', to: 'node-stair-gf', distance: 30, hint: 'Enter Main Academic Block to the central staircase and lift core.' },
    { from: 'node-stair-gf', to: 'node-stair-ff', distance: 25, hint: 'Take the central staircase or elevator to the First Floor.' },
    { from: 'node-stair-ff', to: 'node-stair-sf', distance: 25, hint: 'Take the central staircase or elevator to the Second Floor.' },
    { from: 'node-stair-sf', to: 'node-lib-sf', distance: 60, hint: 'Walk north along the Second Floor corridor to enter Central Library.' },

    // Inside Main Academic Block Ground Floor
    { from: 'node-macb-entrance', to: 'node-macb-foyer-gf', distance: 30, hint: 'Enter Main Academic Block Ground Floor Foyer.' },
    { from: 'node-macb-foyer-gf', to: 'node-stair-gf', distance: 20, hint: 'Walk to central staircase & lift core.' },
    { from: 'node-macb-foyer-gf', to: 'node-cse-gf', distance: 40, hint: 'Walk south to Department of CSE.' },
    { from: 'node-cse-gf', to: 'node-mech-gf', distance: 60, hint: 'Walk south to Department of Mechanical Engineering.' },
    { from: 'node-mech-gf', to: 'node-pe-gf', distance: 60, hint: 'Walk south to Physical Education Department.' },
    { from: 'node-macb-foyer-gf', to: 'node-it-gf', distance: 60, hint: 'Walk north to Department of IT.' },
    { from: 'node-it-gf', to: 'node-mca-gf', distance: 60, hint: 'Continue north to Department of Computer Applications (MCA).' },

    // Inside First Floor Connections
    { from: 'node-stair-ff', to: 'node-macb-foyer-ff', distance: 20, hint: 'Step out into 1st Floor Central Foyer.' },
    { from: 'node-macb-foyer-ff', to: 'node-admin-ff', distance: 40, hint: 'Walk north to Administrative Office & Principal Room.' },
    { from: 'node-admin-ff', to: 'node-exam-ff', distance: 60, hint: 'Proceed north to Examination Section.' },
    { from: 'node-exam-ff', to: 'node-tnp-ff', distance: 40, hint: 'Continue north to Training & Placement Cell.' },
    { from: 'node-macb-foyer-ff', to: 'node-eee-ff', distance: 50, hint: 'Walk south to Department of EEE.' },
    { from: 'node-eee-ff', to: 'node-ai-ff', distance: 50, hint: 'Proceed south to Department of AI.' },

    // Inside Second Floor Connections
    { from: 'node-stair-sf', to: 'node-macb-foyer-sf', distance: 20, hint: 'Step out into 2nd Floor Central Foyer.' },
    { from: 'node-macb-foyer-sf', to: 'node-ece-sf', distance: 50, hint: 'Walk south to Department of ECE.' },
    { from: 'node-macb-foyer-sf', to: 'node-civil-sf', distance: 80, hint: 'Walk north to Department of Civil Engineering.' }
  ],

  qrLocations: [
    { qr_code: 'MICLOC-GATE', location_name: 'Main Gate Entrance (Only Campus Entry)', building_id: 'bldg-gate', floor_id: null, node_id: 'node-gate', description: 'Campus Main Entrance Security Checkpost on NH-65.' },
    { qr_code: 'MICLOC-MACB-GF', location_name: 'Main Academic Block - Ground Floor Porch', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', node_id: 'node-macb-entrance', description: 'Central Grand Entrance Porch of Main Academic Block.' },
    { qr_code: 'MICLOC-MACB-FOYER', location_name: 'Main Academic Block - GF Central Foyer', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', node_id: 'node-macb-foyer-gf', description: 'Ground floor main reception hall and central notice board.' },
    { qr_code: 'MICLOC-CSE-GF', location_name: 'Department of CSE (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', node_id: 'node-cse-gf', description: 'CSE Department Foyer, HOD Cabin, and Faculty Offices.' },
    { qr_code: 'MICLOC-MECH-GF', location_name: 'Department of Mechanical Engg (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', node_id: 'node-mech-gf', description: 'Mechanical Engineering Department Corridor.' },
    { qr_code: 'MICLOC-IT-GF', location_name: 'Department of IT (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', node_id: 'node-it-gf', description: 'Information Technology Department Entrance.' },
    { qr_code: 'MICLOC-MCA-GF', location_name: 'Department of Computer Applications (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', node_id: 'node-mca-gf', description: 'MCA Department wing and seminar hall entrance.' },
    { qr_code: 'MICLOC-PE-GF', location_name: 'Physical Education Dept (Ground Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-gf', node_id: 'node-pe-gf', description: 'Physical Director Office and sports coordination desk.' },
    { qr_code: 'MICLOC-MACB-FF', location_name: 'Main Academic Block - 1st Floor Central Foyer', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', node_id: 'node-macb-foyer-ff', description: 'First floor foyer adjacent to Central Staircase and Lift.' },
    { qr_code: 'MICLOC-ADMIN-FF', location_name: 'Administrative Office & Principal Secretariat', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', node_id: 'node-admin-ff', description: '1st Floor Administrative Directorate and Board Room.' },
    { qr_code: 'MICLOC-LIB-FF', location_name: 'Central Library (1st & 2nd Floor North Wing)', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', node_id: 'node-lib-sf', description: 'Central Library Reference and Digital Learning Arena.' },
    { qr_code: 'MICLOC-EEE-FF', location_name: 'Department of EEE (1st Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', node_id: 'node-eee-ff', description: 'EEE Department Corridor and Simulation Lab.' },
    { qr_code: 'MICLOC-AI-FF', location_name: 'Department of AI (1st Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', node_id: 'node-ai-ff', description: 'Department of Artificial Intelligence & Data Science.' },
    { qr_code: 'MICLOC-EXAM-FF', location_name: 'Autonomous Examination Section', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', node_id: 'node-exam-ff', description: '1st Floor Examination and Evaluation Branch.' },
    { qr_code: 'MICLOC-TNP-FF', location_name: 'Training & Placement Cell (T & P Cell)', building_id: 'bldg-macb', floor_id: 'floor-macb-ff', node_id: 'node-tnp-ff', description: 'Placement Directorate, interview suites, and seminar arena.' },
    { qr_code: 'MICLOC-MACB-SF', location_name: 'Main Academic Block - 2nd Floor Foyer', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', node_id: 'node-macb-foyer-sf', description: '2nd Floor Foyer connecting ECE, Civil, and Central Library.' },
    { qr_code: 'MICLOC-ECE-SF', location_name: 'Department of ECE (2nd Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', node_id: 'node-ece-sf', description: 'ECE Department Corridor, VLSI Labs, and Faculty suites.' },
    { qr_code: 'MICLOC-CIVIL-SF', location_name: 'Department of Civil Engineering (2nd Floor)', building_id: 'bldg-macb', floor_id: 'floor-macb-sf', node_id: 'node-civil-sf', description: 'Civil Engineering Department wing and design studios.' },
    { qr_code: 'MICLOC-BED', location_name: 'BED Block Main Entrance', building_id: 'bldg-bed', floor_id: 'floor-bed-gf', node_id: 'node-bed', description: 'Faculty of Education 3-storey building porch.' },
    { qr_code: 'MICLOC-DIP1', location_name: 'Diploma Block-1 & 2', building_id: 'bldg-dip1', floor_id: 'floor-dip1-gf', node_id: 'node-dip-conn', description: 'Polytechnic Engineering Academic Block entrance.' },
    { qr_code: 'MICLOC-LABS', location_name: 'Mechanical & Civil Engineering Labs', building_id: 'bldg-labs', floor_id: null, node_id: 'node-labs', description: 'Heavy Engineering Labs, Workshops, and Material Testing complex.' },
    { qr_code: 'MICLOC-CANTEEN', location_name: 'Campus Canteen', building_id: 'bldg-canteen', floor_id: null, node_id: 'node-canteen', description: 'Main Student Canteen entrance.' },
    { qr_code: 'MICLOC-AUDITORIUM', location_name: 'College Auditorium', building_id: 'bldg-auditorium', floor_id: null, node_id: 'node-auditorium', description: 'College Auditorium entrance.' },
    { qr_code: 'MICLOC-HOSTEL-B', location_name: 'Boys Hostel Entrance', building_id: 'bldg-bh', floor_id: null, node_id: 'node-bh', description: 'Boys residential hostel check-in security counter.' },
    { qr_code: 'MICLOC-HOSTEL-G', location_name: 'Girls Hostel & Dining Hall', building_id: 'bldg-gh', floor_id: null, node_id: 'node-gh', description: 'Girls residential complex and dining facilities.' },
    { qr_code: 'MICLOC-CAFE', location_name: 'Campus Cafeteria & Kiosk', building_id: 'bldg-cafe', floor_id: null, node_id: 'node-cafe', description: 'Refreshment point near the Bus Bay terminal.' },
    { qr_code: 'MICLOC-BUSBAY', location_name: 'Bus Bay & Transport Depot', building_id: 'bldg-busbay', floor_id: null, node_id: 'node-busbay', description: 'Transit hub for MIC fleet of college buses.' },
    { qr_code: 'MICLOC-PARK-1', location_name: 'Vehicle Parking-1 Area', building_id: 'bldg-parking1', floor_id: null, node_id: 'node-parking1-mid', description: 'Faculty & Student two-wheeler parking shed.' },
    { qr_code: 'MICLOC-GROUND', location_name: 'Play Ground & Sports Arena', building_id: 'bldg-ground', floor_id: null, node_id: 'node-ground', description: 'College athletic sports ground and cricket pavilion.' }
  ],

  announcements: [
    { id: 'ann-1', title: 'B.Tech Autonomous End Semester Examinations Schedule Released', category: 'Examinations', date: '2026-08-28', content: 'The time table for B.Tech II, IV, VI & VIII Semester Regular & Supplementary Examinations has been published by the Autonomous Examination Section.', priority: 'high' },
    { id: 'ann-2', title: 'Annual Mega Campus Placement Drive 2026', category: 'Placements', date: '2026-08-25', content: 'T & P Cell announces the upcoming on-campus recruitment drive for Top Tier IT and Core Engineering MNCs in the Auditorium and T&P Interview Suites.', priority: 'high' },
    { id: 'ann-3', title: 'National Level Technical Symposium - AVISKAR 2026', category: 'Events', date: '2026-08-20', content: 'Paper presentations, code hacks, robotics challenges, and CAD design competitions hosted across CSE, ECE, EEE, and Mechanical departments.', priority: 'medium' },
    { id: 'ann-4', title: 'Central Library Extended Digital Reading Hours', category: 'Library', date: '2026-08-15', content: 'The Central Library Digital Learning Centre on the 1st and 2nd Floors will remain open until 8:00 PM on all working days with high-speed IEEE access.', priority: 'low' }
  ],

  contacts: [
    { id: 'cont-1', department: 'Principal Secretariat', role: 'Principal', name: 'Dr. Principal, Ph.D', phone: '+91 8678 273535', email: 'principal@mictech.ac.in', location: 'Main Academic Block, 1st Floor, Room 1101' },
    { id: 'cont-2', department: 'Autonomous Examination Section', role: 'Controller of Examinations (COE)', name: 'Dr. Exam Controller', phone: '+91 8678 273536', email: 'coe@mictech.ac.in', location: 'Main Academic Block, 1st Floor, Room 1106' },
    { id: 'cont-3', department: 'Training & Placement Cell', role: 'Head - Placements & Corporate Relations', name: 'Prof. T&P Officer', phone: '+91 8678 273537', email: 'placements@mictech.ac.in', location: 'Main Academic Block, 1st Floor, Room 1107' },
    { id: 'cont-4', department: 'Administrative Office', role: 'Administrative Officer', name: 'Admin Desk', phone: '+91 8678 273538', email: 'office@mictech.ac.in', location: 'Main Academic Block, 1st Floor, Room 1102' },
    { id: 'cont-5', department: 'Campus Security & Main Gate Control Room', role: 'Chief Security Officer', name: 'Security Control Room', phone: '+91 8678 273599', email: 'security@mictech.ac.in', location: 'Main Gate Entrance Kiosk (24/7 Security Desk)' },
    { id: 'cont-6', department: 'Central Library', role: 'Chief Librarian', name: 'Library In-charge', phone: '+91 8678 273540', email: 'library@mictech.ac.in', location: 'Main Academic Block, 1st & 2nd Floor North Wing' },
    { id: 'cont-7', department: 'Department of Computer Science & Engineering', role: 'HOD, CSE', name: 'Dr. HOD CSE', phone: '+91 8678 273541', email: 'hod_cse@mictech.ac.in', location: 'Main Academic Block, Ground Floor, Room 1001' },
    { id: 'cont-8', department: 'Department of Electronics & Communication Engg', role: 'HOD, ECE', name: 'Dr. HOD ECE', phone: '+91 8678 273542', email: 'hod_ece@mictech.ac.in', location: 'Main Academic Block, 2nd Floor, Room 1201' },
    { id: 'cont-9', department: 'Department of Electrical & Electronics Engg', role: 'HOD, EEE', name: 'Dr. HOD EEE', phone: '+91 8678 273543', email: 'hod_eee@mictech.ac.in', location: 'Main Academic Block, 1st Floor, Room 1103' },
    { id: 'cont-10', department: 'Department of Mechanical Engineering', role: 'HOD, Mechanical', name: 'Dr. HOD Mech', phone: '+91 8678 273544', email: 'hod_mech@mictech.ac.in', location: 'Main Academic Block, Ground Floor, Room 1004' },
    { id: 'cont-11', department: 'Department of Civil Engineering', role: 'HOD, Civil', name: 'Dr. HOD Civil', phone: '+91 8678 273545', email: 'hod_civil@mictech.ac.in', location: 'Main Academic Block, 2nd Floor, Room 1203' },
    { id: 'cont-12', department: 'Anti-Ragging Helpline & Grievance Cell', role: 'Anti-Ragging Squad Convenor', name: 'Grievance Committee', phone: '+91 8678 273500', email: 'antiragging@mictech.ac.in', location: 'Administrative Wing, Room 1102' }
  ]
};

// ============================================================
// EXCEL ROOM DATA SYNC
// Source: MIC_Campus_Rooms_Final_Cleaned.xlsx
// ============================================================

const XLSX = require('xlsx');
const path = require('path');

const excelPath = path.join(
  __dirname,
  '..',
  'data',
  'MIC_Campus_Rooms_Final_Cleaned.xlsx'
);

try {
  const workbook = XLSX.readFile(excelPath);

  // ----------------------------------------------------------
  // ROOMS
  // ----------------------------------------------------------
  const roomSheet = workbook.Sheets['Rooms'];

  if (roomSheet) {
    const excelRooms = XLSX.utils.sheet_to_json(roomSheet, {
      defval: ''
    });

    const departmentMap = {
      'CSE': 'dept-cse',
      'MECH': 'dept-mech',
      'IT': 'dept-it',
      'MCA': 'dept-mca',
      'PE': 'dept-pe',
      'EEE': 'dept-eee',
      'AI': 'dept-ai',
      'ECE': 'dept-ece',
      'Civil': 'dept-civil',
      'CIVIL': 'dept-civil',
      'Common': null,
      '---': null,
      'BTech': null,
      'DIPLOMA': null,
      'Main Block': null,
      'Mechanical Lab': null
    };

    seedData.rooms = excelRooms.map((r) => {
      const roomNo = String(r.room_no || '').trim();
      const roomName = String(r.room_name || '').trim();
      const buildingName = String(r.building_name || '').trim();
      const floorName = String(r.floor || '').trim();
      const departmentName = String(r.department || '').trim();

      // Building mapping
      const buildingMap = {
        'Main & Administrative Block': 'bldg-macb',
        'Diploma Block-1': 'bldg-dip1',
        'Diploma Block-2': 'bldg-dip2',
        'BED Block': 'bldg-bed',
'Labs & Workshops': 'bldg-labs',
        'Mechanical & Civil Engineering Labs': 'bldg-labs'
      };

      const buildingId = buildingMap[buildingName] || null;

      // Floor mapping
      let floorId = null;

      if (buildingId === 'bldg-macb') {
        if (floorName === 'Ground Floor') floorId = 'floor-macb-gf';
        else if (floorName === 'First Floor') floorId = 'floor-macb-ff';
        else if (floorName === 'Second Floor') floorId = 'floor-macb-sf';
      }

      if (buildingId === 'bldg-bed') {
        if (floorName === 'Ground Floor') floorId = 'floor-bed-gf';
        else if (floorName === 'First Floor') floorId = 'floor-bed-ff';
        else if (floorName === 'Second Floor') floorId = 'floor-bed-sf';
        else if (floorName === 'Third Floor') floorId = 'floor-bed-tf';
      }

      if (buildingId === 'bldg-dip1') {
        floorId = 'floor-dip1-gf';
      }

      if (buildingId === 'bldg-dip2') {
        floorId = 'floor-dip2-gf';
      }

      if (buildingId === 'bldg-labs') {
        floorId = 'floor-labs-gf';
      }

      return {
        id: String(r.id).trim(),
        room_number: roomNo,
        name: roomName,
        building_id: buildingId,
        floor_id: floorId,
        department_id:
          departmentMap[departmentName] || null,
        type:
          /wash room/i.test(roomName) ? 'Wash Room' :
            /lab/i.test(roomName) ? 'Lab' :
              /office|cell|dept/i.test(roomName) ? 'Office' :
                /classroom|lecture room/i.test(roomName) ? 'Classroom' :
                  'Room',
        description: `${roomName} (${roomNo})`
      };
    });

    console.log(
      `[Excel Sync] Rooms loaded: ${seedData.rooms.length}`
    );
  }

  // ----------------------------------------------------------
  // BUILDINGS
  // ----------------------------------------------------------
  const buildingSheet = workbook.Sheets['Buildings'];

  if (buildingSheet) {
    const excelBuildings = XLSX.utils.sheet_to_json(
      buildingSheet,
      { defval: '' }
    );

    const existingBuildings = new Map(
      seedData.buildings.map(b => [b.id, b])
    );

    excelBuildings.forEach((b) => {
      const id = String(b.building_id).trim();

      if (!id) return;

      const existing = existingBuildings.get(id);

      if (existing) {
        // Keep canonical building names from seedData.js.
// Excel is used only for coordinate/reference metadata.
if (
  existing.id !== 'bldg-canteen' &&
  existing.id !== 'bldg-auditorium'
) {
  existing.name = String(b.building_name).trim();
}

        if (b.plan_x !== '') {
          existing.plan_x = Number(b.plan_x);
        }

        if (b.plan_y !== '') {
          existing.plan_y = Number(b.plan_y);
        }

        if (b.latitude !== '') {
          existing.latitude = Number(b.latitude);
        }

        if (b.longitude !== '') {
          existing.longitude = Number(b.longitude);
        }

        if (b.google_maps_search) {
          existing.google_maps_search =
            String(b.google_maps_search).trim();
        }
      }
    });

    console.log(
      `[Excel Sync] Buildings checked: ${excelBuildings.length}`
    );
  }

} catch (error) {
  console.error('[Excel Sync] Failed:', error.message);
}

module.exports = seedData;































