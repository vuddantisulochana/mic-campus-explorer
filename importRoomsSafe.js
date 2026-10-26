const XLSX = require('xlsx');
const sqlite3 = require('sqlite3').verbose();

const EXCEL = './data/MIC_Campus_Rooms_Final_Cleaned.xlsx';
const DB = './server/campus.db';

function norm(v) {
    return String(v ?? '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');
}

function dbRun(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

function dbAll(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbGet(db, sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

async function main() {
    console.log('\n==============================================');
    console.log(' MIC CAMPUS EXPLORER - SAFE ROOM IMPORT');
    console.log('==============================================\n');

    // --------------------------------------------------
    // 1. Read Excel
    // --------------------------------------------------
    const wb = XLSX.readFile(EXCEL);

    if (!wb.Sheets['Rooms']) {
        throw new Error('Rooms sheet not found in Excel workbook.');
    }

    const rows = XLSX.utils.sheet_to_json(
        wb.Sheets['Rooms'],
        { defval: '' }
    );

    console.log(`Excel rooms found: ${rows.length}`);

    if (rows.length !== 198) {
        throw new Error(
            `Expected exactly 198 rooms, but found ${rows.length}. Import aborted.`
        );
    }

    // --------------------------------------------------
    // 2. Explicit building mapping
    // --------------------------------------------------
    const buildingMap = {
        'bed block': 'bldg-bed',
        'diploma block-a': 'bldg-dip1',
        'diploma block-1': 'bldg-dip1',
        'diploma block-b': 'bldg-dip2',
        'diploma block-2': 'bldg-dip2',
        'labs & workshops': 'bldg-labs',
        'main & administrative block': 'bldg-macb'
    };

    // --------------------------------------------------
    // 3. Department mapping
    // Only verified/current DB departments are assigned.
    // Everything else becomes NULL.
    // --------------------------------------------------
    const departmentMap = {
        'cse': 'dept-cse',
        'ece': 'dept-ece',
        'eee': 'dept-eee',
        'it': 'dept-it',
        'mech': 'dept-mech',
        'civil': 'dept-civil',
        'ai': 'dept-ai',
        'ai&ds': 'dept-ai'
    };

    // --------------------------------------------------
    // 4. Open database
    // --------------------------------------------------
    const db = new sqlite3.Database(DB);

    try {
        const buildings = await dbAll(
            db,
            `SELECT id, name FROM buildings`
        );

        const floors = await dbAll(
            db,
            `SELECT id, building_id, floor_number, floor_name
             FROM floors`
        );

        const departments = await dbAll(
            db,
            `SELECT id, building_id, floor_id, name, code
             FROM departments`
        );

        const buildingIds = new Set(buildings.map(b => b.id));

        console.log(`Database buildings: ${buildings.length}`);
        console.log(`Database floors: ${floors.length}`);
        console.log(`Database departments: ${departments.length}`);

        // --------------------------------------------------
        // 5. Ensure required missing floors exist
        // --------------------------------------------------

        // BED Third Floor
        let bedThird = floors.find(
            f =>
                f.building_id === 'bldg-bed' &&
                norm(f.floor_name) === 'third floor'
        );

        if (!bedThird) {
            console.log('Creating missing floor: BED Block - Third Floor');

            await dbRun(
                db,
                `INSERT INTO floors
                 (id, building_id, floor_number, floor_name, description, verified_directory)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    'floor-bed-tf',
                    'bldg-bed',
                    3,
                    'Third Floor',
                    'Verified floor directory from campus room dataset.',
                    'MIC Campus Rooms Final Clean'
                ]
            );

            bedThird = {
                id: 'floor-bed-tf',
                building_id: 'bldg-bed',
                floor_number: 3,
                floor_name: 'Third Floor'
            };
        }

        // Labs Ground Floor
        let labsGround = floors.find(
            f =>
                f.building_id === 'bldg-labs' &&
                norm(f.floor_name) === 'ground floor'
        );

        if (!labsGround) {
            console.log('Creating missing floor: Labs & Workshops - Ground Floor');

            await dbRun(
                db,
                `INSERT INTO floors
                 (id, building_id, floor_number, floor_name, description, verified_directory)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    'floor-labs-gf',
                    'bldg-labs',
                    0,
                    'Ground Floor',
                    'Verified floor directory from campus room dataset.',
                    'MIC Campus Rooms Final Clean'
                ]
            );

            labsGround = {
                id: 'floor-labs-gf',
                building_id: 'bldg-labs',
                floor_number: 0,
                floor_name: 'Ground Floor'
            };
        }

        // Refresh floors after possible inserts
        const allFloors = await dbAll(
            db,
            `SELECT id, building_id, floor_number, floor_name
             FROM floors`
        );

        // --------------------------------------------------
        // 6. Validate every Excel row BEFORE modifying rooms
        // --------------------------------------------------
        const errors = [];
        const seenIds = new Set();
        const seenRoomKeys = new Set();

        const prepared = [];

        rows.forEach((r, index) => {
            const excelRow = index + 2;

            const id = String(r.id ?? '').trim();
            const roomNumber = String(r.room_no ?? '').trim();
            const roomName = String(r.room_name ?? '').trim();
            const buildingName = String(r.building_name ?? '').trim();
            const floorName = String(r.floor ?? '').trim();
            const department = String(r.department ?? '').trim();

            // Required values
            if (!id) {
                errors.push(`Row ${excelRow}: missing id`);
            }

            if (!roomNumber) {
                errors.push(`Row ${excelRow}: missing room_no`);
            }

            if (!roomName) {
                errors.push(`Row ${excelRow}: missing room_name`);
            }

            if (!buildingName) {
                errors.push(`Row ${excelRow}: missing building_name`);
            }

            if (!floorName) {
                errors.push(`Row ${excelRow}: missing floor`);
            }

            // Duplicate ID
            if (seenIds.has(id)) {
                errors.push(`Row ${excelRow}: duplicate room id "${id}"`);
            }
            seenIds.add(id);

            // Building
            const buildingId = buildingMap[norm(buildingName)];

            if (!buildingId) {
                errors.push(
                    `Row ${excelRow}: unmapped building "${buildingName}"`
                );
            } else if (!buildingIds.has(buildingId)) {
                errors.push(
                    `Row ${excelRow}: mapped building "${buildingName}" -> "${buildingId}" does not exist`
                );
            }

            // Floor
            let floorId = null;

            if (buildingId) {
                const floor = allFloors.find(
                    f =>
                        f.building_id === buildingId &&
                        norm(f.floor_name) === norm(floorName)
                );

                if (!floor) {
                    errors.push(
                        `Row ${excelRow}: no floor mapping for "${buildingName}" + "${floorName}"`
                    );
                } else {
                    floorId = floor.id;
                }
            }

            // Duplicate room number within same building/floor
            if (buildingId && floorId && roomNumber) {
                const key =
                    `${buildingId}|${floorId}|${norm(roomNumber)}`;

                if (seenRoomKeys.has(key)) {
                    errors.push(
                        `Row ${excelRow}: duplicate room number "${roomNumber}" in "${buildingName}" / "${floorName}"`
                    );
                }

                seenRoomKeys.add(key);
            }

            // Department
            let departmentId = null;

            if (department) {
                departmentId = departmentMap[norm(department)] || null;
            }

            prepared.push({
                id,
                roomNumber,
                roomName,
                buildingId,
                floorId,
                departmentId,
                department
            });
        });

        // --------------------------------------------------
        // 7. Stop before room modification if anything wrong
        // --------------------------------------------------
        if (errors.length) {
            console.error('\n? VALIDATION FAILED\n');

            errors.forEach(e => console.error(' - ' + e));

            throw new Error(
                `Import aborted. ${errors.length} validation error(s).`
            );
        }

        console.log('\n? All 198 Excel rows passed validation.');

        // --------------------------------------------------
        // 8. Show department assignment summary
        // --------------------------------------------------
        const deptSummary = {};

        for (const r of prepared) {
            const key = r.departmentId || 'NULL';
            deptSummary[key] = (deptSummary[key] || 0) + 1;
        }

        console.log('\nDepartment assignment summary:');
        console.table(deptSummary);

        // --------------------------------------------------
        // 9. Transaction
        // --------------------------------------------------
        await dbRun(db, 'BEGIN TRANSACTION');

        try {
            for (const r of prepared) {
                await dbRun(
                    db,
                    `INSERT OR REPLACE INTO rooms
                     (id, room_number, name, building_id, floor_id,
                      department_id, type, description)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        r.id,
                        r.roomNumber,
                        r.roomName,
                        r.buildingId,
                        r.floorId,
                        r.departmentId,
                        'Room',
                        ''
                    ]
                );
            }

            await dbRun(db, 'COMMIT');

            console.log('\n? Transaction committed.');
            console.log(`? Imported rooms: ${prepared.length}`);
        } catch (err) {
            await dbRun(db, 'ROLLBACK');
            throw err;
        }

        // --------------------------------------------------
        // 10. Verification
        // --------------------------------------------------
        const countRow = await dbGet(
            db,
            `SELECT COUNT(*) AS count FROM rooms`
        );

        console.log(`\nRooms in database: ${countRow.count}`);

        console.log('\nRooms by building/floor:');

        const grouping = await dbAll(
            db,
            `SELECT
                b.name AS building,
                f.floor_name AS floor,
                COUNT(*) AS rooms
             FROM rooms r
             JOIN buildings b ON b.id = r.building_id
             JOIN floors f ON f.id = r.floor_id
             GROUP BY r.building_id, r.floor_id
             ORDER BY b.name, f.floor_number`
        );

        console.table(grouping);

        console.log('\nRooms by department:');

        const departmentsResult = await dbAll(
            db,
            `SELECT
                COALESCE(d.code, 'UNASSIGNED') AS department,
                COUNT(*) AS rooms
             FROM rooms r
             LEFT JOIN departments d ON d.id = r.department_id
             GROUP BY r.department_id
             ORDER BY department`
        );

        console.table(departmentsResult);

        // Foreign-key check
        const fk = await dbAll(
            db,
            `PRAGMA foreign_key_check`
        );

        if (fk.length) {
            console.error('\n?? Foreign key problems found:');
            console.table(fk);
        } else {
            console.log('\n? PRAGMA foreign_key_check passed.');
        }

        if (Number(countRow.count) !== 198) {
            throw new Error(
                `Expected 198 rooms after import, found ${countRow.count}`
            );
        }

        console.log('\n==============================================');
        console.log(' ?? ROOM IMPORT COMPLETED SUCCESSFULLY');
        console.log('==============================================\n');

    } finally {
        db.close();
    }
}

main().catch(err => {
    console.error('\n? IMPORT FAILED');
    console.error(err.message);
    process.exit(1);
});


