const User = require('../models/User');
const Role = require('../models/Roles');

async function initializeAdmin() {
    try {
        const adminExists = await User.findOne({ email: 'admin@app.dev' });
        
        if (adminExists) {
            console.log('Admin account already exists');
            return;
        }

        let adminRole = await Role.findOne({ name: 'admin' });
        if (!adminRole) {
            adminRole = await Role.create({
                name: 'admin',
                description: 'System Administrator'
            });
            console.log('Admin role created');
        }

        await User.create({
            email: 'admin@app.dev',
            password: 'adminadmin',
            name: {
                firstName: 'Jezrell',
                surname: 'Jolampong',
                middleName: '',
                nameExtension: ''
            },
            username: 'admin',
            role: [adminRole._id],
            employeeId: 'ADMIN-001',
            isActive: true,
            academicInfo: {
                employmentStatus: 'full-time',
                dateHired: new Date()
            },
            accountStatus: 'active'
        });

        console.log('Admin account created successfully');
    } catch (error) {
        console.error('Error creating admin account:', error);
        throw error;
    }
}

async function initialize() {
    try {
        console.log('Starting system initialization...');
        await initializeAdmin();
        console.log('System initialization completed');
    } catch (error) {
        console.error('System initialization failed:', error);
        process.exit(1);
    }
}

module.exports = initialize;