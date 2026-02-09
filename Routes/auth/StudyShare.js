const express=require('express');
const router=express.Router();
const path=require('path');
const { saveSummary } = require('../../controllers/saveSummary');
const { submitTeamApplication } = require('../../controllers/teamApplication');
const multer = require('multer');

// Use memory storage so uploaded file is available as a Buffer in req.file.buffer
const upload = multer({ storage: multer.memoryStorage() });
const Summaries = require('../../models/Summaries');
const { saveReview, getAllReviews } = require('../../controllers/saveReview');
const { saveQuestion, getAllQuestions } = require('../../controllers/saveQuestion');
const Users = require('../../models/Users');

// Middleware to set user context for all routes
const setUserContext = (req, res, next) => {
    res.locals.isLoggedIn = req.session.userId ? true : false;
    res.locals.userName = req.session.userName || '';
    next();
};

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session?.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.use(setUserContext);

router.get('/', (req,res,next)=> 
{res.render('index')});

router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const [rows] = await Users.fetchById(userId);
        if (!rows || rows.length === 0) {
            return res.status(404).render('error/file_not_found');
        }

        const user = rows[0];
        res.render('profiles/profile', { user });
    } catch (err) {
        console.error('שגיאה בטעינת פרופיל:', err);
        res.status(500).send('שגיאה בטעינת הפרופיל');
    }
});

router.get('/average_score', isAuthenticated, (req, res) => {
    res.render('profiles/average_score', { username: req.session.userName });
});

router.get('/checklist', isAuthenticated, (req, res) => {
    res.render('profiles/checklist', { username: req.session.userName });
});

router.get('/quiz', isAuthenticated, (req, res) => {
    res.render('profiles/quiz', { username: req.session.userName });
});

router.get('/add_summary', (req,res,next)=> {
    res.render('Summaries/add_summary')});

router.get('/add_review', (req,res,next)=> {
    res.render('review/add_review')});

router.get('/add_question', (req,res,next)=> {
    res.render('Questions&Answers/add_question')});

router.get('/summaries_view', async (req, res, next) => {
    // Example list of institutes, replace with DB query if needed
    const options = {
        institutes: [
            'האוניברסיטה הפתוחה',
            'אוניברסיטת תל אביב',
            'הטכניון',
            'אוניברסיטת חיפה',
            'אוניברסיטת בר אילן',
            'אוניברסיטת בן גוריון',
            'המרכז הבינתחומי',
            'מכללת תל אביב יפו',
            'מכללת ספיר'
        ]
    };
    // Parse filters from query params if present
    const filters = {
        education_institute: req.query['education_institute[]'] || [],
        author_name: req.query.author_name || '',
        education_year: req.query.education_year || '',
        semester: req.query.semester || ''
    };
    // Ensure filters.education_institute is always an array
    if (!Array.isArray(filters.education_institute)) {
        filters.education_institute = [filters.education_institute];
    }
    // Fetch summaries from DB
    let summaries = [];
    try {
        const [rows] = await Summaries.fetchAll();
        summaries = rows;
        
        // Apply filters
        if (filters.education_institute.length > 0 && filters.education_institute[0] !== '') {
            summaries = summaries.filter(s => filters.education_institute.includes(s.education_institute));
        }
        if (filters.author_name) {
            summaries = summaries.filter(s => s.author_name && s.author_name.toLowerCase().includes(filters.author_name.toLowerCase()));
        }
        if (filters.education_year) {
            summaries = summaries.filter(s => s.education_year && s.education_year.toString().includes(filters.education_year));
        }
        if (filters.semester) {
            summaries = summaries.filter(s => s.semester && s.semester.toLowerCase().includes(filters.semester.toLowerCase()));
        }
    } catch (err) {
        console.error('Error fetching summaries:', err);
    }
    res.render('Summaries/summaries_view', { options, filters, summaries });
});

router.get('/search_questions', getAllQuestions);

router.get('/Support', (req,res,next)=> {
    res.render('Support/Support')});

router.get('/system_reviews', async (req,res,next)=> {
    console.log('=== SYSTEM_REVIEWS ROUTE HIT ===');
    try {
        const Reviews = require('../../models/Reviews');
        const [reviews] = await Reviews.fetchAll();
        console.log('Fetched reviews:', reviews);
        console.log('Number of reviews:', reviews.length);
        res.render('review/system_reviews', { reviews: reviews || [] });
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.render('review/system_reviews', { reviews: [] });
    }
});

router.get('/aboutus', (req, res, next) => {
    res.render('About/about_us');
});

// Route to download summary file
router.get('/view/:summaryName', async (req, res, next) => {
    try {
        const summaryName = decodeURIComponent(req.params.summaryName);
        console.log('Attempting to download summary:', summaryName);
        
        const [rows] = await Summaries.fetchAll();
        console.log('Found summaries:', rows.length);
        
        const summary = rows.find(s => s.summary_name === summaryName);
        
        if (!summary) {
            console.log('Summary not found:', summaryName);
            console.log('Available summaries:', rows.map(r => r.summary_name));
            return res.status(404).send('הסיכום לא נמצא במערכת');
        }
        
        console.log('Found summary with ID:', summary.id);
        
        // Fetch the full summary including file_attach
        const [fullSummary] = await Summaries.fetchById(summary.id);
        
        console.log('Full summary query result:', fullSummary ? fullSummary.length : 0);
        
        if (!fullSummary || fullSummary.length === 0) {
            console.log('No data returned from fetchById');
            return res.status(404).send('פרטי הקובץ לא נמצאו');
        }
        
        const summaryData = fullSummary[0];
        console.log('Summary data keys:', Object.keys(summaryData));
        console.log('file_attach exists:', !!summaryData.file_attach);
        console.log('file_attach type:', typeof summaryData.file_attach);
        
        if (!summaryData.file_attach) {
            return res.status(404).send('הקובץ לא נמצא במערכת');
        }
        
        const fileData = summaryData.file_attach;
        // Use a simple ASCII filename to avoid header issues
        const fileName = encodeURIComponent(summaryName) + '.txt';
        
        // Set headers for file download
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="summary.txt"');
        
        // Send the buffer or string
        res.send(fileData);
    } catch (err) {
        console.error('Error downloading summary:', err);
        console.error('Error stack:', err.stack);
        res.status(500).send('שגיאה בהורדת הקובץ: ' + err.message);
    }
});

router.post('/saveSummary', upload.single('file_attach'), saveSummary);
router.post('/saveReview', saveReview);
router.post('/saveQuestion', saveQuestion);
router.post('/submit-team-application', submitTeamApplication);

router.use((req,res,next)=> {
    res.status(404).render('error/file_not_found')
});
module.exports=router;