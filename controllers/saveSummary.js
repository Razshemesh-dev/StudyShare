const Summaries = require('../models/Summaries'); 

exports.saveSummary = (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send('No form data received');
    }

    const fileBuffer = req.file ? req.file.buffer : null;
    const { summary_name, author_name, education_year, education_institute, semester } = req.body;

    if (!summary_name || !author_name || !education_year) {
      return res.status(400).send('Missing required fields');
    }

    const summary = new Summaries(
      summary_name,
      author_name,
      education_year,
      education_institute,
      semester,
      fileBuffer
    );

    summary.save()
      .then(() => {
        console.log('Summary saved successfully');
        res.redirect('/');
      })
      .catch(err => {
        console.error('Error saving summary:', err);
        res.status(500).send('Internal Server Error');
      });
  } catch (err) {
    console.error('Unexpected error in saveSummary:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAllSummaries = async (req, res, next) => {
  try {
    const [summaries] = await Summaries.fetchAll();
    res.render('add_summary', { summaries });
  } catch (err) {
    console.error('Error fetching summaries:', err);
    res.status(500).send('Internal Server Error');
  }
};